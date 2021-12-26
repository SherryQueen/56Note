# Tech

## Basic

#### Bit Operation

#### IO Operator

- 同步与异步: 针对 `调用方` 和 `被调用方` 是**线程**之间的关系.

  - 同步

  ```mermaid
  sequenceDiagram
    title: 同步请求
    participant A as Request
    participant B as Response
    A ->>+ B: 发起同步请求
    note over A: 不做任何事, 等待结果返回(线程阻塞)
    note over B: 处理请求
    B ->>- A: 返回结果
    note over A: 得到结果并继续运行
  ```

  - 异步

  ```mermaid
  sequenceDiagram
    title: 异步请求
    participant A as Request
    participant B as Response
    A ->>+ B: 发起异步请求, 传送回调函数Callback
    note over A: 继续运行(线程非阻塞)
    note over B: 处理请求
    B ->>- A: 返回结果,调用回调函数 Callback
    note over A: 回调函数Callback根据返回结果运行
  ```

- 阻塞与非阻塞: 在同一时刻, **线程** 只会处于阻塞或非阻塞状态

  - 阻塞

  ```mermaid
  sequenceDiagram
    title: 阻塞
    participant M as Main
    note over M: 线程运行
    M ->>+IO: 发起请求
    note over M: 线程阻塞, 不执行任何操作
    IO ->>-M: 返回结果
    note over M: 线程继续运行
  ```

  - 非阻塞

  ```mermaid
  sequenceDiagram
    title: 非阻塞
    participant M as Main
    note over M: 线程运行
    M ->>+IO: 发起请求, 传递回调函数
    note over M: 线程非阻塞,继续运行,不关心调用结果
    IO ->>-M: 返回结果, 并调用回调函数
    note over M: 线程执行回调函数
  ```

#### [Sort](sort.Notes/Sort.md)

- [Bubble Sort](Notes/Sort/bubble.js)
- [Bucket Sort](Notes/Sort/bucket.js)
- [Quick Sort](Notes/Sort/quick.js)
- [Heap Sort](Notes/Sort/heap.js)
- [Insertion Sort](Notes/Sort/insertion.js)
- [Merge Sort](Notes/Sort/merge.js)
- [Selection Sort](Notes/Sort/selection.js)
- [Shell Sort](Notes/Sort/shell.js)

#### DataStructure

- [Heap](/Notes/DataStructure/Heap.js)

#### DesignPattern

## HTML(Hyper text mark language: 超文本标记语言)

#### DOM(Document Object Model) 跨平台,语言无关的表示和操作网页的方式.

![DOM Object](/Assets/dom-object.png)

- 提供对应的接口,用于 Js 对网页进行操作
- DOM 模型用一颗**逻辑树**表示一个文档,树的每个分支终点是一个**节点**. 每个**节点**包含着一个**对象**
- Node(节点) 是一种接口. 各种类型的`DOM API`会从这个接口继承

#### WebComponents

- Custom Element
- Shadow DOM

  - DOM

    - Shadow Root
    - Shadow Boundary
    - Shadow Tree
    - Shadow Host

  - CSS
    - [:host](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host)

- HTML Template
- Life Cycle
  - connectedCallback
  - disconnectedCallback
  - adoptedCallback
  - attributeChangedCallback

## CSS(CSS Object Model(CSS OM))

#### Selector

- 声明方式
  - ID 选择器
  - 类选择器
  - 伪类选择器
  - 关系选择器
    - A E
    - A > E
    - E:first-child
    - B + E
    - B ~ E

#### Animation

- will-change

  - 元素即将改变, 浏览器预先优化 加强动画帧率

- transform
  - 不会触发重排， 提升性能

#### Layout

- Grid
- Flex
- Table

#### CSS Box

## JavaScript

## Browser

- [render](Notes/BrowserRender.md)

## React

## Vue

## NodeJs

#### 组成

- Libuv

  - 进程
  - 线程
  - 线程池
  - 信号
  - 定时器
  - 进程间通信

- 第三方库

  - DNS 解析
  - HTTP 解析器
  - HTTP2 解析器
  - 解压压缩库 zlib
  - 加密解析库 openssl

- V8
  - Js 解析
  - Js 执行
  - 自定义拓展

#### 启动过程

1. 注册 C++模块
2. Environment 对象和绑定 Context
3. 初始化模块加载器
4. Libuv 事件循环

   1. Timer: 二叉堆实现, 最快过期节点在根节点

      - 底层模块: 基于二叉堆, 最快的节点在最上面.
      - 定时器模块: 基于双向链表实现
        - 维护一个 map
          - TimerList 保存可服用的 Timer 对象. 并更新链表中节点的下次执行时间
          - 超时时间为 key
          - 定时器链表(Timeout)

   2. pending: 处理 Poll IO 阶段产生的回调
   3. Check, prepare, idle

      - 每个阶段维护一个队列. 处理阶段线性执行回调

   4. Poll IO: 处理文件描述符

      - 创建 IO 观察者观察文件描述符

   5. Closing: uv_close 的回调

### 模块

- [Stream](Notes/Node/Stream.md)

### 框架

#### Koa

#### Express

#### Egg

## Engineering

- [什么是前端工程化](Notes/前端工程化.md)
- [Monorepo](Notes/Monorepo.md)

### Build Tools

- [Vite](Notes/Vite.md)
- [Webpack](Notes/Webpack.md)

## Network

#### URL/URI

![URL](/Assets/url.png)

#### Network stack

###### Application(应用层)

> 数据的发送处理与接收处理

- HTTP/HTTPS
  - CORS
  - How to establish a HTTPS connection
  - Request/Response message
  - Cookie
  - Cache
- Websocket
- DNS

###### Transport(传输层)

> 确认数据的传输方式。根据当前网络情况和用户的需要,选择特定的传输方式进行传输

- TCP(Transmission Content Protocol)(可靠的,面向连接的可靠的字节流服务)
  - 浏览器中单域名限制
  - [拥塞算法](/Notes/TCP拥塞算法.md)
- UDP(User Data Protocol)(不可靠的,简单的面向数据报文的字节流服务)

###### Network(网络层)

> 网络上存在大量主机，如何寻找到目标主机

- IP
- APR

###### DataLink(数据链路层)

> 因为物理层只传输二进制,无法确认从哪里到哪里的二进制为本次传输的数据。
> 对数据分装成帧(Frame) 确保主机知道二进制流从哪里开始到哪里结束

- PPP

###### Physical(物理层)

> 物理链路(光纤/电话线等)，连接多台设备。 **只传输二进制**

#### Load Balancing

###### Nginx

## Infra

#### Docker

#### Database

#### OS

- Linux
  - File description
  - Pipe
  - Process schedule

#### Serverless

- [Serverless 简介](/Notes/Serverless简介.md)
