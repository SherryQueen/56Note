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
