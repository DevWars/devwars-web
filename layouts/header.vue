<template>
  <div>
    <modals-container />
    <Toasts />

    <DevWarsHeader />

    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/layout/Header';
import Toasts from '@/components/toast/Toasts';

export default {
  name: 'HeaderLayout',
  components: { DevWarsHeader: Header, Toasts },
};
</script>
