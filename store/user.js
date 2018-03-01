import Http from "../services/Http";

export const state = () => ({
    user: null,
    count: 0,
});

export const mutations = {
    user(state, user) {
        state.user = user;
    },

    count(state, count) {
        state.count = count
    }
};

export const actions = {
    async refresh({commit}) {
        let user = await Http.for('user').get();

        commit('user', user);
    },

    async refreshUserCount({commit}) {
        let data = await Http.for('leaderboard').get('users');

        commit('count', data.count);
    },

    async login({commit, dispatch}, {username, password}) {
        try {
            await Http.for('user').post('login', {username, password});

            await dispatch('refresh');

            dispatch('toast/add', {type: 'success', message: 'Welcome back to DevWars!'}, {root: true});
            dispatch('navigate', '/dashboard', {root: true});
        } catch (e) {
            dispatch('toast/error', e.response.data, {root: true});

            commit('user', null)
        }
    },

    async register({commit, dispatch}, registration) {
        try {
            await Http.for('user').post('register', registration);

            await dispatch('refresh');

            dispatch('navigate', '/dashboard', {root: true});
        } catch (e) {
            dispatch('toast/errors', e, {root: true});
        }
    },

    async logout({commit, dispatch}) {
        await Http.for('user').post('logout');

        await dispatch('navigate', '/', {root: true});

        commit('user', null);
    },

    async settings({commit, dispatch}, data) {
        try {
            let user = await Http.for('user/settings').post(data);

            commit('user', user);
        } catch (e) {
            dispatch('toast/errors', e, {root: true});
        }
    },

    async email({dispatch, commit}, data) {
        try {
            let user = await Http.for('user/settings').post('email', data);

            commit('user', user);

            await dispatch('toast/success', `We've updated your email, please go verify your email.`, {root: true});
            await dispatch('navigate', '/pending', {root: true});
        } catch (e) {
            dispatch('toast/errors', e, {root: true});
        }
    },

    async forgot({dispatch, commit}, email) {
        await Http.for('user/reset').save({email});

        dispatch('toast/success', `Check your email for a guide to reset your password.`, {root: true});
    },

    async resetByKey({dispatch, commit}, data) {
        await Http.for('user/reset').put({}, data);

        dispatch('toast/success', `We've updated your password, give it a go!`, {root: true});
    }
};
