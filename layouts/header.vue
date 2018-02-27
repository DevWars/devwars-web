<template>
   <div>
     <DevWarsHeader/>

     <nuxt/>
   </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Header from '~/components/layout/Header';

    @Component({
      components: {DevWarsHeader: Header}
    })
    export default class HeaderLayout extends Vue {
    }
</script>
