<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <Input v-model="tournament.name" />
                <label>Tournament Name</label>
            </div>

            <h3 class="modpanel__subtitle">Prizes</h3>
            <div class="form-group">
                <Input />
                <label>1st Place Prize</label>
            </div>
            <div class="form-group">
                <Input />
                <label>2nd Place Prize</label>
            </div>
            <div class="form-group">
                <Input />
                <label>3rd Place Prize</label>
            </div>
        </form>
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import { Watch } from 'vue-property-decorator';

    import moment from 'moment';
    import Input from '~/components/form/Input';

    @Component({
        components: { Input }
    })

    export default class DashboardTournamentDetails extends Vue {
        @State(state => state.tournament.tournament) tournament;

        date = '';
        time = '';

        mounted() {
            this.tournamentChanged();

            this.date = moment.utc(this.tournament.timestamp).format('DD/MM/YYYY');
            this.time = moment.utc(this.tournament.timestamp).format('HH:mm');
        }

        @Watch('time')
        @Watch('date')
        timestampChanged() {
            let timestamp = moment.utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm').unix() * 1000;

            this.tournament.timestamp = timestamp;
        }

        @Watch('tournament')
        tournamentChanged() {
            let list = [];

            for (let i = 0; i < 5; i++) {
                let item = this.tournament.objectives.find(it => it.number === i);

                if (!item) item = { number: i };

                list.push(item);
            }

            this.tournament.objectives = list;
        }
    }
</script>
