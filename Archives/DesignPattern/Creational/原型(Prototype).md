# 原型模式

- 与 Js 的原型链 略有不同

## 优点

- 避免 new 操作、
- 通过对现有对象进行拷贝得到新对象(从而避免复杂的创建对象的计算过程)

## 特点

- 没有 `new` 操作符
- 通过 `clone` 方法实现对象的克隆
- 新对象和原来的对象一致(除了内存引用地址,像有丝分裂一样)

## 结构

- Clonable 可克隆对象
  - clone 克隆方法. 拷贝当前所有属性

## 场景

- 根据一个复杂的通用对象. 通过对其克隆产生互不干扰的对象,从而对新对象做任意操作

## 示例

```Typescript
function deepClone(obj: any): any {
  if (Array.isArray(obj)) return obj.map((item) => deepClone(item))

  const copy: any = {}
  const keys = Object.keys(obj)

  keys.forEach((key) => {
    const value = (obj as any)[key]
    // ? 这里需要扩展根据不同的类型来做一些针对处理
    if (typeof value === 'object') return (copy[key] = deepClone(obj))
    copy[key] = deepClone(value)
  })

  return keys
}

```
