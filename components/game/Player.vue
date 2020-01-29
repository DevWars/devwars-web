<template>
  <nuxt-link
    v-if="user.id !== 0 && navigate"
    class="Player hover"
    :to="`/dashboard/${user.id}`"
  >
    <User :user="user" :class="team.name" />

    <div class="languages">
      <strong v-for="language in languages" :key="language" :class="language">
        {{ language }}
      </strong>
    </div>
  </nuxt-link>
  <div v-else class="Player" @click="$emit('click')">
    <User :user="user" :class="team.name" />

    <div class="languages">
      <strong v-for="language in languages" :key="language" :class="language">
        {{ language }}
      </strong>
    </div>
  </div>
</template>

<script>
import User from '@/components/user/User'

export default {
  name: 'Player',
  components: { User },
  props: {
    user: {
      type: Object,
      required: true
    },
    team: {
      type: Object,
      required: true
    },
    languages: {
      type: Array,
      required: true
    },
    // If navigation should be setup to allow clicking on the player directly to navigate to the
    // players profile page. If true, any action or wrapper placed around the player will not work.
    // Handling custom click events will require this to be false.
    navigate: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.hover:hover {
  background-color: rgba(#000, 0.2);
  cursor: pointer;
}

.Player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $xs-space 0;
  color: inherit;

  .User {
    /deep/ .Avatar {
      border: $border-size solid transparent;
      border-radius: 50%;
    }
    &.blue /deep/ .Avatar {
      border-color: $brand-primary;
    }
    &.red /deep/ .Avatar {
      border-color: $brand-secondary;
    }
  }

  .name {
    padding: 0 $xs-space;
    font-size: $h4-font-size;
  }

  .languages > strong {
    display: inline-block;
    text-transform: uppercase;

    &:not(:first-child) {
      padding-left: 10px;
    }

    &.html {
      color: $html-color;
    }
    &.css {
      color: $css-color;
    }
    &.js,
    &.javascript {
      color: $js-color;
    }
  }
}
</style>
