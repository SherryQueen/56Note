function iClassFactory(format = 'My name is $name' /* 装饰器工厂接受的参数, 可设置多个参数 */) {
  return /* 返回一个类装饰器,.也可以返回其他类型的装饰器 */ function (constructor: Function) {
    // 此处可以根据装饰器工厂的参数来进行一些设定
    constructor.prototype.toString = function () {
      return format.replace('$name', this.name)
    }
  }
}

@iClassFactory('Your name is $name')
class B {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
console.info(new B('B').toString())

function iClass(
  constructor: Function /* 接受的参数为被装饰类的声明定义. 因为 Class 只是语法糖, 其等价于function来声明构造函数和通过function的原型来绑定方法和属性. 故此处参数类型为函数 */,
) {
  console.info('iClass', constructor, constructor.prototype)
  constructor.prototype.toString = function () {
    return `My name is ${this.name}`
  }
}

@iClass
class A {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
console.info(new A('A').toString())

interface ICls {
  new (...args: any[]): any
}

function iMethod(instance: any, propertyName: PropertyKey, descriptor: PropertyDescriptor) {
  /* 实例新增属性 */
  instance[`_${propertyName.toString()}`] = descriptor.value
  /* 设定当前属性不可写 */
  descriptor.writable = false
}

function iStaticMethod(constructor: ICls, propertyName: PropertyKey, descriptor: PropertyDescriptor) {
  /* 类的原型上添加一个新方法 */
  constructor.prototype._hi = function () {
    console.info(`This is a hi decorate ${propertyName.toString()}`)
  }
  /* 设定当前属性不可枚举 */
  descriptor.enumerable = false
}

class C {
  @iStaticMethod
  static hi() {
    console.info('hi, this is C')
  }

  @iMethod
  hello() {
    console.info('hello, this is C')
  }
}

C.hi()
C.hi = function () {
  console.info('update once')
}
C.hi()

for (let key in C) {
  console.info('C key', key)
}

const c = new C()
c.hello()
;(c as any)['_hi']()
;(c as any)['_hello']()

for (let key in c) {
  /* 不会枚举出 hi方法 */
  console.info('C key', key)
}

try {
  /* hello 赋值失败 */
  c.hello = function () {}
} catch (err) {
  console.info('assign value to hello failure')
}

/**
参数修饰器的用法
*/

import 'reflect-metadata'
const requiredMetadataKey = Symbol('required')

function required /* 参数修饰器 */(target: Object, propertyName: string | symbol, paramIndex: number) {
  const params: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName) || []
  params.push(paramIndex)
  Reflect.defineMetadata(requiredMetadataKey, params, target, propertyName)
}

function validate /* 函数修饰器,进行校验 */(
  this: any,
  target: Object,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>,
) {
  const method = descriptor.value

  descriptor.value = /* 重写方法, 注入基于参数修饰器的校验 */ function () {
    const params: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName) || []
    if (Array.isArray(params) && params.length) {
      for (let idx of params) {
        if (idx >= arguments.length || arguments[idx] === undefined)
          throw new Error(`${propertyName} missing the required argument, idx: ${idx}`)
      }
    }
    return method.apply(this, arguments)
  }
}

class Test {
  @validate
  print(@required name: string, @required age?: number) {
    console.info(`name: ${name}, age: ${age}`)
  }
}

try {
  new Test().print('56', 20)
  new Test().print('59')
} catch (err) {
  console.error('Err', err)
}

