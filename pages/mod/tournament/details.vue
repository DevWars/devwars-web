<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <Input v-model="tournament.name"/>
                <label>Tournament Name</label>
            </div>

            <h3 class="modpanel__subtitle">Prizes</h3>
            <div class="form-group">
                <Input/>
                <label>1st Place Prize</label>
            </div>
            <div class="form-group">
                <Input/>
                <label>2nd Place Prize</label>
            </div>
            <div class="form-group">
                <Input/>
                <label>3rd Place Prize</label>
            </div>
        </form>
    </div>
</template>


<script>
import moment from 'moment';
import Input from '~/components/form/Input';

export default {
    name: 'DashboardTournamentDetails',
    components: { Input },
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
            const timestamp =
                moment
                    .utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm')
                    .unix() * 1000;

            this.tournament.timestamp = timestamp;
        },
        tournamentChanged() {
            const list = [];

            for (let i = 0; i < 5; i += 1) {
                let item = this.tournament.objectives.find(
                    (it) => it.number === i
                );

                if (!item) item = { number: i };

                list.push(item);
            }

            this.tournament.objectives = list;
        },
    },
};
</script>
