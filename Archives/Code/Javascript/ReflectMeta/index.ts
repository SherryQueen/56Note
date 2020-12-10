import './reflect-metadata'

const CLASS_KEY = 'ioc:class'
const CLASS_KEY_TWO = 'ioc:class_two'
const PROTOTYPE_KEY = 'ioc:prototype'

function classDecorator(key: string, args: any) {
  return function (target: any) {
    Reflect.defineMetadata(CLASS_KEY, { key, args }, target)
    return target
  }
}

function classDecorator2(key: string, args: any) {
  return function (target: any) {
    Reflect.defineMetadata(CLASS_KEY_TWO, { key, args }, target)
    return target
  }
}

function prototypeDecorator(key: string, args: any) {
  return function (target: any, name: any, descriptor: any) {
    Reflect.defineMetadata(PROTOTYPE_KEY, { name, key, args }, target, name)
    return descriptor.value
  }
}

@classDecorator('classA', [])
@classDecorator2('classA2', [])
class A {
  constructor() {}

  @prototypeDecorator('hello', [])
  hello() {}
}

@classDecorator('classB', [])
class B {
  constructor() {}

  @prototypeDecorator('hi', [])
  hi() {}
}

console.info(Reflect.getMetadata(CLASS_KEY, A))
console.info(Reflect.getMetadata(CLASS_KEY, B))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, A))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, new A(), 'hello'))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, A.prototype.hello))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, B))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, new B(), 'hi'))
console.info(Reflect.getMetadata(PROTOTYPE_KEY, B.prototype.hi))
console.info(Reflect.getMetadataKeys(A))
console.info(Reflect.getMetadataKeys(B))
