/* eslint-disable @typescript-eslint/consistent-type-assertions */
export function debounce<T extends Function>(cb: T, wait = 20) {
  let h: any = null;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}
