export interface IRequestAPIOption extends RequestInit {
  timeout?: number;
}

export interface IHandleResult {
  (data: string | number | Array<any> | Record<string, any>): string | number | Array<any> | Record<string, any>;
}

export class TimeoutError extends Error {
  constructor(msg?: string) {
    super(`Timeout Error: ${msg || 'Request timeout'}`);
  }
}

enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
}

export const isStatusSuccess = (status: number): boolean => status >= 200 && status < 300;

export const getURLWithSearch = (url: string, query?: Record<string, any>): string => {
  if (!query) return url;
  const search = new URLSearchParams(query).toString();
  return url + (url.includes('?') ? (url.endsWith('&') ? search : `&${search}`) : `?${search}`);
};

export const getErrorMessage = (data: string | Record<string, any>): string => {
  if (typeof data === 'string') return data;
  return data.msg || data.message || data.errMsg || data.errMessage;
};

export const handleResult: IHandleResult = (data) => {
  if (!data) return data;
  if (typeof data === 'string' || typeof data === 'number' || Array.isArray(data)) return data;

  if ('code' in data || 'status_code' in data) {
    const code = data.code || data.status_code;
    if (code !== 0 && code !== '0') throw new Error(getErrorMessage(data) || '未知错误');
    return data.data;
  }
  return data;
};

export const handleJson = async (status: number, response: Response): Promise<Record<string, any>> => {
  const data = await response.json();
  if (isStatusSuccess(status)) return Promise.resolve(data);
  throw new Error(getErrorMessage(data) || response.statusText || '未知错误');
};

export const handleText = async (status: number, response: Response): Promise<string> => {
  const text = await response.text();
  if (isStatusSuccess(status)) return Promise.resolve(text);
  throw new Error(text || response.statusText || '未知错误');
};

export const handleResponse = (response: Response): Promise<string | Record<string, any>> => {
  const status = response.status;
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes(ContentType.JSON);
  return isJson ? handleJson(status, response) : handleText(status, response);
};

const splitArgs = (
  args: any[]
): {
  url: string;
  query: Record<string, any>;
  data: BodyInit | Record<string, any>;
  option: Record<string, any>;
} => {
  let url, query, data, option;
  if (args.length === 1) [url] = args;
  else if (args.length === 2) [url, data] = args;
  else if (args.length === 3) [url, query, data] = args;
  else [url, query, data, option] = args;

  return { url, query: query || {}, data: data || {}, option: option || {} };
};

interface IRequestOption {
  baseURL: string;
  timeout?: number;
  handleResult?: IHandleResult;
  commonRequestOption?: RequestInit;
}

export class IRequest implements IRequestOption {
  baseURL: string;
  timeout: number;
  _handleResult: IHandleResult;
  _commonRequestOption: RequestInit;

  constructor(opt?: IRequestOption) {
    this.baseURL = opt?.baseURL ?? '';
    this.timeout = opt?.timeout ?? 0;
    this._handleResult = opt?.handleResult ?? handleResult;
    this._commonRequestOption = opt?.commonRequestOption ?? {};
  }

  private async _request(url: string, option: IRequestAPIOption): Promise<any> {
    const _url = this.baseURL + url;
    let timer: NodeJS.Timeout;
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = option.timeout ?? this.timeout;
    const opt: IRequestAPIOption = {
      ...this._commonRequestOption,
      ...option,
      signal,
    };

    const queue: Promise<any>[] = [];
    if (timeout) {
      queue.push(
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(new TimeoutError());
          }, timeout);
        })
      );
    }
    queue.push(
      fetch(_url, opt)
        .catch((err) => {
          if (err.name === 'TypeError') throw new Error(`当前网络异常, 请稍后重试: ${err.message}`);
          throw new Error(`请求发送失败: ${err.message}`);
        })
        .finally(() => timer && clearTimeout(timer))
    );

    const promise = Promise.race(queue);
    Object.defineProperty(promise, 'abort', {
      writable: false,
      configurable: false,
      enumerable: false,
      value: () => controller.abort(),
    });

    return promise;
  }

  protected request<T = any>(url: string, option: IRequestAPIOption & { preHandle?: boolean }): Promise<T> {
    const promise = this._request(url, option);
    return option?.preHandle ?? true ? promise.then(handleResponse).then(this._handleResult) : promise;
  }

  protected get<R = unknown>(url: string, query?: Record<string, any>, option?: IRequestAPIOption): Promise<R> {
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'get',
    });
  }

  protected post<R = any>(url: string): Promise<R>;
  protected post<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected post<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected post<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected post<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.postJson(url, query, data as Record<string, any>, option);
  }

  protected postJson<R = any>(url: string): Promise<R>;
  protected postJson<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected postJson<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected postJson<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected postJson<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected postJson<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'post',
      body: data ? JSON.stringify(data) : undefined,
      headers: { ...option.headers, 'Content-Type': ContentType.JSON },
    });
  }
  protected postForm<R = any>(url: string): Promise<R>;
  protected postForm<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected postForm<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected postForm<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected postForm<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'post',
      body: data ? new URLSearchParams(data as Record<string, any>).toString() : undefined,
      headers: { ...option.headers, 'Content-Type': ContentType.FORM },
    });
  }

  protected postFormData<R = any>(url: string): Promise<R>;
  protected postFormData<R = any>(url: string, data: FormData): Promise<R>;
  protected postFormData<R = any>(url: string, query: Record<string, any>, data: FormData): Promise<R>;
  protected postFormData<R = any>(
    url: string,
    query: Record<string, any>,
    data: FormData,
    option: IRequestAPIOption
  ): Promise<R>;
  protected postFormData<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'post',
      body: data as BodyInit,
    });
  }

  protected put<R = any>(url: string): Promise<R>;
  protected put<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected put<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected put<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected put<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.putJson(url, query, data as Record<string, any>, option);
  }

  protected putJson<R = any>(url: string): Promise<R>;
  protected putJson<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected putJson<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected putJson<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected putJson<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'put',
      body: data ? JSON.stringify(data) : undefined,
      headers: { ...option.headers, 'Content-Type': ContentType.JSON },
    });
  }

  protected putForm<R = any>(url: string): Promise<R>;
  protected putForm<R = any>(url: string, data: Record<string, any>): Promise<R>;
  protected putForm<R = any>(url: string, query: Record<string, any>, data: Record<string, any>): Promise<R>;
  protected putForm<R = any>(
    url: string,
    query: Record<string, any>,
    data: Record<string, any>,
    option: IRequestAPIOption
  ): Promise<R>;
  protected putForm<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'put',
      body: data ? new URLSearchParams(data as Record<string, any>).toString() : undefined,
      headers: { ...option.headers, 'Content-Type': ContentType.FORM },
    });
  }

  protected putFormData<R = any>(url: string): Promise<R>;
  protected putFormData<R = any>(url: string, data: FormData): Promise<R>;
  protected putFormData<R = any>(url: string, query: Record<string, any>, data: FormData): Promise<R>;
  protected putFormData<R = any>(
    url: string,
    query: Record<string, any>,
    data: FormData,
    option: IRequestAPIOption
  ): Promise<R>;
  protected putFormData<R = any>(...args: any[]): Promise<R> {
    const { url, query, data, option } = splitArgs(args);
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'put',
      body: data as BodyInit,
    });
  }

  protected del<R = unknown>(url: string, query?: Record<string, any>, option?: IRequestAPIOption): Promise<R> {
    return this.request(getURLWithSearch(url, query), {
      ...option,
      method: 'delete',
    });
  }
}
