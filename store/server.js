import Http from '../services/Http'

export const state = () => ({
  server: {}
})

export const getters = {
  version(state) {
    return state.server.version
  },
  status(state) {
    return state.server.status
  }
}

export const mutations = {
  badges(state, server) {
    state.server = server
  }
}

export const actions = {
  async health({ commit }) {
    const server = await Http.for('health').get()
    commit('badges', server)
  }
}
