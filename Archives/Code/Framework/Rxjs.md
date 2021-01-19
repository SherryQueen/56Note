# Rxjs

- **事件相关**的工具类库
- 通过**可观察序列**将**异步**和**事件**组合处理的程序
- 通过 **观察者** **迭代器** **函数式编程** **集合** 结合起来,以实现对事件的有序管理
- [Rxjs 文档](https://rxjs.dev/guide/overview)
- [Rxjs repo](https://github.com/ReactiveX/rxjs)

## Observable

- 可被调用的集合. 在 Rx 里作为 Producer

|      | System  | Single   | Multi      | Producer                              | Consumer                              |
| ---- | ------- | -------- | ---------- | ------------------------------------- | ------------------------------------- |
| Pull | Default | Function | Iterator   | Passive: produces data when requested | Active: Decides when data is required |
| Push | Rxjs    | Promise  | Observable | Active: produces data at its own pace | Passive: reacts to received data      |

- Observable 和 Function 相似
  - Observable 通过 subscribe 订阅执行
  - Function 通过直接调用 或 .call 执行
- Observable 和 Function 区别

  - Function 只支持同参数返回同样的值(纯函数情况下)

    ```javascript
    function foo() {
      console.log('Hello')
      return 42
      return 100 // dead code. will never happen
    }

    foo.call()
    // Hello
    // 42
    ```

  - Observable 支持 返回多个值

    ```javascript
    import { Observable } from 'rxjs'
    const foo = new Observable((subscriber) => {
      console.log('Hello')
      subscriber.next(42)
      subscriber.next(100) // "return" another value
      subscriber.next(200) // "return" yet another
    })

    foo.subscribe((x) => {
      console.log(x) // Push system.
    })

    // Hello
    // 42
    // 100
    // 200
    ```

- foo.call: give me one value synchronously
- observable.subscribe: give me any amount of value, either synchronously or asynchronously

## Observer

- 监听 并消费 Observable 传递地值
- 是一系列回调的组合

```javascript
const observer = {
  next: (v) => console.info(`Observer got a next value: ${v}`),
  error: (err) => console.error(`Observer got an error: ${v}`),
  complete: () => console.ifo(`Observer got a complete notification`),
}

observable.subscribe(observer)
```

## Subscription

- 包含 一个 `unsubscribe` 去释放资源 或 取消 observable 的执行的
- 由 `observable.subscribe(...)` 返回
- 支持 add 方法, 可同时卸载多个 observable

## Operators

- 纯函数的函数式编程 处理集合的一些操作 如 `map filter ...`
- 接受 observable 作为入参,返回新的 observable 的纯函数. `入参的 observable 不会有任何改变`

- Creation Operators
  - 通过一些**提前定义好的行为和参数**. 返回一个 observable
- High-Order Observable

  - Observables 的 Observable 对象

- Marble Diagrams

  - ![Diagrams](./rxjs-marble-diagram-anatomy.svg)

- Structure

  ```javascript
  import { Observable } from 'rxjs'

  function demo(args) {
    return (observable) =>
      new Observable((observer) => {
        /** 该方法会被每次调用 */
        /** 通过对 旧有的 observable 事件的订阅, 从而获取对应的值, 并将结果专递给新的 observer */
        const subscription = observable.subscribe({
          next(value) {
            /** Some code */
            observer.next(value) // 传递新值
          },
          error(err) {
            observer.error(err)
          },
          complete() {
            observer.complete()
          },
        })

        /** 当新的 observable 被 取消订阅时,调用. 实现订阅关系的清理 */
        return () => {
          subscription.unsubscribe()
          /** ...some */
        }
      })
  }

  observable.pipe(demo())
  ```

## Subject

- 等价于 EventEmitter 用于分发/传递 值 给对应的 可调用对象

## Scheduler

- 控制并发的调度器
