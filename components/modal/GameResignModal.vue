<template>
    <div>
        <h1>Resign confirmation</h1>
        <p>Are you sure you would like to cancel?</p>

        <ButtonGroup class="modal__actions">
            <Button class="outline muted" @click="close">Cancel</Button>
            <Button class="danger" @click="resign(game, user)">Resign</Button>
        </ButtonGroup>
    </div>
</template>

<script>
export default {
    name: 'GameResignModal',

    props: {
        game: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },

    methods: {
        async resign(game, user) {
            await this.$store.dispatch('game/forfeit', {
                game: game.id,
                user: user.id,
            });

            this.close(true);
        },
    },
};
</script>
