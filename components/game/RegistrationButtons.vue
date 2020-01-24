<template>
  <div class="RegistrationButtons">
    <ButtonGroup>
      <Button
        v-if="!isApplied(schedule)"
        class="primary"
        @click="enter(schedule)"
      >
        Register
      </Button>
      <Button v-else class="outline danger" @click="cancel(schedule)">
        Resign
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GameResignModal from '@/components/modal/GameResignModal'
import GameRegistration from '@/components/modal/GameRegistration'

export default {
  name: 'RegistrationButtons',

  props: {
    schedule: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      user: 'user'
    }),

    applications() {
      return this.$store.state.game.applications
    }
  },

  methods: {
    async enter(schedule) {
      if (!this.user) {
        this.$router.push('/login')
        return
      }

      await this.$open(GameRegistration, { schedule })
    },

    async cancel(schedule) {
      if (!this.user) {
        this.$router.push('/login')
        return
      }

      await this.$open(GameResignModal, { schedule })
    },

    isApplied(schedule) {
      return this.applications.some((application) => {
        return application.schedule && application.schedule.id === schedule.id
      })
    }
  }
}
</script>
