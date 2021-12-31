# Vue Reactivity(Vue 的响应式)

> tags: #Vue #Reactivity

## 前置知识

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  - 对象代理.通过代理对象, 实现对象基本操作的拦截和自定义
- [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
  - 提供拦截 `Javascript` 的方法 与 `Proxy` 相同.
  - `Reflect` 非构造函数. 只提供了静态方法用于操作

## 介绍

- `reactivity` 模块是 `vue-next` 中的 `proxy` + `reflect` 实现
- 源码: [packages/reactivity](https://github.com/vuejs/vue-next/tree/v3.2.26/packages/reactivity)
- 入口文件: [packages/reactivity/src/index.ts](https://github.com/vuejs/vue-next/blob/v3.2.26/packages/reactivity/src/index.ts)

## 用法

```ts
import { ref, readonly, reactive } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

original.count++ //
copy.count++ // warning
```

## 模块结构

- `src`
  - `effect.ts` 依赖的追踪,触发,转换相关方法
  - `baseHandler.ts` 基本类型的`proxy`
  - `collectionHandler.ts` 集合类型`Map,Set,WeakMap,WeakSet`的`proxy`
  - `computed.ts`
  - `operations.ts`
  - `reactive.ts` 响应式实现的主要代码
  - `ref.ts`

## 响应式的方法

- vue3 中推荐的响应式写法为 `ref()` 与 `reactive()`
- [declaring-reactive-state](https://v3.vuejs.org/guide/reactivity-fundamentals.html#declaring-reactive-state)

- 响应式的用法

```vue
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count++">Increment count</button>
    <button @click="nested.count.value++">Nested Increment count</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const rCount = reactive({ count })
    return {
      count,
      rCount,
      nested: {
        count,
      },
    }
  },
}
</script>
```

### 各模块定义的部分方法

#### baseHandler

- **const arrayInstrumentations = /\_#**PURE**\_/ createArrayInstrumentations()**

- **mutableHandlers**: 基本代理的拦截操作的封装
  - `createGetter`
    - 返回四种不同的 `get` 方法. 如下
      - `get`
      - `shallowGet`
      - `readonlyGet`
      - `shallowReadonlyGet`
    - 返回的 `get(target: Target, key: string | symbol, receiver: object)` 方法具体调用
      - 参数
        - `target`: 操作的目标对象
        - `key`: 对象的操作方法或取值方法
        - `receiver`:
      - 调用顺序
        - 0. 根据传入 key 进行判断. 做前置处理
        - 1. 如果是数组, 判断 `key` 是否在 `arrayInstrumentations` 中存在. 存在则通过 `Reflect.get(arrayInstrumentations, key, receiver)` 进行处理并返回结果
        - 2. `const res = Reflect.get(target, key, receiver)` 取得对应的值
        - 3. 如果是 `symbol` 且属于 `builtInSymbols` 或 是未进行 `track` 的 key 则直接返回 res
  - `baseHandlers` 基本类型的拦截方法
    - `get`
    - `shallowGet`
    - `readonlyGet`
    - `shallowReadonlyGet`

#### collectionHandler

- **mutableCollectionHandlers**: 集合类型(`Set`, `Map` 等)的代理拦截操作的封装

#### reactive

- 对象的类型

```ts
const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2,
}

// 不同类型的对象判断得到对应的代理方法
function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON // 普通代理
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION // 集合代理
    default:
      return TargetType.INVALID // 不能代理
  }
}
```

##### 调用顺序

1. **reactive(target)**: 对对象进行响应式观察
   - 如果 `target` 已经被标记为只读对象. 则直接返回
2. 调用 `createReactiveObject` 并传入参数
   - **target**: 需要响应的对象
   - **false**: 是否只读
   - **mutableHandlers**: 基本类型的拦截操作
   - **mutableCollectionHandlers**: 集合类型的拦截操作
   - **reactiveMap**: 全局的代理响应. 采用 `WeakMap` 方便垃圾回收
3. **createReactiveObject**函数
   - 如果 `target` 为非对象. 则直接返回. (不适用于 `reactive` 进行响应式)
   - 如果 `target` 是个代理对象类型(`Proxy`)(通过 `target[IS_REACTIVE]`) 来判断
   - 如果 `target` 已经被代理, 则直接返回已存在的代理对象
   - 获取 `target` 对象的类型
   - 如果 `target` 类型为无须代理 `TargetType.INVALID` , 则直接返回
   - 初始化代理对象, `proxy = new Proxy` 根据上一步取到的类型, 分别设置不同的代理拦截方法 `baseHandlers` 或 `collectionHandlers`
   - 保存 `target` 与 `proxy` 的对应关系. 并返回 `proxy` 对象

#### effect

##### 调用顺序

1. **track**

1. **trigger**
