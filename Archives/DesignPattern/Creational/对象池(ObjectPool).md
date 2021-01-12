# 对象池

## 优点

- 可以带来巨大的性能提升
  - 大部分对象创建后使用次数较低,重用对象可以提高利用率
  - 减少对象创建/销毁时的开销

## 特点

- 可增长(或严格限制最大个数)
  - 对象池为空时,自动创建
- client 请求时返回未被使用的空闲对象
- client 使用完成式, 需要释放使用的对象. 对象池会将其标记未使用等待被重用(或超时销毁)
- 全局唯一,维持单例模式、
- 周期性清理长时间未被使用的对象

## 结构

- Client 客户端
- Reusable 可重用对象
- Reusable Pool 可重用对象池
  - getInstance 获取对象池对象 `全局唯一,使用单例模式`
  - acquireReusable 获取一个可重用对象 `若对象池有空闲对象,则返回. 无则生成一个新的对象. 若超出限制,则返回异常或等待`
  - releaseReusable 释放可重用对象,返回对象池 `重置该对象的属性, 标记为空闲对象, 等待下一次被使用 或 销毁`
  - setMaxPoolSize 设置对象池最大容量 `控制对象池大小,避免其占用过多资源`

## 使用场景

- 数据库连接
- Socket 连接数的重用
- 对象可重用的情景下
- Redis 其实就可以认为是一个大的对象池

## 代码示例

```Typescript
interface IReusable {
  reset(): boolean
  destroy(): void
}

abstract class IPool<R extends IReusable> {
  size: number

  pools: Reusable[] = []
  waitPools: Reusable[] = []
  fn: { new (): R }

  constructor(fn: { new (): R }, size: number = 5) {
    this.fn = fn
    this.size = size
  }
  abstract acquire(): R | null
  abstract release(r: R): boolean
  abstract expire(r: R): boolean
  getNewReusable(): R {
    return new this.fn()
  }
  setMaxSize(size: number) {
    this.size = size
  }
}

class Reusable implements IReusable {
  reset() {
    return true
  }
  destroy() {}
}

class Pool extends IPool<Reusable> {
  constructor(fn: { new (): IReusable }, size?: number) {
    super(fn, size)
    this.pools = []
    this.waitPools = []
  }
  acquire(): Reusable | null {
    let r = this.waitPools.pop()
    if (!r) {
      if (this.size < this.waitPools.length + this.pools.length) return false
      r = this.getNewReusable()
    }
    this.pools.push(r)
    return r
  }
  release(r: Reusable): boolean {
    const idx = this.pools.indexOf(r)
    if (idx === -1) return false

    const rObj = this.pools[idx]
    this.pools.splice(idx, 1)

    const flag = rObj.reset()
    if (!flag) return false

    this.waitPools.push(rObj)
    return true
  }
  expire(r: Reusable): boolean {
    const idx1 = this.pools.indexOf(r)
    const idx2 = this.waitPools.indexOf(r)
    if (idx1 !== -1) {
      const r = this.pools[idx1]
      this.pools.splice(idx1, 1)
      r.destroy()
    }
    if (idx2 !== -1) {
      const r = this.pools[idx2]
      this.pools.splice(idx2, 1)
      r.destroy()
    }
    return false
  }
}
```
