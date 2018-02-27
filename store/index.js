import Http from "../services/Http";

export const state = () => ({
});

export const mutations = {

};

export const actions = {
    async nuxtServerInit({commit, dispatch}) {
        await dispatch('user/refresh');
    },

    async navigate({commit}, route) {
        this.app.router.push(route);
    }
};
