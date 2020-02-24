<template>
    <form @submit.prevent="submit">
        <Select v-model="name" label="Select Game Type" class="group">
            <option>Classic</option>
            <option>Zen Garden</option>
            <option>Blitz</option>
        </Select>

        <!-- <DatePicker v-model="date" label="When is the game?" class="group"/> -->

        <ButtonGroup class="modal__actions">
            <Button type="button" class="muted link" @click="close">
                Cancel
            </Button>
            <Button type="submit" class="primary">
                Save
            </Button>
        </ButtonGroup>
    </form>
</template>

<script>
import moment from 'moment';
import Select from '@/components/form/Select';

export default {
    name: 'CreateGameModal',

    components: { Select },

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
