# 享元(Flyweight)

## 优点

- 可以复用已创建的实例

## 特点

- 当已创建的实例不可变, 即可复用. 那么就无需重复创建相同的额实例

## 结构

- 享元工厂类(FlyweightFactory)
  - 用于判断是否需要创建新实例还是返回旧实例
- 抽象享元类(Flyweight)
  - 定义享元类的基本方法(如: getFlyweight)

## 使用场景

- 系统存在大量相同的实例, 且在多个地方被重复使用

## 代码示例

```Typescript
interface IFlyweight {
  makeFlyweight(): IFlyweight {}
}

class FlyweightFactory {
  pool: Record<string, IFlyweight> = {}
  factory: IFlyweight

  constructor(factory:IFlyweight) {
    this.factory = factory
  }
  getFlyWeight(type: string) {
    if(!this.pool[type]) this.pool[type] = this.factory.makeFlyweight()
    return this.pool[type]
  }
}
```

## 区别

- 与单例模式的区别
  - 单例是单个类只存在唯一实例
  - 享元则是可以存在不同实例的复用
