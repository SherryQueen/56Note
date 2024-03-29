# Vite

> tags: #Fe #Web #Vite

> Vite: Next generation frontend tooling. It's fast!
> VIte:下一代前端生成工具. 超快的!

- 仓库: Vite 本文基于 Vite 2.5.10
- 文档: Vite 文档

## 解决了什么

#### 开发过程中, 冷启动速度慢, 且对内存消耗大

- webpack 等会优先打包整个应用, 然后才开启服务
- Vite 将应用模块拆分成 依赖 和 源码 改进开发服务启动时间
  - 依赖: 采用 ESBuild 构建 , 由 Go 实现的构建工具速度比 Js 快 10~100 倍
  - 源码: 源码需要通过转换,编译且经常变动, 且对于单个页面,不是所有源码都被需要(也就是有一部分源码可以暂时不需要编译
- Vite 以原生 ESM 方式提供源码,将模块加载的工作交给了浏览器. 由浏览器动态加载模块. 也只对需要加载的部分模块进行源码的转化
- HTML 加载 ESM 模块格式的 Js

```js
<script type="module" src="https://xx.xx/x.esm.js"></script><!-- 通过type设置以ESM形式加载, src指向ESM模块 -->
```

#### 开发过程, 更新缓慢

- 因为打包器需要重构整个应用, 所以在项目越大的情况下,打包速度将会越慢. (也是 webpack 努力的方向, webpack5 新的缓存能力其实就是来提升更新和构建时的效率)
- 当前的 HMR 依然是对于一整个模块的更新, Vite 的只需要更新对应的 ESM 模块对应的 Js 即可. 速度上优势明显
- Vite 对于源码配置协商缓存, 对依赖配置强缓存, 从而加快页面刷新或切换时的加载速度. 从而提升热更速度

## 缺点

- 如果引用的模块过多, 第一次加载的时候需要加载更多的 Js 模块(可以通过 HTTP2 来解决
- 对于不支持 ESM 导出的第三方库, 需要利用插件来做转换
- 生产环境依然需要打包. 整体浏览器环境对于 ESM 支持暂时还较差.(不过对于 ToB 可以小规模试用

## 大致实现原理

#### 🚀 启动阶段

1. 合并配置, 并设置开发者模式.
2. 是否以中间件模式(即服务由开发者完全控制)创建 HTTP 服务 于 WS 服务
3. 加载源码目录下的文件，并缓存模块与路径
4. 开启 FSWatcher 监听源码 的 新增/变动/删除 事件. 并绑定对应的热更事件
5. 绑定一些内置中间件

- baseMiddleware 当 base !== '/' 时引入 用于重定向 URL 到 base
- 静态目录
- 转换依赖和源码为对应的静态文件. 并设置对应的缓存规则
- SPA fallback 到 fallback 页面
- Proxy 中间价, 转发请求
- 错误中间件
- Etc...
- 启动服务 并打开对应的开发页面

#### 🔥 热更新

1. 监听到文件的增/删/更新操作，触发对应的回调事件
2. 判断当前热更的源码文件，更新对应的缓存对象
3. 通过 ws 发送更新消息给页面，加载或移除或重新加载变动的 Js
