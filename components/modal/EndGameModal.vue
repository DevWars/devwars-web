<template>
  <ButtonGroup class="modal__actions">
    <Button
      v-for="team in game.teams"
      :key="team"
      class="link"
      @click="end(team)"
    >
      {{ team.name | capitalize }}
    </Button>
  </ButtonGroup>
</template>

<script>
export default {
  name: 'EndGameModal',
  props: {
    resolve: {
      type: Function,
      required: true
    },
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    async end(team) {
      await this.$axios.post(`/games/${this.game.id}/end`)

      this.close(team)
    }
  }
}
</script>
