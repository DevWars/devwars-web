export const state = () => ({
    applications: [],
    upcoming: [],
    all: [],
    game: {},
    active: null,
});

export const mutations = {
    applications(state, applications) {
        state.applications = applications;
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

    apply(state, applications) {
        state.applications.push(applications);
    },
    forfeit(state, game) {
        state.applications = state.applications.filter(
            (t) => t.schedule.id !== game.id,
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
        const { data: games } = await this.$api.games.gamesWithPaging({
            first: 10,
        });

        commit('all', games);
    },

    async game({ commit }, { id, players }) {
        const game = await this.$api.games.getGame(id);
        let gamePlayers = {};

        if (players) {
            gamePlayers = await this.$api.games.getAllAssignedPlayersToGame(id);
        }

        commit('game', { game, players: gamePlayers });
    },

    async create({ commit, dispatch }, data) {
        try {
            const game = await this.$api.games.createGame(data);
            commit('add', game);

            return game;
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async applications({ commit, dispatch, rootState }) {
        try {
            if (rootState.user == null || rootState.user.user == null) {
                return;
            }

            const applications = await this.$api.users.getUserGameApplications(
                rootState.user.user.id,
            );

            commit('applications', applications);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async active({ commit }) {
        const games = await this.$api.games.gamesWithPaging({
            first: 1,
            status: 'active',
        });

        const [data] = games.data;

        commit('active', data);
    },

    async upcoming({ commit, dispatch }) {
        try {
            const { data } = await this.$api.games.gamesWithPaging({
                first: 10,
                status: 'scheduled',
            });

            commit('upcoming', data);
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async apply({ commit, dispatch }, { game, user }) {
        try {
            const app = await this.$api.games.applyToGameAsPlayer(game, user);
            commit('apply', app.data);

            dispatch('toast/success', 'Thanks for signing up! See ya soon', {
                root: true,
            });

            dispatch('navigate', '/game/confirmation', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async forfeit({ commit, dispatch }, { game, user }) {
        try {
            await this.$api.games.removeUserApplicationForGame(game, user);
            dispatch('toast/success', 'Sorry to see you go.', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async sendPatch({ commit, dispatch }, game) {
        try {
            await this.$api.games.updateGame(game.id, game);
            commit('game', game);

            dispatch('toast/success', 'Game updated!', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },
};

export const getters = {
    /**
     * returns a given game by id if found in the current games cache.
     * @param id {string} the id of the given game.
     */
    gameById: (state) => (id) =>
        Array(state.game).find((game) => game.id === Number(id)),

    /**
     * returns a given schedule by id if found in the current cache.
     * @param id {string} the id of the given schedule.
     */
    scheduleById: (state) => (id) =>
        find(state.schedules, (schedule) => schedule.id === Number(id)),
};
