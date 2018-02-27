import Http from "../services/Http";

export const state = () => ({
    applied: [],
    upcoming: [],
});

export const mutations = {
    applied(state, applied) {
        state.applied = applied;
    },

    apply(state, applied) {
        state.applied.push(applied);
    },

    forfeit(state, game) {
        state.applied = state.applied.filter(it => it.id !== game.id && it !== game.id)
    },

    upcoming(state, upcoming) {
        state.upcoming = upcoming;
    }
};

export const actions = {
    async applied({commit}) {
        try {
            let applied = await Http.for('game/application').get('mine');

            commit('applied', applied);
        } catch (e) {
        }
    },
    async upcoming({commit}) {
        try {
            let upcoming = await Http.for('game').get('upcoming');

            commit('upcoming', upcoming);
        } catch (e) {
        }
    },

    async apply({commit}, game) {
        await Http.for('game/application').save(game);

        commit('apply', game);
    },

    async forfeit({commit}, game) {
        await Http.for('game/application').delete(game);

        commit('forfeit', game);
    }
};
