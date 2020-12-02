import store from '../store';

export function showError(error){
    store.dispatch("error/addError", error);
    setTimeout(() => {
        store.dispatch("error/removeError");
    }, 3000);
}