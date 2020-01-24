<template>
  <div class="ButtonGroup">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'utils.scss';

.ButtonGroup {
  .Button + .Button,
  & > * + & > * {
    margin-left: 10px;

    @include breakpoint(xs) {
      display: block;
      width: 100%;
      margin-left: 0;
      margin-top: $grid-gutter-width;
    }
  }
}
</style>
