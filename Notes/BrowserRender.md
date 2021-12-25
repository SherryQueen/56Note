# 浏览器渲染

> tags: #Render #Browser

## Render

![DOM Tree -> Layer Tree](/Assets/20211207061301.png)

- 位图: 以二维数组记录当前图像的每一个像素点的具体颜色
  - 即将图片转换为计算机可理解的数据结构() 浏览器可以根据位图, 在特定像素上着色.使整个屏幕很好地渲染出图像
- 纹理: GPU 中的位图, 存储在 GPU Video RAM 中
  - 有大小限制. 比如: 长宽必须为 2 的幂次方. 大小不超过 2048 或 4096
- 光栅化(Rasterize): 本质是坐标转换,几何离散化,然后再填充
  - 对图像按照纹理进行分块(Tile), 对每个 Tile 进行单独光栅化.

#### Render Object

- 树形结构, 与 DOM 节点对应. 实现了对应的 DOM 节点的绘制入位图的方法. 负责 DOM 节点的可见内容的绘制方法

#### Render Layer

- 由 Render Object 提升而来. 形成 RenderLayer 树
  - 解决元素层叠的问题(z-index)
  - 处理 opcaity mask 等产生层叠/半透明的元素
- 控制了网页绘制的层次顺序, 而从属于 RenderLayer 的 RenderObject 决定了 Layer 的内容. 所有 RenderLayer 和 RenderObject 一起决定了网页在屏幕上最终呈现出来的内容

#### Graphics Layer(Compositing Layer)

- 对于 动画/video/canvas/3d css 的场景下. 页面经常变动, 即位图经常变动. 如果每次重绘位图会造成极大的性能开销
- 从 RenderLayer 提升而来.
  - 3D transform、will-change 设置为 opacity、transform 等 以及 包含 opacity、transform 的 CSS 过渡和动画 这 3 个经常遇到的提升合成层的情况请重点记住。
- 将纹理/3d transform/opacity 等属性拆分为多层纹理. 由 GPU 分别绘制后进行合成并最终渲染到屏幕上

#### Renderer Structure

> 浏览器的系统架构. 通过两个进程, 来满足 Js 执行与页面渲染之类的核心任务需要

![DOM Tree -> Layer Tree](/Assets/20211207061302.png)

###### Renderer Process

> 浏览器一个标签的一组进程. 负责当前标签在屏幕上的渲染与 Js 执行

###### Compositor Process Thread

> 如果不需要 Js/CSS 参与的场景时, 当前线程可以直接简单计算并处理. 无需调用 Main Thread.
> 因为与 Main Thread 时独立的线程, 不会被 Main Thread 的计算阻塞. 在 MainThread 被阻塞依然可以提交输出结果给 GPU Process 输入下一个页面. (比如 动画卡, 滚动不卡 的情况)

- 接收到 Vsync 信号(Vsync，水平同步表示画出一行屏幕线，垂直同步就表示从屏幕顶部到底部的绘制已经完成，指示着前一帧的结束，和新一帧的开始)
- 接收 OS 传来的用户交互 滚动/点击/输入
  - 处理输入, 转换为对应的 layer 的移动和处理. 并很直接将新帧 commit 给 GPU Process 输出新页面
  - 如果绑定了对应的事件回调, 或者有对应的动画. 唤醒 MainThread 来执行回调和动画的计算

###### Main Thread

- Js 的执行线程.具体执行可以参照下方 Life of Frame

###### Compositor Tile Worker(s)

- 光栅化线程, 对每个图层进行计算. 不同浏览器可能有不同的线程数量

###### GPU Process

> 浏览器为所有标签和周边进程提供的单个进程
> 随着帧的提交,将数据通过 GPU 计算得到实际像素并推送到屏幕

## Frame

> 页面由一帧一帧图像构成,当每秒帧的绘制数(FPS)达到 60 时, 用户观感流畅. 小于时,用户观感为卡顿
> 当保持 FPS=60 时, 每帧的渲染时间: 1s/60 ≈ 16.67ms 即 Js 执行和 UI 渲染应该在 16ms 的时间内完成

#### 生命周期(Life of Frame)

![DOM Tree -> Layer Tree](/Assets/20211207061303.png)

###### 1. VSync Signal

- 单帧结束的信号到达.
- 如果有对应的 Js 回调被触发, 进行下一步

###### 2. Input Events handle

- 可以接收到来自 IO 的多次事件. 但 Compositor Thread 本身在一帧只会触发一次事件(自带节流)

###### 3. rAF(requestAnimationFrame)

- 每帧必会执行. 在整理可以提前对元素进行一些改变.
- 可能会触发青雉重排

###### 4. Parse HTML

- 如果有 DOM 元素发生变动, 会执行解析 HTML 得到 DOM 的这一过程

###### 5. Recalc Styles

- Js 执行过程中变更了样式和 DOM. 需要重新计算 DOM 的样式

###### 6. Layout

- 重排.涉及元素位置信息的 DOM 改动或者样式变动. 会重新计算所有元素的位置和尺寸信息.
- color/background 等颜色变动并不会触发重排

###### 7. Update Layer Tree

- 因为进行了重排, 所以更新 Render Layer 的层叠排序

###### 8. Paint

- 重绘. 对页面上的元素进行重新绘制

1. 记录哪些绘画需要被调用. 序列化到 SkPicture 的数据结构里
2. 从 SkPicture 里取出对应的绘画明亮. 进行光栅化和位图填充.

###### 9. Composite

- 计算每个 Graphicis Layer 合成所需要的 data. 如 位移/缩放/旋转/Alpha 等 并传递给 Compositor Tile Worker 进行计算

###### 10. Commit:

- 第 8 步得到 SkPicture 数据提交后进行光栅化渲染(一般借助 GPU 进行计算).然后填充像素

###### requestIdleCallback

- 如果当前帧有空闲的时间剩余, 则执行该回调
- 如果没有空闲,则该回调永远不会执行. 但可通过设置 timeout 参数确保一定会被执行

## ⚠️ 注意点

#### 重排与强制重排 Relayout

- 如果修改了布局相关的 CSS 或元素, 则 Layout 标记为 dirty. 会在下一帧进行重排计算.而不是当前帧立即执行
- 如果在 Layout 为 dirty 的情况下, 访问元素的正确信息, 将会触发强制重排从而得到正确的信息.
  - 会将 Layout 的过程提前到 Js 执行过程, 延缓 Js 的执行效率
    //Layout 未 dirty 访问 domA.offsetWidth 不会 Force Layout
    domA.style.width = (domA.offsetWidth + 1) + 'px'
    //Layout 已经 dirty， Force Layout
    domB.style.width = (domB.offsetWidth + 1) + 'px'
    //Layout 已经 dirty， Force Layout
    domC.style.width = (domC.offsetWidth + 1) + 'px'
- 每次重排或者强制重排后，当前 Layout 就不再 dirty
- 如果 layout 部位 dirty. 则无论访问多少次后也不会重新触发重排

```js
// Layout未dirty 访问多少次都不会触发重排
console.log(domA.offsetWidth)
console.log(domB.offsetWidth)

//Layout未dirty 访问domA.offsetWidth不会Force Layout
domA.style.width = domA.offsetWidth + 1 + 'px'
//Layout已经dirty， Force Layout
console.log(domC.offsetWidth)

//Layout不再dirty，不会触发重排
console.log(domA.offsetWidth)
//Layout不再dirty，不会触发重排
console.log(domB.offsetWidth)
```

- 可以通过 rAF 进行部分调整, 从而在当前帧完成重排
- 不要通过 requestIdleCallback 进行 CSS/DOM 元素变动, 会触发强制重排

#### 重绘 Repaint

- 更改某个元素会触发重绘的样式, 将在下一帧里触发重绘.
- 重绘是以合成层为单位的。也即  invalidating(作废的区域)的既不是整个文档，也不是单个元素，而是这个元素所在的合成层。
