export const state = () => ({});

export const mutations = {};

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await Promise.all([
            await dispatch('server/health'),
            await dispatch('user/refresh'),

            await dispatch('game/upcoming'),
            await dispatch('game/active'),

            // Needs to only dispatch when User is logged in
            await dispatch('game/applications'),
        ]);
    },

    navigate(_, route) {
        this.app.router.push(route);
    },
};

// export const strict = process.env.NODE_ENV = "development";
export const strict = false;
