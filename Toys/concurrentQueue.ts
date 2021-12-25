export interface IConcurrentQueueOption {
  retry?: number
  maxLimit?: number
}

const defaultOption: Required<IConcurrentQueueOption> = {
  maxLimit: 5,
  retry: 2,
}

interface IFn<T = any> {
  (...args: any[]): Promise<T>
}

/**
 * 1. 判断是否可执行
 * 2. 加入队列, 等待被触发 block
 * 3. 占取空间, 并执行
 * 4. 执行失败 - 重试
 * 5.1. 执行成功 - 返回
 * 5.2. 重试失败 - 抛出错误
 * 6. 检查队列 check
 */
export class ConcurrentQueue {
  waitQueue: (() => void)[] = []

  concurrentCount = 0
  option: Required<IConcurrentQueueOption> = defaultOption

  constructor(option?: IConcurrentQueueOption) {
    this.option = option ? { ...defaultOption, ...option } : defaultOption
  }

  updateOption(option: IConcurrentQueueOption) {
    this.option = { ...this.option, ...option }
  }

  async run(fn: IFn) {
    const { maxLimit, retry } = this.option
    if (this.concurrentCount >= maxLimit) await this.block()

    this.concurrentCount++
    let i = 0
    while (i < retry) {
      let done = false
      try {
        const result = await fn()
        done = true
        return result
      } catch (err) {
        i++
        if (i > maxLimit) {
          done = true
          return Promise.reject(err)
        }
      } finally {
        if (done) {
          this.concurrentCount--
          this.next()
          break
        }
      }
    }
  }

  private next() {
    if (!this.waitQueue.length) return
    const fn = this.waitQueue.shift()
    fn && fn()
  }

  private block(): Promise<void> {
    const block = () => new Promise<void>((resolve) => this.waitQueue.push(resolve))
    return block()
  }
}
