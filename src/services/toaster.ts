import { toast, ToastContent, ToastOptions } from 'react-toastify';

const toastError = (error: string | { message: string }) =>
  toast.error(typeof error === 'string' ? error : error.message, { autoClose: false });

const toastSucess = (successMessage: string, options?: ToastOptions): ToastContent =>
  toast.success(successMessage, {
    autoClose: 5000,
    hideProgressBar: true,
    ...options,
  });

export default { toastSucess, toastError };
