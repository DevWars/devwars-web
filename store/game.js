import Http from "../services/Http";

export const state = () => ({
    applied: [],
    upcoming: [],
    all: [],
    game: {},
    active: null,
});

export const mutations = {
    applied(state, applied) {
        state.applied = applied;
    },

    all(state, all) {
        state.all = all;
    },

    add(state, game) {
        state.all.unshift(game);
    },

    game(state, game) {
        state.game = game;
    },

    apply(state, applied) {
        state.applied.push(applied);
    },

    forfeit(state, game) {
        state.applied = state.applied.filter(it => it.id !== game.id && it !== game.id)
    },

    upcoming(state, upcoming) {
        state.upcoming = upcoming;
    },

    active(state, game) {
        state.active = game;
    }
};

export const actions = {
    async all({commit}) {
        let games = await Http.for('game').get();

        commit('all', games);
    },

    async game({commit}, id) {
        let game = await Http.for(`game/${id}`).get();

        commit('game', game);
    },

    async create({dispatch, commit}, data) {
        let game = await Http.for('game').save(data);

        commit('add', game);
    },

    async applied({commit}) {
        try {
            let applied = await Http.for('game/application').get('mine');

            commit('applied', applied || []);
        } catch (e) {
        }
    },

    async active({commit}) {
        try {
            let active = await Http.for('game/status/active').get();

            commit('active', active);
        } catch (e) {
            commit('active', null)
        }
    },

    async upcoming({commit}) {
        try {
            let upcoming = await Http.for('game/status/scheduling').get();
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
