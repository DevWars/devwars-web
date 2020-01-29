<template>
  <div class="Applications">
    <div v-if="game" class="controls">
      <h4>({{ applications.length }}) Applicants</h4>
      <Button class="outline primary" @click="addRegistrant">
        Add Registrant
      </Button>
    </div>

    <Table>
      <tr slot="head">
        <th>Username</th>
        <th>Games</th>
        <th>Won</th>
        <th>Lost</th>
        <th>HTML</th>
        <th>CSS</th>
        <th>JS</th>
        <th>Devcoins</th>
      </tr>

      <tr
        v-for="(applicant, index) in applications"
        :key="applicant.id + index"
        @click="addPlayer(applicant)"
      >
        <td>
          <User :user="applicant" />
        </td>
        <td>{{ applicant.gameStats.wins + applicant.gameStats.loses }}</td>
        <td>{{ applicant.gameStats.wins }}</td>
        <td>{{ applicant.gameStats.loses }}</td>
        <td>
          {{ applicant.profile.skills ? applicant.profile.skills.html : 0 }}
        </td>
        <td>
          {{ applicant.profile.skills ? applicant.profile.skills.css : 0 }}
        </td>
        <td>
          {{ applicant.profile.skills ? applicant.profile.skills.js : 0 }}
        </td>
        <td>
          <Devcoins :amount="applicant.stats.coins" class="xs" />
        </td>
      </tr>
    </Table>

    <div v-if="applications.length === 0" class="dark plain no-players">
      <p>No players have applied for this game</p>
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash'

import Table from '@/components/Table'
import User from '@/components/user/User'
import Devcoins from '@/components/Devcoins'
import AddPlayerModal from '@/components/modal/AddPlayerModal'
import AddRegistrantModal from '@/components/modal/AddRegistrantModal'
import { getLanguageByGamePlayer } from '@/utils'

export default {
  name: 'Applications',

  components: { Table, User, Devcoins },

  props: {
    schedule: { type: Object, default: undefined },
    game: { type: Object, default: undefined }
  },

  data() {
    return {
      applications: []
    }
  },

  mounted() {
    if (!this.schedule && !this.game) return
    this.loadApplications()
  },

  methods: {
    getLanguageByGamePlayer,

    async loadApplications() {
      const scheduleOrGame = this.schedule
        ? `schedule/${this.schedule.id}?stats=true&profile=true`
        : `game/${this.game.id}?stats=true&profile=true`

      const response = await this.$axios.get(`/applications/${scheduleOrGame}`)
      const applications = response.data

      this.applications = applications
    },

    addPlayer(user) {
      if (isNil(this.game)) return
      this.$open(AddPlayerModal, { user, game: this.game })
    },

    async addRegistrant() {
      await this.$open(AddRegistrantModal, { game: this.game })
      this.loadApplications()
    }
  }
}
</script>

<style lang="scss" scoped>
.Applications {
  .Table tbody td:last-of-type {
    text-align: left;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
}

.no-players {
  text-align: center;
}
</style>
