<template>
  <div class="Checkbox">
    <input
      :id="labelName"
      type="checkbox"
      v-bind="$attrs"
      @change="(e) => $emit('input', e.target.checked)"
    />
    <label :for="labelName">
      <div class="box">
        <i class="fa fa-check" />
      </div>
      <span v-if="label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: null }
  },

  computed: {
    labelName() {
      return this.label.toLowerCase().replace(/\s/g, '-')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

$checkbox-size: 35px;

.Checkbox {
  position: relative;

  input {
    display: none;

    & + label {
      display: inline-block;
      position: relative;
      padding: 0;
      margin-bottom: 0;
      pointer-events: initial;
      user-select: none;
      cursor: pointer;
    }

    &:hover + label .box {
      background: darken($bg-color-4, 5%);
    }

    &:checked + label {
      .box {
        background: $success-color;
      }

      .fa {
        color: #fff;
      }
    }

    &:disabled + label {
      color: #b8b8b8;
      cursor: auto;
    }

    &:disabled + label .box {
      background: #ddd;
    }

    &:checked + label .fa {
      display: block;
    }
  }

  .box {
    display: inline-block;
    vertical-align: middle;
    width: $checkbox-size;
    height: $checkbox-size;
    background-color: $bg-color-4;
    border-radius: $border-radius;
  }

  .fa {
    display: none;
    position: absolute;
    top: 50%;
    left: $checkbox-size / 2;
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    text-align: center;
    color: $text-color-muted;
  }

  span {
    padding-left: 10px;
    font-size: 14px;
  }

  &.group {
    @extend %form-group;
  }

  &.danger:checked + label .box {
    color: $danger-color;
  }

  &.sm {
    .box {
      width: $checkbox-size * 0.6;
      height: $checkbox-size * 0.6;
    }

    .fa {
      left: ($checkbox-size * 0.6) / 2;
      font-size: $font-size-sm;
    }
  }
}
</style>
