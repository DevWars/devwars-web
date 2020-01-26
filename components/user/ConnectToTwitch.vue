<template>
  <div class="ConnectToTwitch">
    <ButtonIcon
      v-if="!hasTwitch"
      :href="twitchUrl"
      icon="fab fa-twitch"
      class="twitch"
    >
      Connect Twitch
    </ButtonIcon>
    <ButtonIcon
      v-else
      class="outline danger"
      icon="fab fa-twitch"
      @click="removeProvider('twitch')"
    >
      Disconnect Twitch
    </ButtonIcon>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import userHasProvider from '../../utils/linkedAccounts'

export default {
  name: 'ConnectToTwitch',

  data: () => {
    return {
      twitchUrl: `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.twitchClient}&redirect_uri=${process.env.apiUrl}/oauth/twitch&response_type=code`
    }
  },

  computed: {
    user() {
      return this.$store.state.user.user
    },

    links() {
      return this.$store.state.user.linkedAccounts
    },

    hasTwitch() {
      return userHasProvider(this.links, 'twitch')
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    ...mapActions('user', {
      removeProvider: 'disconnectLinkedAccount',
      refresh: 'linkedAccounts'
    })
  }
}
</script>

<style lang="scss" scoped>
.twitch {
  width: 200px;
}
</style>
