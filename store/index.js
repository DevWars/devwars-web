export const state = () => ({});

export const mutations = {};

export const actions = {
    async nuxtServerInit({commit, dispatch}) {
        await Promise.all([
            dispatch('user/refreshUserCount'),
            dispatch('user/refresh'),
            dispatch('game/applied'),
            dispatch('game/entered'),
            dispatch('game/upcoming'),
            dispatch('game/active'),
            dispatch('badges/refresh'),
        ]);
    },

    async navigate({commit}, route) {
        this.app.router.push(route);
    }
};

export const strict = false;
