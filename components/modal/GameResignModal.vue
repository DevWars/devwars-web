<template>
    <div>
        <h1>Resign confirmation</h1>
        <p>Are you sure you would like to cancel?</p>

        <ButtonGroup class="modal__actions">
            <Button class="outline muted" @click="close">Cancel</Button>
            <Button class="danger" @click="resign(schedule)">Resign</Button>
        </ButtonGroup>
    </div>
</template>

<script>
export default {
    name: 'GameResignModal',

    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },

    methods: {
        async resign(schedule) {
            await this.$store.dispatch('game/forfeit', schedule);

            this.close(true);
        },
    },
};
</script>
