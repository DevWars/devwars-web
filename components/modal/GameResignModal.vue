<template>
    <div>
        <h1>Resign confirmation</h1>
        <p>Are you sure you would like to cancel?</p>

        <div class="modal__actions">
            <Button class="outline muted" @click="close(false)">Cancel</Button>
            <Button class="danger" @click="resign(schedule)">Resign</Button>
        </div>
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
