# Chrome 扩展

## 与插件的区别

- 插件 工作在内核阶段。 主要以 native 的形式来提供一些功能
- 扩展 工作在浏览器层面。 基于 Chrome 提供的 API 来实现功能
- [Extension Document](https://developer.chrome.com/extensions)

## 模块

### Manifest

- 定义插件的一些属性
- (字段说明)[https://developer.chrome.com/extensions/manifest]

### Background scripts

- Event Handler
- 保持休眠(dormant)状态 直到事件唤醒
  - 唤醒
    - 插件第一次安装与更新
    - 监听到对应的事件分发
    - content_scripts 发送通知
    - runtime.getBackgroundPage 等
  - 休眠
    - background.js
      - api 调用完成
      - 网络请求完成
      - 消息发送端口关闭
    - background page
      - 所有视图不可见

```jsonc
{
  // ...
  "background": {
    "scripts": ["background.js"]
  }
  // ...
}
```

#### Set up listeners

[background pages](https://developer.chrome.com/extensions/background_pages)

- 不要嵌套注册
- 注册后可移除

```javascript
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['selection'],
  })
})

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function () {
  // * do something
})

chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  chrome.runtime.onMessage.removeListener(event)
})
```

### UI Interface and Popup

[user interface](https://developer.chrome.com/extensions/user_interface)

- Enable or Disable the extension
- Extension icons
- Popup 按钮下拉页面。支持一些简单的交互
- Tooltip 提示
- Context menu 右键菜单定义
- Commands 命令

### Content scripts

[Content script](https://developer.chrome.com/extensions/content_scripts)

- Injected

```javascript
// Injected code
chrome.runtime.onMessage.addListener(
  function(message, callback) {
    if (message == “changeColor”){
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"'
      });
    }
  }
);

// Or Injected entire file
chrome.runtime.onMessage.addListener(
  function(message, callback) {
    if (message == “runContentScript”){
      chrome.tabs.executeScript({
        file: 'contentScript.js'
      });
    }
  }
);

// or
{
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "css": ["myStyles.css"],
      "js": ["contentScript.js"],
    }
  ],
}
```

- run_at (run time)
  - document_idle
  - document_start
    - After any fields from css, before DOM is constructed or any other script is run
  - document_end
    - Scripts are injected immediately after the DOM is complete, but before subresources like images and frames have loaded.

### Options Page
