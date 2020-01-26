import Http from '../services/Http'

export const state = () => ({
  applications: [],
  upcoming: [],
  schedules: [],
  all: [],
  game: {},
  active: null
})

export const mutations = {
  applications(state, applications) {
    state.applications = applications
  },

  all(state, all) {
    state.all = all
  },

  add(state, game) {
    state.all.unshift(game)
  },

  game(state, game) {
    state.game = game
  },

  apply(state, applications) {
    state.applications.push(applications)
  },

  forfeit(state, game) {
    state.applications = state.applications.filter(
      (t) => t.schedule.id !== game.id
    )
  },

  schedules(state, schedules) {
    state.schedules = schedules
  },

  upcoming(state, upcoming) {
    state.upcoming = upcoming
  },

  active(state, game) {
    state.active = game
  },

  updateScheduleObjective(state, { value, objectiveId, scheduleId }) {
    let tmp = null

    const schedules = state.schedules.map((schedule) => {
      if (schedule.id === scheduleId) {
        schedule.objectives[objectiveId].isBonus = value
        tmp = schedule
      }
      return schedule
    })

    if (tmp != null) {
      state.schedules = schedules
    }
  },

  addScheduleObjective(state, { scheduleId, objective }) {
    let objectives = null

    const schedules = state.schedules.map((schedule) => {
      if (schedule.id === scheduleId) {
        schedule.objectives[objective.id] = objective
        objectives = schedule.objectives
      }
      return schedule
    })

    if (objectives != null) {
      state.schedules = schedules
    }
  },

  deleteScheduleObjective(state, { scheduleId, objectiveId }) {
    let objectives = null

    const schedules = state.schedules.map((schedule) => {
      if (schedule.id === scheduleId) {
        delete schedule.objectives[objectiveId]
        objectives = schedule.objectives
      }
      return schedule
    })

    if (objectives != null) {
      state.schedules = schedules
    }
  }
}

export const actions = {
  async all({ commit }) {
    const games = await Http.for('games').get()

    commit('all', games)
  },

  async game({ commit }, { id, players }) {
    const game = await this.$axios.get(`games/${id}?players=${players}`)
    commit('game', game.data)
  },

  async create({ commit }, data) {
    const game = await Http.for('games').save(data)
    commit('add', game)
  },

  async applications({ commit, dispatch, state }) {
    try {
      const applications = await Http.for('applications').get('mine')
      commit('applications', applications)
    } catch (e) {
      if (e.response.status !== 401) {
        dispatch('toast/error', e.response.data, { root: true })
      }
    }
  },

  async schedules({ commit }) {
    try {
      const schedules = await Http.for('schedules').get()
      commit('schedules', schedules)
    } catch (e) {
      commit('schedules', null)
    }
  },

  async active({ commit }) {
    try {
      const [active] = await Http.for('schedules/status/active').get()
      commit('active', active)
    } catch (e) {
      commit('active', null)
    }
  },

  async upcoming({ commit, dispatch }) {
    try {
      const upcoming = await Http.for('schedules/status/scheduled').get()
      commit('upcoming', upcoming)
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async apply({ commit, dispatch }, schedule) {
    try {
      const app = await this.$axios.post(`applications/schedule/${schedule.id}`)
      commit('apply', app.data)

      dispatch('toast/success', 'Thanks for signing up! See ya soon', {
        root: true
      })

      dispatch('navigate', '/game/confirmation', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async forfeit({ commit, dispatch }, schedule) {
    try {
      await this.$axios.delete(`applications/schedule/${schedule.id}`)
      commit('forfeit', schedule)

      dispatch('toast/success', 'Sorry to see you go.', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async sendPatch({ commit, dispatch }, game) {
    try {
      await this.$axios.patch(`/games/${game.id}`, game)

      commit('game', game)

      dispatch('toast/success', 'Game updated!', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  }
}
