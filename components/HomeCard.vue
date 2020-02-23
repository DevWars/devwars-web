<template>
  <Card :title="title">
    <div class="content">
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </Card>
</template>

<script>
import Card from './Card';

export default {
  name: 'HomeCard',
  components: { Card },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Card {
  position: relative;
  z-index: 1;
}

.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 266px;
  margin-top: $s-space;
  position: relative;
  font-size: 16px;
  text-align: center;
  font-family: $alt-font-face;

  @include breakpoint(lg) {
    font-size: 14px;
  }

  @include breakpoint(xs) {
    height: auto;
  }
}

.actions /deep/ > div {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;

  @include breakpoint(xs) {
    display: block;
    width: 100%;
    margin-top: $grid-gutter-width;
  }

  .Button {
    align-self: flex-end;

    @include breakpoint(xs) {
      width: 100%;
      display: block;
      margin: $grid-gutter-width 0 0 0;
    }
  }
}
</style>
