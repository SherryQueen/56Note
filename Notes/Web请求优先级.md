# Web 请求优先级

> tags: #Optimize #Web #Request #Browser

## 默认优先级

| 资源类型                        | 优先级                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| HTML                            | Highest                                                                                            |
| Fonts                           | High                                                                                               |
| Stylesheets                     | Highest                                                                                            |
| 通过 @import 加载的 Stylesheets | Highest，会被安排在阻塞脚本之后。                                                                  |
| Images                          | 默认是 Low，在初始视口中渲染时升级为 Medium。                                                      |
| JavaScripts                     | Low, Medium 或 High。查看 Addy Osmani 的 JavaScript Loading Priorities in Chrome  来获取更多细节。 |
| Ajax，XHR，或者 fetch() API     | High                                                                                               |

## 名词

#### 关键请求

> 对 LCP(Largest Contentful Paint) 和 FCP(First Contentful Paint)有直接影响的请求

## 优化思路

#### 减少关键请求链的影响

1. 减少关键请求的数量
2. 压缩和最小化来减少资源的大小
3. 非关键脚本标记为异步
4. 考虑 @font-face 直接内联到 HTML
5. 避免使用 CSS 背景图或@import
6. 预加载提前获取关键资源

## 技术手段

#### 控制请求优先级

- 设置 preload 会提高对应的资源优先级
  - 不能滥用, 容易阻塞. 需要仔细测试

#### 图片懒加载

- 图片只有需要显示的时候才会去加载
  - `<img loading="lazy" src="">` 懒加载图片
  - 最好提前计算图片尺寸, 避免图片加载完成导致重绘

#### font-display

- font-display: swap 优先使用本地已有字体渲染文本. 然后在加载网络字体之后立即替换
