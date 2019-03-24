<template>
    <div>
        <modals-container/>

        <Toasts/>

        <DevWarsHeader/>

        <nuxt/>

        <DevWarsFooter/>
    </div>
</template>


<script>
import Header from '~/components/layout/Header';
import Toasts from '~/components/toast/Toasts';

export default {
    name: 'Default',
    components: { 
        DevWarsHeader: Header, 
        DevWarsFooter: () => import('~/components/layout/Footer'), 
        Toasts },
};
</script>
