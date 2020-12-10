# Extension 介绍

## Manifest file

### Content-scripts

- 插件向对应页面注入的脚本。 与原始页面共享 Dom 但不共享 Js
- 注册方式如下

```json
{
  // 需要直接注入页面的JS
  "content_scripts": [
    {
      //"matches": ["http://*/*", "https://*/*"],
      // "<all_urls>" 表示匹配所有地址
      "matches": ["<all_urls>"], // 注入的页面
      // 多个JS按顺序注入
      "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
      // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
      "css": ["css/custom.css"],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      "run_at": "document_start" // 默认值为 document_start
    }
  ]
}
```

### background 与 event-page

- 常驻后台的运行服务与页面, 生命周期跟随浏览器。 可无限跨，调用绝大部分 API
- 注册方式如下：

```json
{
  "background": {
    "page": "background.html", // 若指定 page， 则会有一个页面
    "scripts": ["background.js"], // 可指定多个运行的后台脚本
    "persistent": false // 转为 event-page， 只在有需要时加载: 插件第一次安装，更新，接受content-scripts的消息等
  }
}
```

### popup

- 点击插件按钮弹出的小页面。生命周期短

```json
"browser_action":{
  "default_icon": "img/icon.png",
  // 图标悬停时的标题，可选
  "default_title": "这是一个示例Chrome插件",
  "default_popup": "popup.html"
}
```

### Inject js

- 支持向页面注入 js 文件。并可以正常被 Dom，其他 Js 访问到

```json
{
  // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
  "web_accessible_resources": ["js/inject.js"]
}
```
