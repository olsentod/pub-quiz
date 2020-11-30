import store from '../store';

export function showError(error){
    store.dispatch("addError", error);
    setTimeout(() => {
        store.dispatch("removeError");
    }, 3000);
}