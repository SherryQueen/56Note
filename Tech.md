# Tech

## Basic

#### Bit Operation

#### Synchronous/Asynchronous

#### Blocking/Unblocking

#### Sort

#### DataStructure

###### [Heap](/Docs/Notes/DataStructure/Heap.js)

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

### Koa

#### Express

#### Egg

## Engineering

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
  - [拥塞算法](/Docs/Notes/TCP拥塞算法.md)
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

- [Serverless 简介](/Docs/Notes/Serverless简介.md)
