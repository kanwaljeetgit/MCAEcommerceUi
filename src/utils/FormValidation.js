import { toast } from 'react-toastify';

function isEmpty(fieldValue) {
    return fieldValue ? false : true;
};

function alertEmpty(fieldName) {
    toast.error(`${fieldName} must not be empty`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

function alertError(message) {
    toast.error(`${message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

function alertSuccess(message) {
    toast.success(`${message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

export { isEmpty, alertEmpty, alertError, alertSuccess };
//export default test;