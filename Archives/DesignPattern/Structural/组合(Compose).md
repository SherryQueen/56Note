# 组合(Compose)

## 优点

- 客户端无需关心 操作对象是 单个对象还是组合结构
- 客户端无需关心 目标的层级结构
- 添加新的叶子构件还是组合构件都比较简单
- 通过叶子构件和组合构件, 形成复杂的树形结构

## 特点

- 对于客户端来说, 在基本操作上, 不存在叶子构件和组合构件的区别
- 透明与安全
  - 透明模式
    - 叶子构件和组合构件的方法在抽象构件中统一声明
  - 安全模式
    - 抽象构件中 未声明适用于任何构件的方法

## 结构

- Component(抽象构件)
  - 定义抽象方法
- Leaf(叶子构件)
  - 不存在子节点
  - 继承 Component. 具体实现
- Composite(容器构件)
  - 可以存在子节点
  - 继承 Component. 具体实现

## 使用场景

- 类似文件系统的树形结构数据
  - 客户端访问文件时, 无需关心 文件夹还是文件

## 代码示例

```Typescript
interface Component {
  add():void
  info():any
  remove():void
}

class File extends Component {
  getContent(): string
}

class Folder extends Component {
  list(): File[]
}

```
