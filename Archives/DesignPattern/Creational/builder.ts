/**
 * 构造器模式
 * @define  将复杂的对象拆分成多个构造方法。同样的构造函数
 *          通过对复杂输入表达式的解析，或多个不同构造方法的合成。创建出不同的对象
 *          分成4个角色
 *            最终产品 Product
 *            构造者的抽象 Builder
 *            构造者的具体实现 ConcreteBuilder
 *            引导者，如何构造 Director
 * @scenes  通过引导者，调用不同的方法，构造生成不同的对象属性
 */

abstract class BuilderCar {
  door: string = ''
  wheel: string = ''
  engine: string = ''

  abstract makeDoor(): BuilderCar
  abstract makeWheel(): BuilderCar
  abstract makeEngine(): BuilderCar
  toString() {
    return `Car: door=>${this.door} wheel=>${this.wheel} engine=>${this.engine}`
  }
}

class FerrariBuilderCar extends BuilderCar {
  makeDoor() {
    this.door = 'Ferrari door'
    return this
  }
  makeWheel() {
    this.door = 'Ferrari wheel'
    return this
  }
  makeEngine() {
    this.door = 'Ferrari engine'
    return this
  }
}

class PorscheBuilderCar extends BuilderCar {
  makeDoor() {
    this.door = 'Porsche door'
    return this
  }
  makeWheel() {
    this.door = 'Porsche wheel'
    return this
  }
  makeEngine() {
    this.door = 'Porsche engine'
    return this
  }
}

const builder1 = new FerrariBuilderCar()
const builder2 = new PorscheBuilderCar()

// 引导者的引导如何使用builder 创造产品
builder1.makeDoor().makeEngine().makeWheel()
builder2.makeEngine().makeWheel()
