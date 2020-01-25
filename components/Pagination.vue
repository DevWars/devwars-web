<template>
  <div class="Pagination">
    <Button
      class="muted sm"
      :class="{ disabled: !canPrevious }"
      @click="$emit('previous')"
      >Prev</Button
    >
    <strong class="page">PAGE {{ page + 1 }}</strong>
    <Button
      class="muted sm"
      :class="{ disabled: !canNext }"
      @click="$emit('next')"
      >Next</Button
    >
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    page: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 0
    },
    canNext: {
      type: Boolean,
      default: false
    },
    canPrevious: {
      type: Boolean,
      default: false
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;

  .page {
    padding: 0 30px;
  }
}
</style>
