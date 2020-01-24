<template>
  <div class="DevwarsCard">
    <h1 v-if="title" class="title">
      {{ title }}
    </h1>
    <p v-if="desc" class="desc">
      {{ desc }}
    </p>

    <div class="main">
      <slot />
    </div>

    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevwarsCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.DevwarsCard {
  max-width: 400px;
  border-width: $border-size;
  border-style: solid;
  border-image: linear-gradient(
      110deg,
      $brand-primary 0%,
      $brand-primary 47%,
      $bg-color-4 47%,
      $bg-color-4 53%,
      $brand-secondary 53%,
      $brand-secondary 100%
    )
    1;
  padding: $m-space $ms-space $ms-space;
  margin: 0 auto;
  text-align: center;

  .title {
    margin-bottom: $m-space;
    font-size: $h2-font-size;
  }

  .desc {
    margin-top: -30px;
    margin-bottom: $m-space;
    color: $text-color-secondary;
  }

  .main {
    padding-top: $grid-gutter-width;
  }

  .actions {
    margin-top: $m-space;
  }
}
</style>
