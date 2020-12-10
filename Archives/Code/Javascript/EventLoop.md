# EventLoop

## 概念

- 宏任务
  - 代码段
  - setTimeout/setInterval 等的回调
  - IO
  - UX Event
  - UI Render
- 微任务
  - Promise.then
  - async/await

## 一次循环

1. 从宏任务队列取宏任务执行
2. 检查微任务队列, 有则执行 (中途产生的微任务会在当前阶段被执行)
3. 渲染更新阶段 判断是否需要渲染
   - 尽可能保持帧率稳定
     - 默认为 60 帧(16.67ms)
     - 若卡顿时降为 30 帧
     - 标签不可见 帧数更低
   - 是否跳过渲染
     - 浏览器判定更新渲染不会带来页面上的变动
     - 帧动画为空
4. 若本轮不需要渲染， 则结束此次循环，跳到 10 检查是否空闲
5. 判断窗口是否发生变化 resize
6. 判断页面是否发生滚动 scroll
7. 执行帧动画回调 requestAnimationFrame(rAF)
8. 执行 IntersectionObserver 回调
9. 重新绘制用户界面 UI render
10. 若 宏任务/微任务队列都为空。 则执行 requestIdleCallback

## 任务队列

- 浏览器分为多个队列。每个队列有对应的优先级
- 交互相关队列优先级大于执行

## requestAnimationFrame

- 重新渲染前调用
  - 因为回调可能会修改 Dom 元素。故在渲染前执行
  - 根据上述的一次循环过程中，该回调可能不会被执行

```javascript
// Task queue
setTimeout(() => {
  document.body.style.background = 'red'
  setTimeout(() => {
    document.body.style.background = 'blue'
  })
})

// rAF
let i = 10
let req = () => {
  i--
  requestAnimationFrame(() => {
    document.body.style.background = 'red'
    requestAnimationFrame(() => {
      document.body.style.background = 'blue'
      if (i > 0) {
        req()
      }
    })
  })
}

req()
```

- 浏览器可能会同时压缩两次定时任务一起执行
  - 而不会在两次宏任务之间穿插微任务

```javascript
setTimeout(() => {
  console.log('sto')
  requestAnimationFrame(() => console.log('rAF'))
})
setTimeout(() => {
  console.log('sto')
  requestAnimationFrame(() => console.log('rAF'))
})

queueMicrotask(() => console.log('mic'))
queueMicrotask(() => console.log('mic'))
```

## requestIdleCallback

- 在浏览器空闲时执行
- 默认 deadline 50ms
  - 100ms 一个交互周期。 留 50ms 响应可能存在的交互动作，保证用户体验
- 在页面不可见 或 浏览器繁忙时不会被调用
- 可通过 timeout 参数，确保 rIC 在特定时间一定被执行
