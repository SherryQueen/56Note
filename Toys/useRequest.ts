import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export enum IRequestStatus {
  WAITING = "waiting",
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
  CANCEL = "cancel",
}

export interface IRequestHookOption<R = unknown, Q = any> {
  onSuccess?: (data?: R, param?: Q) => void;
  onError?: (err: Error, param?: Q) => void;
  onCallback?: () => void;
  errorPrompt?: (err: Error) => void;
}

// TODO: Cache and retry
export interface IRequestOption<R = unknown, Q = any> {
  fn: (param: Q) => Promise<R>;
  initState?: R;
  initialParam?: Q;
  showError?: boolean;
  immediately?: boolean;
  option?: IRequestHookOption<R, Q>;
}

export interface IRequestState<R = unknown, Q = any> {
  status: IRequestStatus;
  data?: R;
  param?: Q;
  loading: boolean;
}

const getAbortFn = <R = unknown>(): [Promise<R>, () => void] => {
  let abort: () => void = () => {};
  const promise = new Promise<R>((_, reject) => {
    abort = () => reject(new Error("Request aborted"));
  });
  return [promise, abort];
};

export const createRequestHook = (globalOption: IRequestHookOption) => {
  const useRequest = <R = unknown, Q extends object = object>(
    option: IRequestOption<R, Q>
  ): [IRequestState<R, Q>, Dispatch<SetStateAction<Q>>] => {
    const firstly = useRef<boolean>(!(option.immediately ?? false));
    const _request = useRef<(param: Q) => Promise<R>>(option.fn);
    const _option = useRef<IRequestHookOption<R, Q>>({
      ...globalOption,
      ...option.option,
    });

    const [param, setParam] = useState<Q>(option.initialParam || ({} as Q));
    const [state, setState] = useState<IRequestState<R, Q>>({
      loading: false,
      data: option.initState,
      param: option.initialParam,
      status: IRequestStatus.WAITING,
    });

    useEffect(() => {
      // * The hook run the first time when the code is injected
      if (firstly.current) {
        firstly.current = false;
        return;
      }

      setState((prevState) => ({
        ...prevState,
        loading: true,
        status: IRequestStatus.LOADING,
      }));
      const { onSuccess, onError, onCallback, errorPrompt } = _option.current;
      const [p, abort] = getAbortFn<R>();

      Promise.race([_request.current.call(null, param), p])
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            data,
            status: IRequestStatus.SUCCESS,
          }));
          if (onSuccess) onSuccess(data, param);
        })
        .catch((err) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            status: IRequestStatus.FAILURE,
          }));
          if (option.showError && errorPrompt) errorPrompt(err);
          if (onError) onError(err, param);
        })
        .finally(onCallback);

      return () => {
        abort();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          status: IRequestStatus.CANCEL,
        }));
      };
    }, [option.showError, param]);
    return [state, setParam];
  };
  return useRequest;
};
