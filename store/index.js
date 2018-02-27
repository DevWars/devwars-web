import Http from "../services/Http";

export const state = () => ({
});

export const mutations = {

};

export const actions = {
    async nuxtServerInit({commit, dispatch}) {
        await dispatch('user/refresh');
        await dispatch('user/refreshUserCount');
        await dispatch('game/applied');
        await dispatch('game/upcoming');
        await dispatch('badges/refresh');
    },

    async navigate({commit}, route) {
        this.app.router.push(route);
    }
};
