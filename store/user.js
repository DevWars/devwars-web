import Http from '../services/Http'

export const state = () => ({
  user: null,
  profile: null,
  stats: null,
  emailPermissions: {},
  count: 0,
  activities: [],
  linkedAccounts: []
})

export const getters = {
  userCount(state) {
    return state.count
  },

  isCompetitor({ profile, linkedAccounts }) {
    if (!profile) {
      return false
    }

    const { firstName, lastName, country, skills } = profile
    if ((!firstName, !lastName, !country, !skills)) {
      return false
    }

    if (linkedAccounts.length <= 0) {
      return false
    }

    const discordAccount = linkedAccounts.find(
      (account) => account.provider === 'DISCORD'
    )
    if (!discordAccount) {
      return false
    }

    return true
  },

  getDiscord({ linkedAccounts }) {
    return linkedAccounts.find((account) => account.provider === 'DISCORD')
  }
}

export const mutations = {
  user(state, user) {
    state.user = user
  },

  profile(state, profile) {
    state.profile = profile
  },

  activities(state, activities) {
    state.activities = activities
  },

  profileUpdate(state, { key, values }) {
    state.profile[key] = values
  },

  stats(state, stats) {
    state.stats = stats
  },

  count(state, count) {
    state.count = count
  },

  linkedAccounts(state, accounts) {
    state.linkedAccounts = accounts
  },

  removeLinkedAccount(state, provider) {
    state.linkedAccounts = state.linkedAccounts.filter(
      (it) => it.provider !== provider
    )
  },

  emailPermissions(state, permissions) {
    state.emailPermissions = permissions
  },

  emailPermissionsUpdate(state, { key, values }) {
    state.emailPermissions[key] = values
  }
}

export const actions = {
  async refresh({ commit, dispatch }) {
    try {
      const user = await Http.for('auth/user').get()

      commit('user', user)

      await dispatch('profile')
      await dispatch('stats')
      await dispatch('linkedAccounts')
      await dispatch('activities')
    } catch (e) {
      commit('user', null)
    }
  },

  async activities({ commit, dispatch }) {
    try {
      const activities = await Http.for('activities/mine').get()

      commit('activities', activities)
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
      commit('user', null)
    }
  },

  async profile({ commit, state, dispatch }) {
    try {
      const profile = await Http.for(`/users/${state.user.id}/profile`).get()
      commit('profile', profile)
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
      commit('user', null)
    }
  },

  async stats({ commit, state, dispatch }) {
    try {
      const stats = await Http.for(`/users/${state.user.id}/stats`).get()

      commit('stats', stats)
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
      commit('user', null)
    }
  },

  async refreshUserCount({ commit }) {
    const data = await Http.for('leaderboards').get('users')

    commit('count', data.count)
  },

  async login({ commit, dispatch }, { username, password }) {
    try {
      await Http.for('auth').post('login', {
        identifier: username,
        password
      })

      await dispatch('refresh')

      dispatch(
        'toast/add',
        { type: 'success', message: 'Welcome back to DevWars!' },
        { root: true }
      )

      await dispatch('nuxtServerInit', null, { root: true })

      dispatch('navigate', '/dashboard', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
      commit('user', null)
    }
  },

  async register({ dispatch }, registration) {
    try {
      await this.$axios.post('/auth/register', registration)

      await dispatch('refresh')

      dispatch(
        'toast/add',
        { type: 'success', message: 'Welcome to DevWars!' },
        { root: true }
      )

      await dispatch('nuxtServerInit', null, { root: true })

      dispatch('navigate', '/dashboard', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async logout({ commit, dispatch }) {
    await Http.for('auth').post('logout')

    await dispatch('navigate', '/', { root: true })

    commit('user', null)
  },

  async settings({ commit, dispatch, state }) {
    try {
      const profile = await this.$axios.patch(
        `users/${state.user.id}/profile`,
        state.profile
      )
      commit('profile', profile.data)
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async password({ dispatch }, data) {
    try {
      await Http.for(`auth/reset/password`).put(data)

      dispatch('toast/success', `We've updated your password!`, {
        root: true
      })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async email({ dispatch, commit }, data) {
    try {
      const user = await Http.for('auth/reset/email').post('email', data)

      commit('user', user)

      await dispatch(
        'toast/success',
        `We've updated your email, please go verify your email.`,
        { root: true }
      )
      await dispatch('navigate', '/pending', { root: true })
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })
    }
  },

  async getEmailPermissions({ dispatch, commit, state }) {
    try {
      const userPermission = await Http.for(
        `/users/${state.user.id}/emails`
      ).get('permissions')
      commit('emailPermissions', userPermission)
    } catch (e) {
      dispatch('toast/error', e.response ? e.response.data : e, { root: true })
      commit('emailPermissions', null)
    }
  },

  async updateEmailPermissions({ dispatch, commit, state }) {
    try {
      const permissions = state.emailPermissions

      const response = await this.$axios.patch(
        `users/${state.user.id}/emails/permissions`,
        permissions
      )
      commit('emailPermissions', response.data)
    } catch (e) {
      dispatch('toast/error', e.response ? e.response.data : e, { root: true })
      commit('emailPermissions', null)
    }
  },

  async forgot({ dispatch }, email) {
    try {
      await Http.for('auth/forgot/password').save({ username_or_email: email })

      dispatch(
        'toast/success',
        `Check your email for a guide to reset your password.`,
        { root: true }
      )

      return true
    } catch (e) {
      dispatch('toast/error', e.response.data, { root: true })

      return false
    }
  },

  async resetByToken({ dispatch }, data) {
    await Http.for('auth/reset/password').post({}, data)

    dispatch('toast/success', `We've updated your password, give it a go!`, {
      root: true
    })
  },

  async avatar({ dispatch, state }, data) {
    const formData = new FormData()
    formData.append('avatar', data, 'avatar.jpg')

    await Http.axios({
      url: `/users/${state.user.id}/avatar`,
      method: 'PUT',
      data: formData,
      noTransform: true
    })

    await dispatch('refresh')
  },

  async linkedAccounts({ state, commit }) {
    const response = await this.$axios.get(
      `/users/${state.user.id}/connections`
    )
    commit('linkedAccounts', response.data)
  },

  async connectLinkedAccount({ dispatch, commit }, provider) {
    await this.$axios.get(`/oauth/${provider}`)

    commit('connectLinkedAccount', provider)

    await dispatch('refresh')
  },

  async disconnectLinkedAccount({ dispatch, commit }, provider) {
    await this.$axios.delete(`/oauth/${provider}`)

    commit('removeLinkedAccount', provider)

    await dispatch('refresh')
  }
}
