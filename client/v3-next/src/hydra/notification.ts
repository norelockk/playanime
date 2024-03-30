import { toast, ToastOptions, ToastType } from 'vue3-toastify';
import { storage } from '.';

const theme = storage.getStorageData('clientDark') ? 'dark' : 'light';

const defaultNotificationTime = 8 * 1000;

const notificationOptions: ToastOptions = {
  theme,
  transition: 'slide',
  hideProgressBar: true,
}

export const showNotification = (
  data: {
    message: string,
    category: ToastType,
    hideAfter?: number,
  }
) => toast(
  data.message,
  {
    type: data.category,
    delay: data.hideAfter || defaultNotificationTime,
    ...notificationOptions
  }
);

// TODO: figure out promise notifications how it's working
// export const showPromiseNotification = (
//   callback: Promise<any>,
//   data: {
//     strings: { [key: string]: string },
//     hideAfter?: number
//   },
// ) => toast.promise(callback, {
//   pending: 'loading',
//   success: 'success',
//   error: 'error',
//   // {
//   //   ...notificationOptions,
//   // }
// });