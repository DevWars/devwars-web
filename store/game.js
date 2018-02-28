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

    async apply({commit, dispatch}, game) {
        await Http.for('game/application').save(game);

        commit('apply', game);

        dispatch('toast/add', {type: 'success', message: `Thanks for signing up! See ya soon`}, {root: true});

        dispatch('navigate', '/game/confirmation', {root: true})
    },

    async forfeit({commit, dispatch}, game) {
        await Http.for('game/application').delete(game);

        commit('forfeit', game);

        dispatch('toast/add', {type: 'success', message: `Sorry to see you go.`}, {root: true});
    }
};
