<template>
  <Card class="DashboardCard bezeless dark">
    <div v-if="title" class="header">
      <i :class="icon" />
      <h5>{{ title }}</h5>
    </div>

    <div class="content">
      <slot />
    </div>
  </Card>
</template>

<script>
import Card from './Card';

export default {
  name: 'DashboardCard',
  components: { Card },
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.DashboardCard {
  .header {
    background-color: lighten($bg-color-2, 4%);
    padding: $xs-space $grid-gutter-width;
    font-size: 0;

    i,
    h5 {
      @extend %align-middle;
    }

    i {
      padding-right: $xs-space;

      &:before {
        font-size: $p-font-size;
      }
    }

    h5 {
      text-transform: uppercase;
    }
  }

  &.scrollable .content {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
