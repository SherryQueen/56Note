# Webpack

> tags: #Webpack #Engineering

## 核心流程

#### 初始化

1. 初始化参数 根据命令行,配置文件,配置对象结合默认配置得到最后的参数
2. 创建编译器对象 根据参数创建 Complier 对象
3. 初始化编译环境 注入内置插件,模块工厂,规则集,加载插件
4. 开始编译 执行 Complier 的 run 方法,创建 Complition 对象
5. 确定入口 根据 entry 赵处所有入口文件

#### 构建

1. 编译模块 从 entry 开始, 根据 loader 将模块转为标准 JS 对象. 再转为 AST 对象.找出对应的依赖模块, 重复当前步骤
2. 完成模块编译 得到模块编译后的内容和依赖关系图

#### 生成

1. 输出 根据入口和模块 打包成对应的 chunk. 转换为单独的文件加入到输出列表
2. 写入 根据配置确定输出路径和文件名, 将文件内容写入到文件系统

## 概念

- Compiler 编译管理器. 启动后创建直到退出
- Complation 单词编辑过程的管理器. 若 watch=true, 则运行过程只有一个,每次文件变更会重新触发
- Dependce 依赖对象, 记录模块间的依赖关系
- Module 内部所有资源皆以 module 存在
- Chunk 讲 module 按规则组织成 chunk
- Loader 资源转换器, A-->B
- Plugin webpack 的 hook, 会介入编译过程
  - 带有 apply 函数的类, 接收一个 complier 参数. 基于参数完成 hooks 的注册

## 初始化流程

![InitialFlow](/Assets/20211206200201.png)

## 构建流程

![BuildFlow](/Assets/20211206200202.png)

## 生成流程

![GenerateFlow](/Assets/20211206200203.png)

## Tapable

> webpack 插件的核心支架.
> 本质上是围绕 订阅/发布 模式叠加各种特化逻辑

- Tapable 使用时通常需要经历如下步骤：
  - 创建钩子实例
  - 调用订阅接口注册回调，包括：tap、tapAsync、tapPromise
  - 调用发布接口触发回调，包括：call、callAsync、promise
- 支持同步 同步熔断 同步瀑布流 同步循环 异步 异步并行
- 动态编译. 根据钩子类型,参数,回调队列等信息动态生成执行函数
