export const routes = import.meta.glob('@/router/routes/**', { eager: true });
export const modules = import.meta.glob('@/store/modules/**', { eager: true });
export const locales = import.meta.glob('@/i18n/locales/**', { eager: true });
export const middlewares = import.meta.glob('@/middleware/**', { eager: true });