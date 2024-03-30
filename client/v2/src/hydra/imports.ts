export const routes = import.meta.glob('./routes/**', { eager: true });
export const modules = import.meta.glob('./modules/*.ts', { eager: true });
export const locales = import.meta.glob('../locales/*.json', { eager: true });
export const middlewares = import.meta.glob('./base/middleware/*.ts', { eager: true });