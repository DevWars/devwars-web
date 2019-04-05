<template>
    <form v-async-submit="[submit]">
        <div class="form-group">
            <select v-model="name" class="form-control">
                <option value>Select Game Type</option>
                <option>Classic</option>
                <option>Zen Garden</option>
                <option>Blitz</option>
            </select>
        </div>
        <div class="form-group">
            <!-- <DatePicker v-model="date"/> -->

            <label>When is the game?</label>
        </div>
        <div class="align-right">
            <button type="button" class="btn btn-outline-gray" @click="close(false)">Cancel</button>
            <button class="btn btn-primary">Save</button>
        </div>
    </form>
</template>


<script>
import moment from 'moment';

export default {
    name: 'CreateGameModal',
    props: {
        resolve: {
            type: Function,
            required: true,
        },
    },
    data: () => {
        return {
            name: '',
            date: '',
        };
    },
    methods: {
        async submit() {
            const timestamp =
                moment.utc(this.date, 'MM/DD/YYYY HH:mm').unix() * 1000;

            await this.$store.dispatch('game/create', {
                name: this.name,
                timestamp,
            });

            this.close(true);
        },
    },
};
</script>
