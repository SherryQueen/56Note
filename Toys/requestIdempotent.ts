const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

interface IOption {
  timeout?: number;
  ignoreQuery?: boolean;
}

interface IMemoryItem {
  loading: boolean;
  promise: Promise<unknown>;
  timeout: number;
  startTime: number;
}

export const requestIdempotent = <R = unknown>(
  fn: (...args: unknown[]) => Promise<R>,
  opt: IOption = {}
) => {
  const memory = new Map<string, IMemoryItem>();
  const timeout = typeof opt.timeout === "undefined" ? -1 : opt.timeout;
  const ignoreQuery =
    typeof opt.ignoreQuery === "undefined" ? false : opt.ignoreQuery;

  return async (...args: unknown[]): Promise<R> => {
    const key = ignoreQuery ? "ignoreQuery" : JSON.stringify(args);

    const ans = memory.get(key);
    console.info("request once key", args, key, ans);
    if (!ans) return startFetch();
    if (ans.loading) return ans.promise as R;
    if (ans.timeout === -1 || Date.now() - ans.startTime <= timeout)
      return ans.promise as R;
    // * Restart request
    return startFetch();

    async function startFetch(): Promise<R> {
      const ans: IMemoryItem = {
        loading: true,
        promise: fn(...args),
        timeout,
        startTime: 0,
      };
      memory.set(key, ans);

      try {
        const data = (await ans.promise) as R;
        ans.loading = false;
        ans.startTime = Date.now();
        return data;
      } catch (err) {
        memory.delete(key);
        throw err;
      }
    }
  };
};

const fun1 = async (query) => {
  await sleep(1000);
  console.log("exec fun1 once");
  return `result of fun1(${query})`;
};

const fun2 = async (query) => {
  await sleep(1000);
  console.log("exec fun2 once");
  return `result of fun2(${query})`;
};

const fn1 = requestIdempotent(fun1);
const fn2 = requestIdempotent(fun2);

const test = async () => {
  let data;
  data = await Promise.all([fn1("1"), fn1("1"), fn1("2"), fn2("1")]);
  console.log("data", data);
  await sleep(2000);
  data = await fn1("1");
  console.log("data", data);
};

test();
