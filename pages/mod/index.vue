<template>
  <h1>mod dashboard home</h1>
</template>

<script>
import { names } from '../../utils/auth'

export default {
  meta: {
    auth: names.MODERATOR
  }
}
</script>
