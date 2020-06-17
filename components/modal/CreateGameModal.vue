<template>
    <form @submit.prevent="submit">
        <Input
            v-model="theme"
            placeholder="Game title (e.g Battleships)"
            label="Theme"
            class="group"
        />

        <Select v-model="mode" label="Game mode" class="group">
            <option value="Classic">Classic</option>
            <option value="Zen Garden">Zen Garden</option>
            <option value="Blitz">Blitz</option>
        </Select>

        <Select v-model.number="status" label="Game Status" class="group">
            <option value="0">Scheduled</option>
            <option value="1">Active</option>
        </Select>

        <div class="input-container">
            <Input v-model="date" type="date" label="Date" class="group" />
            <Input v-model="time" type="time" label="Time" class="group" />
            <Input
                v-model.number="season"
                type="number"
                label="Season"
                class="group"
            />
        </div>

        <ButtonGroup class="modal__actions">
            <Button type="button" class="muted link" @click="close">
                Cancel
            </Button>
            <Button type="submit" class="primary">Save</Button>
        </ButtonGroup>
    </form>
</template>

<script>
import moment from 'moment';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';

export default {
    name: 'CreateGameModal',

    components: { Select, Input },

    props: {
        resolve: {
            type: Function,
            default: () => {},
        },
        reject: {
            type: Function,
            default: () => {},
        },
    },

    data: () => {
        return {
            theme: '',
            mode: 'Classic',
            time: '',
            date: '',
            season: 3,
            status: 0,
        };
    },

    computed: {
        startTime() {
            const timestamp = `${this.date} ${this.time}`;
            return moment.utc(timestamp);
        },
    },

    beforeMount() {
        const utcTime = moment(new Date()).utc();

        this.date = utcTime.format('YYYY-MM-DD');
        this.time = utcTime.format('HH:mm');
    },

    methods: {
        async submit() {
            const startTime = moment.utc(`${this.date} ${this.time}`);

            const game = await this.$store.dispatch('game/create', {
                season: this.season,
                status: this.status,
                title: this.theme,
                mode: this.mode,
                templates: {},
                startTime,
            });

            this.close(game);
        },
    },
};
</script>
