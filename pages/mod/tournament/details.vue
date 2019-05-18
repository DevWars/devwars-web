<template>
    <Card class="plain dark">
        <form>
            <h3>Main</h3>
            <Input v-model="tournament.name" label="Tournament Name" class="group"/>

            <h3>Prizes</h3>
            <Input label="1st Place Prize" class="group"/>
            <Input label="2nd Place Prize" class="group"/>
            <Input label="3rd Place Prize" class="group"/>
        </form>
    </Card>
</template>


<script>
import moment from 'moment';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import { names } from '../../../utils/auth';

export default {
    name: 'DashboardTournamentDetails',
    meta: {
        auth: names.MODERATOR,
    },
    components: { Card, Input },
    data: () => ({
        date: '',
        time: '',
    }),
    computed: {
        tournament() {
            return this.$store.state.tournament.tournament;
        },
    },
    watch: {
        date() {
            this.timestampChanged();
        },
        time() {
            this.timestampChanged();
        },
        tournament() {
            this.tournamentChanged();
        },
    },
    mounted() {
        this.tournamentChanged();

        this.date = moment.utc(this.tournament.timestamp).format('DD/MM/YYYY');
        this.time = moment.utc(this.tournament.timestamp).format('HH:mm');
    },
    methods: {
        timestampChanged() {
            const timestamp = moment.utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm').unix() * 1000;

            this.tournament.timestamp = timestamp;
        },
        tournamentChanged() {
            const list = [];

            for (let i = 0; i < 5; i += 1) {
                let item = this.tournament.objectives.find((it) => it.number === i);

                if (!item) item = { number: i };

                list.push(item);
            }

            this.tournament.objectives = list;
        },
    },
};
</script>
