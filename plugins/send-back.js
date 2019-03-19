import Vue from 'vue';

Vue.mixin({
    mounted() {
        if (this.$route.query.hasOwnProperty('back')) {
            this.$router.push({ path: window.localStorage.getItem('latestRoute') });
        }
    },
});
