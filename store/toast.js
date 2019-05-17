export const state = () => ({
    id: 0,
    toasts: [],
});

export const mutations = {
    push(state, toast) {
        state.id += 1;
        toast.id = state.id;

        state.toasts.push(toast);
    },

    remove(state, toast) {
        state.toasts.splice(state.toasts.indexOf(toast), 1);
    },
};

export const actions = {
    add({ commit }, toast) {
        commit('push', toast);

        setTimeout(() => {
            commit('remove', toast);
        }, 3000);
    },

    async error({ dispatch }, message) {
        await dispatch('add', { type: 'error', message });
    },

    async success({ dispatch }, message) {
        await dispatch('add', { type: 'success', message });
    },

    errors({ dispatch }, e) {
        if (e.response.status === 400) {
            e.response.data.forEach((it) => {
                dispatch('add', { type: 'error', message: it.message });
            });
        } else {
            dispatch('add', { type: 'error', message: `${e.response.status} : ${e.response.statusText}` });
        }
    },
};
