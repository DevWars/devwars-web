<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <Input v-model="game.startTime"/>
                <label>Date</label>
            </div>
            <h3 class="modpanel__subtitle">Game</h3>
            <div class="form-group">
                <div class="select-container">
                    <select v-model="game.mode" class="form-control">
                        <option value></option>
                        <option>Classic</option>
                        <option>Zen Garden</option>
                        <option>Blitz</option>
                        <option>Coffee Run</option>
                    </select>
                    <label>Gamemode</label>
                </div>
            </div>
            <div class="form-group">
                <Input v-model="game.title"/>
                <label>Theme</label>
            </div>
            <h3 class="modpanel__subtitle">Objectives</h3>
            <div
                v-for="objective in orderBy(game.objectives, 'number')"
                :key="objective.id"
                class="mod-objectives form-group"
            >
                <div class="mod-objectives__input">
                    <Input v-model="objective.description" maxlength="110"/>
                    <label>Objective #{{ objective.number }} (Bonus)</label>
                </div>
                <SquareToggle
                    :active="team_completed_objective(team_for_game('red', game), objective)"
                    color="red"
                    @change="toggleObjective(team_for_game('red', game), objective)"
                />
                <SquareToggle
                    :active="team_completed_objective(team_for_game('blue', game), objective)"
                    color="blue"
                    @change="toggleObjective(team_for_game('blue', game), objective)"
                />
            </div>

            <h3 v-if="game.title === 'Zen Garden'" class="modpanel__subtitle">Zen Garden HTML</h3>
            <div v-if="game.title === 'Zen Garden'" class="form-group">
                <textarea
                    v-model="game.languageTemplates.html"
                    class="form-control"
                    placeholder="Insert HTML code here..."
                    rows="10"
                ></textarea>
            </div>

            <h3 class="modpanel__subtitle">Media</h3>
            <div class="form-group">
                <Input v-model="game.videoUrl"/>
                <label>Youtube URL</label>
            </div>

            <h3 class="modpanel__subtitle">Votes</h3>
            <div v-for="vote in ['UI', 'UX']" :key="vote" class="row">
                <div v-for="team in game.teams" :key="team.id" class="col-sm-6 form-group">
                    <VoteBoxInput
                        :team="team"
                        :vote="vote"
                        @change="updated => team.votes[vote] = updated"
                    />
                    <label>{{ vote }} - {{ team.name | capitalize }} Votes</label>
                </div>
            </div>

            <h3 class="modpanel__subtitle">Files</h3>
            <div class="row">
                <div class="col-sm-6 form-group">
                    <Input id="force-valid" type="file"/>
                    <label>Blue Files</label>
                </div>
                <div class="col-sm-6 form-group">
                    <Input id="force-valid" type="file"/>
                    <label>Red Files</label>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import moment from 'moment';
import Input from '~/components/form/Input';
import VoteBoxInput from '../../../components/game/VoteBoxInput';
import SquareToggle from '../../../components/SquareToggle';

import {
    team_for_game,
    team_completed_objective,
} from '../../../utils/objectives';

export default {
    name: 'DashboardGameDetails',
    components: { SquareToggle, VoteBoxInput, Input },
    data: () => ({
        date: '',
        time: '',
    }),
    computed: {
        game() {
            return this.$store.state.game.game;
        },
    },
    watch: {
        date() {
            this.timestampChanged();
        },
        game() {
            this.gameChanged();
        },
    },
    mounted() {
        this.gameChanged();

        this.date = moment.utc(this.game.startTime).format('DD/MM/YYYY');
        this.time = moment.utc(this.game.startTime).format('HH:mm');
    },
    methods: {
        team_for_game,
        timestampChanged() {
            const timestamp =
                moment
                    .utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm')
                    .unix() * 1000;

            this.game.startTime = timestamp;
        },
        gameChanged() {
            const list = [];

            for (let i = 1; i <= 5; i += 1) {
                let item = this.game.objectives.find((it) => it.number === i);

                if (!item) item = { number: i };

                list.push(item);
            }

            this.game.objectives = list;
        },
        toggleObjective(team, objective) {
            const hasCompleted = team_completed_objective(team, objective);
            if (!hasCompleted) return team.completedObjectives.push(objective);

            team.completedObjectives = team.completedObjectives.filter(
                (it) => it.id !== objective.id
            );
        },
    },
};
</script>
