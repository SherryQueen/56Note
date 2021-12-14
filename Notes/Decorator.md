# 装饰器(Decorator)

> tags: #DesignPattern #Typescript #Decorator

## 装饰器模式介绍

在面向对象编程中, decorator 是一种设计模式. 允许动态地将行为添加到单个对象.而不会影响来自同一类的其他对象
装饰器的用法

#### 开启使用

- 装饰器还处于提案状态(地址: proposal-decorator) 还未被归类为标准. 需要通过 babel 或 typescript 来进行转换.
  - babel: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
  - TypeScript: https://www.typescriptlang.org/docs/handbook/decorators.html
- 作用顺序:
  - 多个装饰器可同时修饰单一对象. 按照装饰器的声明顺序,逐层包围. 类似一个洋葱
  - 声明顺序: 从 顶 -> 底 执行顺序: 从 底 -> 顶
- 作用场景:
  - 实例成员(Instance member): 参数装饰器 然后是方法,访问,属性装饰器
  - 静态成员(Static member): 参数装饰器 然后是方法,访问,属性装饰器
  - 构造函数(Constructor): 参数装饰器
  - 类(Class): 类装饰器
- 装饰器工厂

```ts
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

console.info(new B('B').toString()) // Your name is B
```

#### 类装饰器(Class Decorator)

类装饰器应该在声明在类的前面. 作用于类的构造函数 . 可用来 观察,修改,替换类的定义

- 参数
  | 参数名 | 参数类型 | 备注 |
  | ----------- | -------- | ------------ |
  | constructor | Function | 类的构造函数 |

```ts
function iClass(
  constructor: Function /* 接受的参数为被装饰类的声明定义. 因为 Class 只是语法糖, 其等价于 function 来声明构造函数和通过 function 的原型来绑定方法和属性. 故此处参数类型为函数 */,
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

console.info(new A('A').toString()) // My name is A
```

#### 方法装饰器(Method Decorator)

方法装饰器应该在声明在方法的前面. 作用域方法的属性描述. 可用于 观察,修改,替换方法的定义

- 参数
  | 参数名 | 参数类型 | 备注 |
  | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
  | 当前参数存在两种可能: 1. instance(当修饰的是普通方法时) 2. constructor(当修饰的是静态方法) | 当前参数存在两种可能: 1. instance: 当前修饰方法所在类的实例 2. constructor: 当前修饰的修饰静态方法所在类的构造函数 | 普通方法: 所在类的实例 静态方法: 所在类构造函数 |
  | propertyName | string \| symbol | 装饰的方法名 |
  | descriptor | PropertyDescriptor of member | 属性描述器 |

```ts
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
/* 不会枚举出 hi 方法 */
  console.info('C key', key)
}

try {
/* hello 赋值失败 */
  c.hello = function () {}
} catch (err) {
  console.info('assign value to hello failure')
}
```

#### 属性装饰器(Property Decorator)

属性装饰器应申明在属性声明之前. 不能执行代码的声明文件中

- 参数
  | 参数名 | 参数类型 | 备注 |
  | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
  | 当前参数存在两种可能: 1. instance(当修饰的是普通方法时) 2. constructor(当修饰的是静态方法) | 当前参数存在两种可能: 1. instance: 当前修饰方法所在类的实例 2. constructor: 当前修饰的修饰静态方法所在类的构造函数 | 普通方法: 所在类的实例 静态方法: 所在类构造函数 |
  | name | string \| symbol | 声明的属性名 |

```ts
import 'reflect-metadata'
const formatMetadataKey = Symbol('format')
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString) // 为该属性注入元数据
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey) // 获取该属性的元数据
}

class Greeter {
  @format('Hello %s')
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    let formatString = getFormat(this, 'greeting')
    return formatString.replace('%s', this.greeting)
  }
}
```

参数装饰器(Parameter Decorator)
修饰方法的参数, 声明在函数的参数声明前.

- 参数
  | 参数名 | 参数类型 | 备注 |
  | ------------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------ |
  | 当前参数存在两种可能: 1. instance(当修饰的是普通方法时) 2. constructor(当修饰的是静态方法) | | 当前参数存在两种可能: 1. instance: 当前修饰方法所在类的实例 2. constructor: 当前修饰的修饰静态方法所在类的构造函数 | 普通方法: 所在类的实例 静态方法: 所在类构造函数 |
  | propertyName | string\|symbol | 修饰的参数所在的方法名 |
  | paramIndex | number | 修饰参数的在函数中的下标 |

```ts
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
```

## 装饰器的用处

- 在代码层面无侵入式的注入代码, 拦截对应的属性
- 将业务划分的更仔细, 将与函数功能本身无关的代码抽取,并方便复用
