<template>
    <form class="modal" @submit.prevent="submit">
        <h1>New Schedule</h1>

        <Select v-model="mode" label="Game mode" class="group" required>
            <option value="Classic">
                Classic
            </option>
            <option value="Zen Garden">
                Zen Garden
            </option>
            <option value="Blitz">
                Blitz
            </option>
        </Select>

        <Input v-model="date" label="Date" class="group" required />

        <Input v-model="time" label="Time" class="group" required />

        <ButtonGroup class="modal__actions">
            <!-- <Button type="button" class="muted link" @click.prevent="close(false)">Cancel</Button> -->
            <Button type="submit" class="primary">
                Create Schedule
            </Button>
        </ButtonGroup>
    </form>
</template>

<script>
import moment from 'moment';
import Select from '@/components/form/Select';
import Input from '@/components/form/Input';

export default {
    name: 'CreateGameModal',

    components: { Select, Input },

    props: {
        resolve: {
            type: Function,
            required: true,
        },
    },

    data: () => ({
        mode: 'Classic',
        date: moment
            .utc(new Date())
            .add(2, 'weeks')
            .format('MM/DD/YYYY'),
        time: '17:00',
    }),

    computed: {
        startTime() {
            const timestamp = `${this.date} ${this.time}`;
            return moment.utc(timestamp);
        },
    },

    methods: {
        async submit() {
            const res = await this.$axios.post('/schedules', {
                mode: this.mode,
                startTime: this.startTime,
            });

            this.$router.push({
                path: '/mod/schedule/setup',
                query: { schedule: res.data.id },
            });

            this.close(true);
        },
    },
};
</script>
