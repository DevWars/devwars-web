import Vue from 'vue';

Vue.mixin({
  mounted() {
    if (Object.prototype.hasOwnProperty.call(this.$route.query, 'back')) {
      this.$router.push({ path: window.localStorage.getItem('latestRoute') });
    }
  },
});
