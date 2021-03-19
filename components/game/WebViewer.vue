<template>
    <iframe class="WebViewer" :src="html"></iframe>
</template>

<script>
export default {
    name: 'WebViewer',

    props: {
        game: { type: Object, required: true },
        teamId: { type: Number, required: true },
    },

    computed: {
        html() {
            if (this.game.season === 4) {
                return `${process.env.apiUrl}/games/new/${this.game.id}/source/${this.teamId + 1}/index.html`
            }

            return `${process.env.apiUrl}/games/${this.game.id}/source/${this.teamId}/index.html`;
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
