/**
 * 工厂模式
 * @define 通过接口定义需要构建的对象类结构, 由使用方决定通过哪个子类进行构建。
 *         通过对象创造方法的抽象，由子类来实现具体的构建
 *         虚拟构造函数，运行时构造对象
 * @scenes 提供标准化结构，但允许使用方进行一定的自定义设置
 */

// 标准化的结构产出
interface Product {
  name: string
  price: number
  toString: Function
}

interface IFactory {
  makeProduct(): Product
}

class Factory {
  // 抽象的构造方法
  makeProduct(type: string): Product {
    let obj: Exclude<Product, 'toString'>
    // 由对应的子类方法生产对应的具体对象实例
    switch (type) {
      case 'A':
        obj = { name: 'A', price: 10 }
        break
      case 'B':
        obj = { name: 'B', price: 20 }
        break
      case 'C':
        obj = { name: 'C', price: 50 }
        break
      default:
        throw new Error('Error Type')
    }

    // 该工厂生产的对象的标准方法
    obj.toString = function (this: Product) {
      return console.info(`Name: ${this.name}; Price: ${this.price}`)
    }
    return obj
  }
}

type Constructor<T = object> = new (...args: any[]) => T
const productFactory = (function () {
  const cache: Map<Constructor<IFactory>, IFactory> = new Map()
  return {
    getProduct: (CL: Constructor<IFactory>): Product => {
      let cls: IFactory | undefined = undefined
      if (cache.has(CL)) cls = cache.get(CL)
      if (!cls) {
        cls = new CL()
        cache.set(CL, cls)
      }
      const product = cls.makeProduct()
      // ? 可对 product做一些通用的处理。 或 注入一些通用的方法，而无需去修改子类
      return product
    },
  }
})()

class AFactory implements IFactory {
  constructor() {
    console.info('create A once')
  }
  makeProduct() {
    return { name: 'A', price: 10 }
  }
}

class BFactory implements IFactory {
  constructor() {
    console.info('create B once')
  }
  makeProduct() {
    return { name: 'B', price: 10 }
  }
}

class CFactory implements IFactory {
  constructor() {
    console.info('create C once')
  }
  makeProduct() {
    return { name: 'C', price: 10 }
  }
}
console.info(productFactory.getProduct(AFactory))
console.info(productFactory.getProduct(BFactory))
console.info(productFactory.getProduct(AFactory))
