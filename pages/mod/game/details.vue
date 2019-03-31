<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Main</h3>
            <div class="form-group">
                <Input v-model="game.createdAt"/>
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
            <div v-for="objective in game.objectives" :key="objective.id">
                <div class="mod-objectives__input">
                    <Input v-model="objective.description" maxlength="110"/>
                    <label>Objective #{{ objective.number }} (Bonus)</label>
                </div>
                <SquareToggle
                    v-for="team of teams"
                    :key="team.id"
                    :name="team.name"
                    :active="!!teamCompletedObjective(team.id, objective)"
                    @change="toggleObjective(team.id, objective.id)"
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
            <div class="row">
                <div v-for="team in teams" :key="team.id" class="col-sm-6">
                    <div v-for="vote in team.votes" :key="vote.id" class="form-group">
                        <Input :value="vote" @change="updated => team.votes[vote] = updated"/>
                        <label>
                            {{ Object.keys(team.votes).find(key => team.votes[key] === vote) }}
                            - {{ team.name | capitalize }} Votes
                        </label>
                    </div>
                </div>
            </div>

            <!--
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
            </div>-->
        </form>
    </div>
</template>


<script>
import Input from '~/components/form/Input';
import SquareToggle from '../../../components/SquareToggle';
import { teams } from '~/utils/mixins';
import { teamCompletedObjective } from '~/utils';
import { roles } from '../../../utils/auth';

export default {
    name: 'DashboardGameDetails',
    meta: {
        auth: [roles.moderator, roles.admin],
    },
    components: { SquareToggle, Input },
    mixins: [teams],
    data: () => ({
        date: '',
        time: '',
    }),
    computed: {
        game() {
            return this.$store.state.game.game;
        },
    },
    methods: {
        teamCompletedObjective,
        toggleObjective(teamId, objectiveId) {
            const objectives = this.game.teams[teamId].objectives;

            if (objectives[objectiveId] === 'complete') {
                objectives[objectiveId] = 'incomplete';
            } else {
                objectives[objectiveId] = 'complete';
            }
        },
    },
};
</script>
