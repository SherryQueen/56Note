interface IOCMember<T = any> {
  factory: Function
  singleton: boolean
  instance?: T
}

interface IClass<T = any> {
  new (...args: any[]): T
}

export class IOC {
  private container: Map<PropertyKey /* string | number | symbol */, IOCMember>

  constructor() {
    this.container = new Map()
  }

  bind<T>(key: PropertyKey, Cls: IClass<T>, singleton: boolean = true): void {
    this.container.set(key, { factory: () => new Cls(), singleton })
  }

  use(key: PropertyKey) {
    const item = this.container.get(key)
    if (!item) throw new Error(`${key.toString()} not found`) /* 对应对象不存在 */
    if (!item.singleton) return item.factory() /* 非单例模式,返回一个新对象 */
    if (!item.instance) item.instance = item.factory() /* 单例模式,若不存在就创建一个 */
    return item.instance
  }

  provide = (key?: PropertyKey, singleton: boolean = true) /* 装饰器, 标记需要bind的类 */ => {
    const self = this
    return function <T>(fn: IClass<T>) {
      const _key = key || fn.name
      self.bind(_key, fn, singleton)
    }
  }

  inject = (key: PropertyKey) /* 装饰器, 需要注入的属性 */ => {
    const self = this
    return function (target: any, propertyKey: PropertyKey) {
      if (target) {
        Object.defineProperty(target, propertyKey, {
          enumerable: true,
          get: function () {
            return self.use(key)
          },
          set: function (value) {
            this[propertyKey] = value
          },
        })
      }
    }
  }
}
