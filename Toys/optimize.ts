export function debounce(
  this: any,
  fn: Function,
  timeout: number,
  first: boolean = false
) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (first) {
      if (!timer) fn.apply(this, args);
    } else {
      if (timer) clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!first) fn.apply(this, args);
      timer = null;
    }, timeout);
  };
}
