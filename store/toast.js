export const state = () => ({
    id: 0,
    toasts: []
});

export const mutations = {
    push(state, toast) {
        toast.id = state.id++;

        state.toasts.push(toast);
    },

    remove(state, toast) {
        state.toasts.splice(state.toasts.indexOf(toast), 1);
    }
};

export const actions = {
    add({commit, dispatch}, toast) {
       commit('push', toast);

       setTimeout(() => {
            commit('remove', toast);
       }, 3000);
    },

    errors({commit, dispatch}, e) {
        e.response.data.errors.forEach(it => {
            dispatch('add', {type: 'error', message: it.default_message});
        });
    }
};
