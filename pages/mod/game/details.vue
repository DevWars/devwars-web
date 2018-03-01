<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <input v-model="date" type="text" class="form-control">
                <label>Date</label>
            </div>
            <div class="form-group">
                <input v-model="time" type="text" class="form-control">
                <label>Time</label>
            </div>
            <h3 class="modpanel__subtitle">Game</h3>
            <div class="form-group">
                <div class="select-container">
                    <select v-model="game.name" class="form-control">
                        <option value=""></option>
                        <option>Classic</option>
                        <option>Zen Garden</option>
                        <option>Coffee Run</option>
                    </select>
                    <label>Gamemode</label>
                </div>
            </div>
            <div class="form-group">
                <input v-model="game.theme" type="text" class="form-control">
                <label>Theme</label>
            </div>
            <h3 class="modpanel__subtitle">Objectives</h3>
            <div class="form-group" v-for="objective in orderBy(game.objectives, 'number')" :key="objective.id">
                <input v-model="objective.description" type="text" class="form-control" maxlength="110">
                <label>Objective #{{ objective.number + 1 }} (Bonus)</label>
            </div>

            <h3 class="modpanel__subtitle">Media</h3>
            <div class="form-group">
                <input v-model="game.youtube_url" type="text" class="form-control">
                <label>Youtube URL</label>
            </div>
        </form>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import {Watch} from 'vue-property-decorator';

    import moment from 'moment';

    @Component({
        components: {}
    })
    export default class DashboardGameDetails extends Vue {
        @State(state => state.game.game) game;

        date = '';
        time = '';

        mounted() {
            this.gameChanged();

            this.date = moment.utc(this.game.timestamp).format('DD/MM/YYYY');
            this.time = moment.utc(this.game.timestamp).format('HH:mm');
        }

        @Watch('time')
        @Watch('date')
        timestampChanged() {
            let timestamp = moment.utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm').unix() * 1000;

            this.game.timestamp = timestamp;
        }

        @Watch('game')
        gameChanged() {
            let list = [];

            for (let i = 0; i < 5; i++) {
                let item = this.game.objectives.find(it => it.number === i);

                if (!item) item = {number: i};

                list.push(item);
            }

            this.game.objectives = list;
        }
    }
</script>
