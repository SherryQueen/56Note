# 单例

## 优点

- 全局复用同一个实例
- 避免多处引用数据不一致的问题

## 特点

- 全局唯一
  - 多线程环境下 应考虑线程安全
  - 多服务部署,应考虑将唯一对象提取至独立机器部署,确保唯一(比如通过单一的 redis 集群 来保障多地/多服务器上的服务 相关数据的一致)
- 全局可访问
- 只在第一次使用初始化,后续使用将会一直返回第一次初始化的对象(lazy initial)

## 结构

- Client 客户端
- Singleton
  - theInstance 实例本身
  - getInstance 获取实例的方法 `线程安全: 若实例未初始化则初始化. 若已初始化则返回 theInstance`

## 使用场景

- 全局配置
- Application 的 app 实例

## 代码示例

```Typescript
class ISingleton {
  private static theSingleton?: ISingleton
  getSingleton(): ISingleton {
    if (!ISingleton.theSingleton) ISingleton.theSingleton = new ISingleton()
    return ISingleton.theSingleton
  }
}

```
