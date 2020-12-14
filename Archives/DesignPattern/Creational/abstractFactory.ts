/**
 * 抽象工厂模式
 * @define 提供一个产品簇(相关联的产品)相关的类别定义，而不需要一个个工厂去指定对应类型的产品
 *         抽象产出一个工厂(产品簇都由该工厂生产)，由工厂去生成出对应的产品。
 *         工厂 --> 平台 --> 产品簇
 *         通过继承创建对象
 * @scenes 程序可移植情况下，针对不同的平台/场景有不同的具体实现
 */

interface Door {
  type: 'front' | 'back'
  logo: string
}

interface Wheel {
  size: 'large' | 'middle' | 'small'
  logo: string
}

interface BuilderCar {
  doors: Door[]
  wheels: Wheel[]
}

interface AbstractFactory {
  makeDoor?(type: 'front' | 'back'): Door
  makeWheel?(size: 'large' | 'middle' | 'small'): Wheel
  makeCar?(): BuilderCar
}

class FerrariFactory implements AbstractFactory {
  makeDoor(type: 'front' | 'back'): Door {
    return { type, logo: 'Ferrari' }
  }
  makeWheel(size: 'large' | 'middle' | 'small'): Wheel {
    return { size, logo: 'Ferrari' }
  }
}

class PorscheFactory implements AbstractFactory {
  makeDoor(type: 'front' | 'back'): Door {
    return { type, logo: 'Porsche' }
  }
  makeWheel(size: 'large' | 'middle' | 'small'): Wheel {
    return { size, logo: 'Porsche' }
  }
}

function makeCar(type: 'Porsche' | 'Ferrari') {
  const factory = new (type === 'Porsche' ? PorscheFactory : FerrariFactory)()
  const door = factory.makeDoor('front')
  const wheel = factory.makeWheel('small')
  console.info(`
  Car ${type}:
  Door logo->${door.logo} type->${door.type}
  Wheel logo->${wheel.logo} type->${wheel.size}
  `)
}

makeCar('Porsche')
makeCar('Ferrari')
