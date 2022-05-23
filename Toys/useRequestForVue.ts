import { onMounted, readonly, ref, shallowReactive, watch } from 'vue'

type IEmptyFunction = () => void

const emptyFunction: IEmptyFunction = () => {}

export enum IRequestStatus {
  WAITING = 'waiting',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  CANCEL = 'cancel',
}

export interface IRequestHookOption<R = unknown, Q = any> {
  onBefore?: (param?: Q) => void
  onSuccess?: (data?: R, param?: Q) => void
  onError?: (err: Error, param?: Q) => void
  onCallback?: IEmptyFunction
  errorPrompt?: (err: Error) => void
}

// TODO: Cache and retry
export interface IRequestOption<R = unknown, Q = any> {
  fn: (param: Q) => Promise<R>
  initState?: R
  initialParam?: Q
  showError?: boolean
  immediately?: boolean
  option?: IRequestHookOption<R, Q>
}

export interface IRequestState<R = unknown, Q = any> {
  status: IRequestStatus
  data?: R
  param?: Q
  loading: boolean
}

type ISetParam<Q> = (params: ((q: Readonly<Q>) => Q) | Q) => void

const getAbortFn = <R = unknown>(): [Promise<R>, IEmptyFunction] => {
  let abort: IEmptyFunction = emptyFunction
  const promise = new Promise<R>((_, reject) => {
    abort = () => reject(new Error('Request aborted'))
  })
  return [promise, abort]
}

interface IRequestHookResult<R, Q> {
  state: IRequestState<R, Q>
  setParam: ISetParam<Q>
  cancelRequest: IEmptyFunction
  stop: IEmptyFunction
}

export const createRequestHook = (globalOption: IRequestHookOption) => {
  const useRequest = <R = unknown, Q extends object = object>(
    option: IRequestOption<R, Q>
  ): IRequestHookResult<R, Q> => {
    const _request = option.fn as (param: Q) => Promise<R>
    const _option = readonly({ ...globalOption, ...option.option })

    const cancelRequest = ref<IEmptyFunction>(emptyFunction)
    const param = ref<Q>(option.initialParam || ({} as Q))
    const state = shallowReactive<IRequestState<R, Q>>({
      loading: false,
      data: option.initState,
      param: option.initialParam,
      status: IRequestStatus.WAITING,
    })

    const stop = watch(param, () => {
      state.loading = true
      state.status = IRequestStatus.LOADING

      const { onBefore, onSuccess, onError, onCallback, errorPrompt } = _option
      const requestPromise = _request.call(null, param.value)
      const [p, abort] = getAbortFn<R>()

      cancelRequest.value = () => {
        abort()
        ;(requestPromise as any).abort?.() // ./request.ts提供的abort方法
      }

      onBefore?.(param.value)
      Promise.race([requestPromise, p])
        .then((data: R) => {
          state.data = data
          state.loading = false
          state.status = IRequestStatus.SUCCESS
          onSuccess?.(data, param.value)
        })
        .catch(err => {
          state.loading = false
          state.status = IRequestStatus.FAILURE
          ;(option.showError ?? true) && errorPrompt?.(err)
          onError?.(err, param.value)
        })
        .finally(onCallback)
    })

    const updateParam: ISetParam<Q> = _params => {
      _params instanceof Function ? (param.value = _params(param.value)) : (param.value = _params)
    }
    onMounted(() => {
      option.immediately && updateParam({ ...param.value })
    })
    return {
      state,
      setParam: updateParam,
      stop,
      cancelRequest: cancelRequest.value,
    }
  }
  return useRequest
}

const useRequest = createRequestHook({
  errorPrompt: (err: Error) => console.error(`请求失败: ${err.message}`),
})
export default useRequest
