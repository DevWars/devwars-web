<template>
    <iframe class="WebViewer" :src="html"></iframe>
</template>

<script>
export default {
    name: 'WebViewer',

    props: {
        gameId: { type: Number, required: true },
        teamId: { type: Number, required: true },
    },

    computed: {
        html() {
            return `${process.env.apiUrl}/games/${this.gameId}/source/${this.teamId}/index.html`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.WebViewer {
    flex: 1;
    overflow: hidden;
    border: none;
}
</style>
