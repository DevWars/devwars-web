export const state = () => ({});

export const mutations = {};

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await Promise.all([
            // dispatch('user/refreshUserCount'),
            dispatch('user/refresh'),
            // dispatch('game/applied'),
            // dispatch('game/entered'),
            dispatch('game/schedules'),
            dispatch('game/upcoming'),
            dispatch('game/active'),
            // dispatch('badges/refresh'),
        ]);
    },

    async navigate(_, route) {
        this.app.router.push(route);
    },
};

export const strict = false;
