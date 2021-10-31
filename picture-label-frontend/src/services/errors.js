import {toast} from "react-toastify";

export const showError = str =>
  toast.error(str, {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
});
