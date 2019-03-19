<template>
    <div>
        <modals-container/>

        <Toasts/>

        <nuxt/>
    </div>
</template>


<script>
import Toasts from '~/components/toast/Toasts';

export default {
    name: 'None',
    components: { Toasts },
};
</script>
