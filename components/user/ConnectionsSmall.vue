<template>
  <div>
    <span
      v-for="connection in connections"
      :key="connection.provider"
      class="connection"
    >
      <i
        :title="connection.username"
        :class="`fab fa-${connection.provider.toLowerCase()}`"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    connections: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  }
}
</script>

<style lang="scss" scoped>
.connection {
  padding: 5px;
}
</style>
