import toast from 'react-hot-toast';

export const successToast = (message: string) => {
    toast.remove();
    toast.success(message)
}

export const errorToast = (message: string) => {
    toast.remove();
    toast.error(message);
}


