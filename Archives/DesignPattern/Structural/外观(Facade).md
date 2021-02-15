# 外观(Facade)

## 优点

- 调用方无需关心底层的复杂实现

## 特点

- 向上提供了简单的接口供调用
- 对外封闭了内部的复杂实现

## 结构

- 客户端(Client)
  - 调用方, 通过外观角色来调用子系统. 无需关心子系统的具体实现
- 外观角色(Facade)
  - 对外暴露接口, 对内封装多个子系统的具体调用
- 子系统(SubSystem)
  - 实现自己的调用逻辑

## 使用场景

- 为多个平台子系统提供统一对外的调用接口

## 代码示例

```Typescript
class Subsystem1 {
  operator() {}
}

class Subsystem2 {
  operator() {}
}

class Facade {
  constructor() {
    this.sys1 = new Subsystem1()
    this.sys2 = new Subsystem2()
  }
  operator() {
    this.sys1.operator()
    this.sys2.operator()
  }
}
```

## 与适配者模式的区别

- 适配者模式: 将类的接口转变为需要的另一个接口 重在转换接口
- 外观模式: 为一系列接口封装更高级的对外接口
