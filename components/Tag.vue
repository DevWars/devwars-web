<template>
  <div class="Tag">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'utils.scss';
$colors: (
  primary: $brand-primary,
  success: #2ecc71,
  warning: #f1c40f,
  danger: #e74c3c,
  info: #3498db,
  muted: $text-color-muted,
  html: $html-color,
  css: $css-color,
  js: $js-color,
);

.Tag {
  display: inline-block;
  border: 1px solid transparent;
  padding: 6px 12px;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;

  & + & {
    margin-left: $xxs-space;
  }

  @each $name, $color in $colors {
    &.#{$name} {
      background-color: $color;
      color: #fff;
    }
  }

  &.outline {
    border-color: #fff;
    background-color: transparent;
    color: #fff;

    @each $name, $color in $colors {
      &.#{$name} {
        border-color: $color;
        color: $color;
      }
    }
  }

  &.sm {
    padding: 3px 6px;
    font-size: $font-size-xs;
  }
}
</style>
