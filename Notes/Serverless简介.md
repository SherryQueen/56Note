# Serverless简介

> tags: #Serverless #Infra #Iaas #Paas # Saas

## 发展历程

|           | Iaas                                             | Paas               | Saas                 | Serverless |
| --------- | ------------------------------------------------ | ------------------ | -------------------- | ---------- |
| Developer | Application<br> Runtime<br>Security<br>Database  | Application        | Interaction with API | Function   |
| Provider  | Network <br> Storage<br>Virtualization<br>Server | Expect Application | All                  | All        |
| Example   | AliYun                                           | AliYun\| LeanCloud | Lark/DingDing/ICloud |            |

## Serverless 解决了什么

- 虚拟机

  - 指定配置容量, 容易造成资源浪费

- 容器

  - 对资源规则更精细化划分
  - 缩扩容较慢

- 函数
  - 函数作为最小单位, 需要多少资源只给多少资源, 用完就释放
  - 边缘计算
    - 加速 CDN
    - 提升用户访问速度

## 现状

- 基础能力的封装

  > 减少重复劳动, 快速上线业务

  - 数据库
  - 缓存
  - 认证
  - 重定向
  - CDN
  - 文件存储
  - ...

- 无法满足部分业务场景
  - 长链接

## 建设的难点

#### Faas

- 容器准备阶段(1. 缓存代码 2. 精简启动框架)

  - 调度资源
  - 下载用户代码
  - 启动容器

- 容器运行阶段(调度时机不一定精准)
  - 初始化 Runtime & 加载用户代码
  - 执行代码

#### BaaS

- 基础能力分散
- 代码不方便进行逻辑隔离

## 使用场景

- 高频率, 低资源

  - 营销场景, 周期性活动. 避开短时的大量请求, 在平时节省资源

- 低频率, 高资源

  - PDF 渲染图片 计算资源不定时消耗大

- 低频率, 低资源
  - 常见的 CRUD
