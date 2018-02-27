<template>
    <div class="user-avatar-wrapper">
        <div class="user-avatar" :style="style"></div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        props: ['user']
    })
    export default class Avatar extends Vue {

        get style() {
           return {
               backgroundImage: `url(${this.user.avatar_url || require('~/assets/img/default-avatar.png')})`
           }
        }
    }
</script>
