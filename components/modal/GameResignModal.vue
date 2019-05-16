<template>
    <div>
        <h1>Resign confirmation</h1>
        <p>Are you sure you would like to cancel?</p>

        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Cancel</button>
            <button class="btn btn-danger" @click="resign(schedule)">Resign</button>
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
