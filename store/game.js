import Http from '../services/Http';

export const state = () => ({
    applications: [],
    upcoming: [],
    schedules: [],
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
        state.applications = state.applications.filter((it) => it.id !== game.id && it !== game.id);
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

    updateScheduleObjective(state, { value, objectiveId, scheduleId }) {
        let tmp = null;

        const schedules = state.schedules.map((schedule) => {
            if (schedule.id === scheduleId) {
                schedule.objectives[objectiveId].isBonus = value;
                tmp = schedule;
            }
            return schedule;
        });

        if (tmp != null) state.schedules = schedules;
    },

    addScheduleObjective(state, { scheduleId, objective }) {
        let objectives = null;

        const schedules = state.schedules.map((schedule) => {
            if (schedule.id === scheduleId) {
                schedule.objectives[objective.id] = objective;
                objectives = schedule.objectives;
            }
            return schedule;
        });

        if (objectives != null) state.schedules = schedules;
    },

    deleteScheduleObjective(state, { scheduleId, objectiveId }) {
        let objectives = null;

        const schedules = state.schedules.map((schedule) => {
            if (schedule.id === scheduleId) {
                delete schedule.objectives[objectiveId];
                objectives = schedule.objectives;
            }
            return schedule;
        });

        if (objectives != null) state.schedules = schedules;
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

    async applications({ commit }) {
        try {
            const applications = await Http.for('applications').get('mine');
            commit('applications', applications);
        } catch (e) {
            console.log("Couldn't load applications games", e);
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

    async apply({ commit, dispatch }, schedule) {
        try {
            await this.$axios.post(`applications/schedule/${schedule.id}`);

            commit('apply', schedule);

            await dispatch(
                'toast/add',
                { type: 'success', message: `Thanks for signing up! See ya soon` },
                { root: true }
            );
            await dispatch('navigate', '/game/confirmation', { root: true });
        } catch (e) {
            dispatch('toast/errors', e, { root: true });
        }
    },

    async forfeit({ commit, dispatch }, schedule) {
        try {
            await this.$axios.delete(`applications/schedule/${schedule.id}`);

            commit('forfeit', schedule);

            dispatch('toast/add', { type: 'success', message: `Sorry to see you go.` }, { root: true });
        } catch (e) {
            dispatch('toast/errors', e, { root: true });
        }
    },

    async sendPatch({ commit, dispatch }, game) {
        try {
            await this.$axios.patch(`/games/${game.id}`, game);

            commit('game', game);

            dispatch('toast/add', { type: 'success', message: 'Game updated' }, { root: true });
        } catch (e) {
            console.log('e', e);
            dispatch('toast/errors', e, { root: true });
        }
    },
};
