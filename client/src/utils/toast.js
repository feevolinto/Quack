// src/utils/toast.js
import toast from 'react-hot-toast';

/**
 * Success toast
 */
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

/**
 * Error toast
 */
export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

/**
 * Info toast
 */
export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

/**
 * Warning toast
 */
export const showWarning = (message) => {
  toast(message, {
    duration: 3500,
    position: 'top-right',
    icon: '⚠️',
    style: {
      background: '#F59E0B',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

/**
 * Loading toast
 */
export const showLoading = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6B7280',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

/**
 * Dismiss toast
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Promise toast (for async operations)
 */
export const showPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
    },
    {
      position: 'top-right',
      style: {
        padding: '16px',
        borderRadius: '8px',
      },
    }
  );
};

export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
  loading: showLoading,
  dismiss: dismissToast,
  promise: showPromise,
};