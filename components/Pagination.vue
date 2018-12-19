<template>
    <div class="Pagination">
        <button class="btn btn-gray btn-sm" :class="{disabled: page <= 1}">Prev</button>
        <strong class="page">PAGE {{ page }}</strong>
        <button class="btn btn-gray btn-sm">Next</button>
    </div>
</template>

<script>
export default {
  props: {
      page: {
          type: Number,
          default: 1
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

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
