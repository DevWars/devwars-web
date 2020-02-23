<template>
  <div class="AddRegistrantModal modal">
    <h1>Add registrant</h1>
    <form @submit.prevent="addRegistrant">
      <div class="search">
        <i class="fa fa-search"></i>
        <Input
          v-model="username"
          placeholder="Username"
          @input="searchByUsername"
        />

        <div v-show="searchVisible" class="search__list">
          <div
            v-for="user in result.data"
            :key="user.id"
            class="search__item"
            @click="() => userSelected(user.username)"
          >
            <div>
              <User :user="user" size="sm" />
            </div>
          </div>
        </div>
      </div>

      <ButtonGroup class="modal__actions">
        <Button class="muted link" @click="close">
          Cancel
        </Button>
        <Button type="submit" class="primary">
          Add
        </Button>
      </ButtonGroup>
    </form>
  </div>
</template>

<script>
import Input from '../form/Input'
import User from '@/components/user/User'

export default {
  name: 'AddRegistrantModal',

  components: { Input, User },

  props: {
    game: {
      type: Object,
      required: true
    },
    resolve: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    username: '',
    result: { data: [] },
    searchVisible: false
  }),

  methods: {
    userSelected(username) {
      this.username = username
      this.searchVisible = false
    },

    async searchByUsername(username) {
      if (username.trim() === '') return (this.result.data = [])
      this.searchVisible = true

      const url = `/users/lookup?username=${username}`
      this.result = await this.$axios.get(url)
    },

    async addRegistrant() {
      try {
        const url = `/applications/game/${this.game.id}/username/${this.username}`
        await this.$axios.$post(url)
        this.close(true)
      } catch (e) {
        this.$store.dispatch('toast/error', e.response.data)
        this.close(false)
      }
    }
  }
}
</script>

<style lang="scss">
@import 'utils.scss';

.v--modal-box {
  overflow: visible !important;
}

.AddRegistrantModal {
  .result {
    margin-top: 25px;
  }

  .search {
    display: flex;
    align-items: center;
    position: relative;

    .fa {
      margin-right: $grid-gutter-width;
      color: $text-color-secondary;
    }

    &__list {
      @extend %material;
      width: 100%;
      max-height: 250px;
      position: absolute;
      top: calc(100% - 1px);
      z-index: $zindex-popover;
      overflow-y: auto;
    }

    &__item {
      @extend %flex-justify;
      padding: $xxs-space $xs-space;
      background-color: $bg-color-1;
      cursor: pointer;

      &:hover {
        background-color: lighten($bg-color-1, 10%);
        color: #fff;
      }
    }
  }
}
</style>
