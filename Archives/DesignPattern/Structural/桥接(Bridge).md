# 桥接(Bridge)

## 优点

- 将对象的抽象部分和实现部分分离, 二者可以独立变化
- 可以代替多继承方式
- 高可扩展性: 当类存在多个需要独立扩展的纬度时,(如, 一辆车, 引擎可以有多个牌子, 轮胎可以有多个牌子. 等等)

## 特点

- 每个抽象类和实现类可以独立扩展
  - 以 Car 为例
    - 实现类 车子包含不同组件, 组件之间互不相关(其实应该有关联的... 但举例子的时候忽略一下) 对于实现类, 只要知道它是对应的抽象的具体实现即可(即 有个引擎即可, 但不关系是什么牌子的引擎)
    - 抽象类 车子中不同部位的组件, 如 引擎, 轮胎, 车门 这些部位在一个车子的实例里一般只允许一个品牌的存在, 即, 多品牌互斥.

## 结构

- 车

- 抽象化类(Abstraction)
  - 车的基本结构属性定义: `Car { Engine, Door... }`
  - 基于对应的部件, 调用不同的方法 `Car { startUp() {this.engine.startUp()} }`
- 修正抽象化类(RefinedAbstraction)
  - 对抽象化类进行重新定义和扩展
  - 不同牌子车有一些自己特色的功能 `BMW extends Car { autopilot }`
- 实现化类(Implementor)
  - 每个部件的抽象: `interface Engine { ... }`
- 具体实现化类(ConcreteImplementor)
  - 对实现化类的具体实现 `BMWEngine extends Engine {}`

## 使用场景

- 出现多继承的情况, 可以用桥街模式代替
- 当主体与部分属性 支持 独立的多维度变化的时候
  - 如
    - 车: 不同牌子的车可以由多个不同品牌的部件组成. 且支持按品牌二次扩展
    - 部件: 每个部件根据不同牌子由不同的属性 且支持按品牌二次扩展

## 代码示例

```Typescript

// 实现化类
interface Engine {}

interface Door {}

// 具体实现化类
interface BMWEngine extends Engine {}

interface BenzEngine extends Engine {}

// 抽象化类
abstract class Car {
  door: Door
  engine: Engine

  constructor( door: Door, engine: Engine) {
    this.door = door
    this.engine = engine
  }

  abstract drive():void
}

// 修正抽象化类
class BMWCar extends Car {
  autopilot() {}
}

new BMWCar(new BMWEngine(), new BenzEngine())

```

## 与构造者模式的区别

- 桥接模式 更注重对 可独立维护的属性的拆分.
- 构造者模式 则是对单个具体可实现类大量的属性的一个分解.
- 二者的针对点并不一致, 可以同时使用
  - 通过桥接模式 对类中的每个属性独立维护
  - 通过构造者模式 对类中的属性赋值,对类的具体实现可实现链式调用和可选调用
