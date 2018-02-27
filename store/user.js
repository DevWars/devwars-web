import Http from "../services/Http";

export const state = () => ({
    user: null
});

export const mutations = {
    user(state, user) {
        state.user = user;
    }
};

export const actions = {
    async refresh({commit}) {
        let user = await Http.for('user').get();

        commit('user', user);
    },

    async login({commit, dispatch}, {username, password}) {
        try {
            await Http.for('user').post('login', {username, password});

            await dispatch('refresh');

            dispatch('navigate', '/dashboard', {root: true});
        } catch (e) {
            commit('user', null)
        }
    }
};
