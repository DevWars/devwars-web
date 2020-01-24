<template>
  <div class="Select" :class="{ label }">
    <select
      :id="labelName"
      ref="input"
      :class="[{ empty: !valid }, { valid }]"
      v-bind="$attrs"
      @change="
        (e) => [$emit('change', e.target.value), inputChange(e.target.value)]
      "
      @input="(e) => $emit('input', e.target.value)"
    >
      <slot />
    </select>
    <label v-if="label" :for="labelName">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Select',

  props: {
    label: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    valid: ''
  }),

  computed: {
    labelName() {
      return this.label.toLowerCase().replace(/\s/g, '-')
    }
  },

  mounted() {
    this.inputChange(this.$refs.input.value)
  },

  methods: {
    inputChange(value) {
      this.valid = !(value === '' || typeof value === 'undefined')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Select {
  width: 100%;
  position: relative;
  font-family: $alt-font-face;

  select {
    @extend %form-control;
    padding-right: 30px;
    margin-top: 0;
    appearance: none;

    &:focus::-ms-value {
      color: #fff;
    }

    option {
      color: $black-color;
    }
  }

  &:after {
    @extend .fa;
    content: $fa-caret-down;
    color: $text-color-secondary;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &.label {
    @extend %form-label;
  }

  &.group {
    @extend %form-group;
  }

  &.clear {
    border: none;

    select {
      background: transparent;
      font-family: $alt-font-face;
      text-transform: uppercase;
      font-weight: $font-weight-bold;
      outline: none;
      color: #fff;

      option {
        background-color: #fff;
        color: $black-color;
      }
    }
  }
}
</style>
