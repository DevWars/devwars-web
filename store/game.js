import { find, isNil } from 'lodash';

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

    /**
     * Updates the schedules templates by language with the updated template
     * value. e.g updating the given schedules html template.
     */
    updateScheduleTemplate(state, { language, template, scheduleId }) {
        const schedule = getters.scheduleById(scheduleId);

        if (isNil(schedule)) return;
        if (isNil(schedule.templates)) schedule.templates = {};

        schedule.templates[language] = template;
    },

    /**
     *  Updates the is bonus state for the current game objective.
     */
    updateObjectIsBonusState(state, { objectiveId, isBonus }) {
        if (state.game != null && state.game.objectives[objectiveId] != null) {
            state.game.objectives[objectiveId].isBonus = isBonus;
        }
    },

    updateScheduleObjective(state, { value, objectiveId, scheduleId }) {
        const schedule = getters.scheduleById(scheduleId);
        schedule.objectives[objectiveId].isBonus = value;
    },

    addScheduleObjective(state, { scheduleId, objective }) {
        const schedule = find(state.schedules, (o) => o.id === scheduleId);
        schedule.objectives[objective.id] = objective;

        state.schedules = state.schedules.slice(0, state.schedules.length);
    },

    deleteScheduleObjective(state, { scheduleId, objectiveId }) {
        const schedule = getters.scheduleById(scheduleId);
        delete schedule.objectives[objectiveId];

        state.schedules = state.schedules.slice(0, state.schedules.length);
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

    async create({ commit }, data) {
        const game = await this.$api.games.createGame(data);
        commit('add', game);
    },

    async applications({ commit, dispatch, state }) {
        try {
            const applications = await this.$api.users.getUserGameApplications(
                this.$store.user.user.id,
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

    async apply({ commit, dispatch }, { id }) {
        try {
            const app = await this.$api.games.applyToGameAsPlayer(
                id,
                this.$store.user.user.id,
            );

            commit('apply', app.data);

            dispatch('toast/success', 'Thanks for signing up! See ya soon', {
                root: true,
            });

            dispatch('navigate', '/game/confirmation', { root: true });
        } catch (e) {
            dispatch('toast/error', e, { root: true });
        }
    },

    async forfeit({ commit, dispatch }, { id }) {
        try {
            await this.$api.games.removeUserApplicationForGame(
                id,
                this.$store.user.user.id,
            );

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
