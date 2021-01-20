# 适配器(Adapter)

## 优点

- 优点
  - 作为桥梁 将两个不兼容的接口关联/整合起来
  - 通过适配器(Wrapper) 包裹类转变为可兼容的接口类型
  - 兼容旧的组件在新系统中使用
  - 目标类和适配者解耦
  - 灵活性高, 复用性强(只需更换适配器即可)

## 特点

- 存在适配器. 将适配者转变为可接受的新对象(符合新的接口)

## 结构

- Target 目标类
- Adapter 适配器
- Adaptee 适配者
- Client 客户类

## 使用场景

- 兼容(浏览器/api 升级等)
- 屏蔽基础设施的实现区别. 向上暴露统一接口(Node)

## 代码示例

```Typescript
// * Adapter: Interface Map
// * Adaptee: WrapGoogleMap
// * Client: GoogleMap
// * Target: RenderMap

class GoogleMap {
  show() { /** ... */ }
}

class AMap {
  display() { /** ... */ }
}

interface Map {
  display: () => void
}

class WrapGoogleMap implements Map {
{
  constructor() {
    super();
  }

  display() {
    this.show()
  }
}

const renderMap = (map: Map) => {}

```
