import Http from '../services/Http';

export const state = () => ({
    applied: [],
    entered: [],
    upcoming: [],
    schedules: [],
    all: [],
    game: {},
    active: null,
});

export const mutations = {
    applied(state, applied) {
        state.applied = applied;
    },

    entered(state, entered) {
        state.entered = entered;
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
        state.applied = state.applied.filter(
            (it) => it.id !== game.id && it !== game.id
        );
    },

    schedules(state, schedules) {
        state.schedules = schedules;
    },

    upcoming(state, upcoming) {
        state.upcoming = upcoming;
    },

    active(state, game) {
        state.active = game;
    },
};

export const actions = {
    async all({ commit }) {
        const games = await Http.for('games').get();

        commit('all', games);
    },

    async game({ commit }, id) {
        const game = await Http.for(`games/${id}`).get();

        commit('game', game);
    },

    async create({ commit }, data) {
        const game = await Http.for('games').save(data);
        commit('add', game);
    },

    async applied({ commit }) {
        try {
            const applied = await Http.for('applications').get('mine');
            commit('applied', applied || []);
        } catch (e) {
            console.log("Couldn't load applied games", e);
        }
    },

    async entered({ commit }) {
        try {
            const entered = await Http.for('applications/entered').get('mine');
            commit('entered', entered || []);
        } catch (e) {
            console.log("Couldn't load entered games", e);
        }
    },

    async schedules({ commit }) {
        try {
            const schedules = await Http.for('schedules').get();
            commit('schedules', schedules);
        } catch (e) {
            commit('schedules', null);
        }
    },

    async active({ commit }) {
        try {
            const [active] = await Http.for('schedules/status/active').get();
            commit('active', active);
        } catch (e) {
            commit('active', null);
        }
    },

    async upcoming({ commit }) {
        try {
            const upcoming = await Http.for('schedules/status/scheduled').get();
            commit('upcoming', upcoming);
        } catch (e) {
            console.log(e);
        }
    },

    async apply({ commit, dispatch }, game) {
        await Http.for(`applications/${game.id}`).save();
        commit('apply', game);

        dispatch(
            'toast/add',
            { type: 'success', message: `Thanks for signing up! See ya soon` },
            { root: true }
        );
        dispatch('navigate', '/game/confirmation', { root: true });
    },

    async forfeit({ commit, dispatch }, game) {
        await Http.for('applications').delete(game);

        commit('forfeit', game);

        dispatch(
            'toast/add',
            { type: 'success', message: `Sorry to see you go.` },
            { root: true }
        );
    },
};
