<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <Input v-model="date" />
                <label>Date</label>
            </div>
            <div class="form-group">
                <Input v-model="time" />
                <label>Time</label>
            </div>
            <h3 class="modpanel__subtitle">Game</h3>
            <div class="form-group">
                <div class="select-container">
                    <select v-model="game.name" class="form-control">
                        <option value=""></option>
                        <option>Classic</option>
                        <option>Zen Garden</option>
                        <option>Blitz</option>
                        <option>Coffee Run</option>
                    </select>
                    <label>Gamemode</label>
                </div>
            </div>
            <div class="form-group">
                <Input v-model="game.theme" />
                <label>Theme</label>
            </div>
            <h3 class="modpanel__subtitle">Objectives</h3>
            <div
                class="mod-objectives form-group" v-for="objective in orderBy(game.objectives, 'number')"
                :key="objective.id"
            >
                <div class="mod-objectives__input">
                    <Input v-model="objective.description" maxlength="110" />
                    <label>Objective #{{ objective.number + 1 }} (Bonus)</label>
                </div>
                <SquareToggle
                    @change="toggleObjective(game.teams.red, objective)"
                    :active="teamCompletedObjective(game.teams.red, objective)" color="red"
                />
                <SquareToggle
                    @change="toggleObjective(game.teams.blue, objective)"
                    :active="teamCompletedObjective(game.teams.blue, objective)" color="blue" />
            </div>

            <h3 v-if="game.name === 'Zen Garden'" class="modpanel__subtitle">Zen Garden HTML</h3>
            <div v-if="game.name === 'Zen Garden'" class="form-group">
                <textarea
                    v-model="game.language_templates.html"
                    class="form-control"
                    placeholder="Insert HTML code here..."
                    rows="10"
                ></textarea>
            </div>

            <h3 class="modpanel__subtitle">Media</h3>
            <div class="form-group">
                <Input v-model="game.youtube_url" />
                <label>Youtube URL</label>
            </div>

            <h3 class="modpanel__subtitle">Votes</h3>
            <div v-for="vote in ['UI', 'UX']" :key="vote" class="row">
                <div v-for="team in game.teams" :key="team.id" class="col-sm-6 form-group">
                    <VoteBoxInput @change="updated => team.votes[vote] = updated" :team="team" :vote="vote" />
                    <label>{{ vote }} - {{ team.name | capitalize }} Votes</label>
                </div>
            </div>

            <h3 class="modpanel__subtitle">Files</h3>
            <div class="row">
                <div class="col-sm-6 form-group">
                    <Input type="file" id="force-valid" />
                    <label>Blue Files</label>
                </div>
                <div class="col-sm-6 form-group">
                    <Input type="file" id="force-valid" />
                    <label>Red Files</label>
                </div>
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
    import VoteBoxInput from '../../../components/game/VoteBoxInput';
    import SquareToggle from '../../../components/SquareToggle';

    import { team_completed_objective } from '../../../utils/objectives';

    @Component({
        components: { SquareToggle, VoteBoxInput, Input }
    })

    export default class DashboardGameDetails extends Vue {
        @State(state => state.game.game) game;

        date = '';
        time = '';

        teamCompletedObjective = team_completed_objective;

        mounted() {
            this.gameChanged();

            this.date = moment.utc(this.game.timestamp).format('DD/MM/YYYY');
            this.time = moment.utc(this.game.timestamp).format('HH:mm');
        }

        toggleObjective(team, objective) {
            const has = team_completed_objective(team, objective);

            if(has) {
                team.completedObjectives = team.completedObjectives.filter(it => it.id !== objective.id);
            } else {
                team.completedObjectives.push(objective);
            }
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

                if (!item) item = { number: i };

                list.push(item);
            }

            this.game.objectives = list;
        }
    }
</script>
