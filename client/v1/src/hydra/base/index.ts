export const global = (() => {
  if (typeof globalThis === 'object')
    return globalThis;

  try {
    // @ts-ignore
    return this || new Function('return this')();
  } catch {
    if (typeof window === 'object')
      return window;
  }
})();
