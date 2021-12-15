# 控制反转(IOC)与依赖注入(DI)

> tags: #Typescript #IOC #DI

## 前置概念

- [Decorator](https://github.com/SherryQueen/56Note/blob/main/Notes/Decorator.md)

## IOC 的概念与作用

控制反转(IOC Inversion of Control) OOP 中的一种设计原则. 用于代码解耦
类 C 强依赖于 A 和 B. 如果 A 和 B 的实力化参数变动 或 内部属性或方法或依赖的其他类发生变化, 都需要在类 C 中进行修改

````ts
import { A, B } from './mod'

class C {
    constructor() {
        this.a = new A()
        this.b = new B()
    }
}```
我们可以通过在类C中定义 A, B类型的变量a, b, 通过set方法来手动赋值 a, b 的值
```ts
import { A, B } from './mod'

class C {
    constructor() {}
    setA(a: A) {this.a = a}
    setB(b: B) {this.b = b}
}```
通过set方法赋值可以对类C进行解耦, 但需要手动调用方法赋值, 且容易导致A,B产生多个相同的实例. 故, 我们可以引入一个Ioc容器作为全局唯一的对象 来托管这些实例.
```ts
import { IOC } from './ioc'
import { A, B } from './mod'

const ioc = new IOC()
ioc.bind<A>('A', A)
ioc.bind<B>('B', B)

class C {
  a: A
  b: B

  constructor() {
    this.a = ioc.use('A')
    this.b = ioc.use('B')
  }
}
- 如上例子所示, 通过Ioc容器. 我们可以维护好一个对象池,管理各个对象的实例. 用户需要对应实例时,可以交付对应的实例给用户使用. 且能避免重复的创建. 比如针对(A->B->C->D 这种互相依赖的可能场景)
- 完整demo如下
// index.ts
import { IOC } from './ioc'
import { A, B } from './mod'

const ioc = new IOC()
ioc.bind<A>('A', A)
ioc.bind<B>('B', B)

class C {
  a: A
  b: B

  constructor() {
    this.a = ioc.use('A')
    this.b = ioc.use('B')
  }
}

const c = new C()

c.a.hello()
c.b.hello()
c.b.hi()

// ioc.ts
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

  bind<T>(key: string, Cls: IClass<T>, singleton: boolean = true): void {
    this.container.set(key, { factory: () => new Cls(), singleton })
  }

  use(key: string) {
    const item = this.container.get(key)
    if (!item) throw new Error(`${key} not found`) /* 对应以来对象不存在 */
    if (!item.singleton) return item.factory() /* 非单例模式,返回一个新对象 */
    if (!item.instance) item.instance = item.factory() /* 单例模式,若不存在就创建一个 */
    return item.instance
  }
}

// mod.ts
export class A {
  hello() {
    console.info('Hello, this is A')
  }
}

export class B {
  hello() {
    console.info('Hello, this is B')
  }

  hi() {
    console.info('Hi, this is B')
  }
}
````

## DI 的概念与作用

DI Dependence Injection 依赖注入 是 IOC 常见的一种应用方式. 在对象创建时自动注入对应的依赖对象
一般通过注解来实现与标记对应类的依赖声明
我们可以借助 Ts 的装饰器语法糖 来简化 DI 的过程. 从而避免 通过 ioc.bind(xx) this.xx = ioc.use 这种写法

````ts
// IOC.ts
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
}```

具体使用方式
```ts
// index.ts
import { IOC } from './ioc'

@ioc.provide()
class D {
  hello() {
    console.info('this is D')
  }
}

class E {
  @ioc.inject('D')
  d?: D

  hi() {}
}

const e = new E()
console.info('e', e)
e.d && e.d.hello()

````
