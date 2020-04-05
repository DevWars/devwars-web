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

        // for longer messages, give the user more time to read it, otherwise it
        // can disappear too soon.
        let timeOutAmount = (toast.message.split(' ').length / 6) * 3000;
        if (timeOutAmount < 3000) timeOutAmount = 3000;

        // ensure all messages end with a full stop.
        toast.message =
            toast.message[toast.message.length - 1] === '.'
                ? toast.message
                : (toast.message += '.');

        setTimeout(() => commit('remove', toast), timeOutAmount);
    },

    async error({ dispatch }, message) {
        // since in most cases and future bases we want to look to include a error message with
        // error responses from the server. If the message contains an error object or message
        // object then use this before falling back on its self.
        if (message.error != null) {
            message = message.error;
        } else if (message.message != null) {
            message = message.message;
        }

        await dispatch('add', { type: 'error', message });
    },

    async warning({ dispatch }, message) {
        await dispatch('add', { type: 'warning', message });
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
            dispatch('add', {
                type: 'error',
                message: `${e.response.status} : ${e.response.statusText}`,
            });
        }
    },
};
