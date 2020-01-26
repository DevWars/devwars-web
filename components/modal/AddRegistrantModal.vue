<template>
  <form @submit.prevent="addRegistrant">
    <div class="search">
      <Input
        v-model="username"
        placeholder="Username"
        @input="searchByUsername"
      />
    </div>

    <ButtonGroup class="modal__actions">
      <Button class="muted link" @click="close">
        Cancel
      </Button>
      <Button type="submit" class="primary">
        Add
      </Button>
    </ButtonGroup>

    <Table class="result">
      <tr slot="head">
        <th>Username</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="user in result.data" :key="user.id">
        <td>{{ user.username }}</td>
        <td>
          <Button class="link" @click="() => userSelected(user.username)">
            Select
          </Button>
        </td>
      </tr>

      <tr v-if="result.data.length === 0">
        <td />
      </tr>
    </Table>
  </form>
</template>

<script>
import Input from '../form/Input'
import Table from '@/components/Table'

export default {
  name: 'AddRegistrantModal',
  components: { Input, Table },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      username: '',
      usernameOld: '',
      result: { data: [] },
      searchDirty: true,
      searchTimeout: null
    }
  },
  methods: {
    async userSelected(username) {
      this.username = username
      await this.addRegistrant()
    },

    async searchByUsername(username) {
      if (username.trim() === '') return (this.result.data = [])

      const url = `/users/lookup?username=${username}`
      this.result = await this.$axios.get(url)
    },

    async addRegistrant() {
      try {
        const url = `/applications/game/${this.game.id}/username/${this.username}`
        await this.$axios.$post(url)
      } finally {
        this.close(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.result {
  margin-top: 25px;
}

.search {
  position: relative;

  &__list {
    @extend %material;
    width: 100%;
    max-height: 150px;
    border: 1px solid $divider-color;
    position: absolute;
    top: calc(100% - 1px);
    z-index: $zindex-popover;
    overflow-y: auto;
  }

  &__item {
    padding: $xxs-space $xs-space;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      background-color: $link-color;
      color: #fff;
    }
  }
}
</style>
