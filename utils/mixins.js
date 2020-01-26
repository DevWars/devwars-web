import * as _ from 'lodash'

export const teams = {
  computed: {
    teams() {
      if (_.isNil(this.game.teams)) {
        return
      }

      return Object.values(this.game.teams).reduce((teams, team) => {
        const players = {}

        _.forEach(this.game.players, (player, key) => {
          if (player.team === team.id) players[key] = player
          player.originalId = Number(key)
        })

        teams[team.id] = {
          ...team,
          players,
          scores: { total: 0, objectives: 0 },
          winner: false,
          size: _.size(players)
        }

        if (this.game.meta && this.game.meta.teamScores) {
          const t = teams[team.id]

          t.scores.total = Math.floor(Math.random() * 10)
          t.scores.objectives = this.game.meta.teamScores[team.id].objectives
          t.winner = this.game.meta.winningTeam === team.id
        }

        return teams
      }, {})
    }
  }
}

export const usersFromGame = {
  data: () => ({
    users: {}
  }),

  watch: {
    game() {
      this.getUsersFromGame()
    }
  },

  async mounted() {
    await this.getUsersFromGame()
  },
  methods: {
    playersWithUser(players) {
      const result = []

      for (const player of Object.values(players)) {
        const user = this.users[player.originalId]
        if (!_.isNil(user)) result.push({ ...user, ...player })
      }

      return result
    },

    async getUsersFromGame() {
      this.users = (this.includePlayers ? this.game.players : this.users) || []

      if (Object.keys(this.users).length >= 1) return

      const standardPlayers = _.filter(this.users, (value, key) => {
        return value.id !== 0
      })

      const competitorPlayers = _.filter(this.users, (value, key) => {
        return value.id === 0
      })

      const fetchUser = async (id) => {
        const res = await this.$axios.get(`/users/${id}`)
        return Object.assign({ originalId: id }, res.data)
      }

      const standardUsers = await Promise.all(
        standardPlayers.map((player) => fetchUser(player.id))
      )

      this.users = standardUsers
        .concat(competitorPlayers)
        .reduce((acc, user) => {
          acc[user.originalId] = user
          return acc
        }, {})
    }
  }
}
