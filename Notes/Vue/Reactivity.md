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
  - `computed.ts` 计算属性
  - `operations.ts` 收集以来与对应的操作
  - `reactive.ts` 对对象的响应式实现
  - `ref.ts` 对值的响式实现

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

- `createGetter`: 对取值的处理

  - 返回四种不同的 `get` 方法. 如下
    - `get`: 基本的取值
    - `shallowGet`: 浅响应对象的值获取. 只对 `target` 属性进行拦截, `target.a.b` 中的`b`不进行响应式
    - `readonlyGet` 只读代理. 整个 `target` 对象的属性都只读, 不允许修改
    - `shallowReadonlyGet` 浅响应对象的只读代理. 即 `target.a.b` `target` 是只读对象, 不能修改 `target.a`. 但 `target.a`不是只读对象. 我们可以修改 `target.a.b` 的值
  - 返回的`get`方法: 返回取到的值, 如果需要追踪,则追踪返回值的变化. 如果是对象, 则通过 `reactive` 再响应式一次

    ```ts
    function createGetter(isReadonly = false, shallow = false) {
      return function get(target: Target, key: string | symbol, receiver: object) {
        /* 根据传入 key 进行判断. 做前置处理 */
        if (key === ReactiveFlags.IS_REACTIVE) {
          return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
          return isReadonly
        } else if (
          key === ReactiveFlags.RAW &&
          receiver ===
            (isReadonly
              ? shallow
                ? shallowReadonlyMap
                : readonlyMap
              : shallow
              ? shallowReactiveMap
              : reactiveMap
            ).get(target)
        ) {
          return target
        }

        /* 判断target是否为数组 */
        const targetIsArray = isArray(target)

        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
          /*
          若非只读, 且为数组, 而且 key 为 'includes', 'indexOf', 'lastIndexOf', 'push', 'pop', 'shift', 'unshift', 'splice' 中的一个
          则调用外部方法进行 get 取值计算. 具体调用可参照 createArrayInstrumentations
        */
          return Reflect.get(arrayInstrumentations, key, receiver)
        }

        /* 调用get方法取到目标值 */
        const res = Reflect.get(target, key, receiver)
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          /* key为不可追踪的key, 如系统内置的Symbol 或 key不为__proto__, __v_isRef,  __isVue */
          return res
        }

        if (!isReadonly) {
          /* 若非只读对象, 则对其值进行track, 用于后续的响应式变动 */
          track(target, TrackOpTypes.GET, key)
        }

        if (shallow) {
          /* 如果是浅响应, 则直接返回, 不做处理 */
          return res
        }

        if (isRef(res)) {
          // ref unwrapping - does not apply for Array + integer key.
          const shouldUnwrap = !targetIsArray || !isIntegerKey(key)
          return shouldUnwrap ? res.value : res
        }

        if (isObject(res)) {
          // Convert returned value into a proxy as well. we do the isObject check
          // here to avoid invalid value warning. Also need to lazy access readonly
          // and reactive here to avoid circular dependency.
          return isReadonly ? readonly(res) : reactive(res)
        }

        return res
      }
    }
    ```

- `createArrayInstrumentations()` 对`key`为数组方法的拦截处理: 若为需要遍历数组每项值的, 则对每项值进行追踪. 如果是修改数组的, 则暂停追踪,并对原值进行修改后重新进行追踪

  ```ts
  function createArrayInstrumentations() {
    const instrumentations: Record<string, Function> = {}
    // instrument identity-sensitive Array methods to account for possible reactive
    // values
    ;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach((key) => {
      instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
        const arr = toRaw(this) as any
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, TrackOpTypes.GET, i + '')
        }
        // we run the method using the original args first (which may be reactive)
        const res = arr[key](...args)
        if (res === -1 || res === false) {
          // if that didn't work, run it again using raw values.
          return arr[key](...args.map(toRaw))
        } else {
          return res
        }
      }
    })
    // instrument length-altering mutation methods to avoid length being tracked
    // which leads to infinite loops in some cases (#2137)
    ;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach((key) => {
      instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
        pauseTracking()
        const res = (toRaw(this) as any)[key].apply(this, args)
        resetTracking()
        return res
      }
    })
    return instrumentations
  }
  ```

- 对外暴露的 `Proxy handler` 集合
  - **mutableHandlers**: 基本代理的拦截操作的封装
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
   - 如果 `target` 已经被代理, 则直接返回已存在的代理对象, 避免重复代理
   - 获取 `target` 对象的类型
   - 如果 `target` 类型为无须代理 `TargetType.INVALID` , 则直接返回
   - 初始化代理对象, `proxy = new Proxy` 根据上一步取到的类型, 分别设置不同的代理拦截方法 `baseHandlers` 或 `collectionHandlers`
   - 保存 `target` 与 `proxy` 的对应关系. 并返回 `proxy` 对象
4. 返回的对象是一个可响应对象. 我们可以通过对其属性进行操作触发响应式

#### effect

##### 调用顺序

1. **track**

1. **trigger**
