const state = () => ({
    errors: []
});

const actions = {
    addError(context, error) {
        context.commit('addError', error);
    },
    removeError(context) {
        context.commit('removeError');
    }
}

const mutations = {
    addError(state, error) {
        state.errors.push(error);
    },
    removeError(state) {
        state.errors.shift();
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}