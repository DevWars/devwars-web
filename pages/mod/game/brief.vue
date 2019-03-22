<template>
    <div>
        <div class="games-roster mod-card card-bezeless">
            <div class="col-sm-6">
                <GameTeam team="blue">
                    <div
                        v-for="player in team_for_game('blue', game).players"
                        :key="player.id"
                        @click="removePlayer(player, team_for_game('blue', game))"
                    >
                        <Player
                            :user="player.user"
                            :language="player.language"
                            :team="team_for_game('blue', game)"
                        />
                    </div>
                </GameTeam>

                <div class="status">
                    <Select v-model="team_for_game('blue', game).status">
                        <option>Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </Select>
                </div>
            </div>

            <div class="col-sm-6">
                <GameTeam team="red">
                    <div
                        v-for="player in team_for_game('red', game).players"
                        :key="player.id"
                        @click="removePlayer(player, team_for_game('red', game))"
                    >
                        <Player
                            :user="player.user"
                            :language="player.language"
                            :team="team_for_game('red', game)"
                        />
                    </div>
                </GameTeam>

                <div class="status">
                    <Select v-model="team_for_game('red', game).status">
                        <option>Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </Select>
                </div>
            </div>
        </div>

        <br>
        <br>

        <div class="mod-card">
            <div class="mod-card__header">
                <h4
                    class="modpanel__subtitle"
                    style="margin-bottom: 0"
                >({{ applications.length }}) Applicants</h4>
                <button class="btn btn-outline-primary" @click="addRegistrant">Add Registrant</button>
            </div>
        </div>

        <Table>
            <tr slot="head">
                <th>Username</th>
                <th>Rank</th>
                <th>Games</th>
                <th>Won</th>
                <th>Lost</th>
                <th>HTML</th>
                <th>CSS</th>
                <th>JS</th>
                <th>Devcoins</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="user in applications" :key="user.id">
                <td>
                    <User :user="user"/>
                </td>
                <td>{{ user.statistics.rank.rank }}</td>
                <td>{{ user.statistics.wins + user.statistics.losses }}</td>
                <td>{{ user.statistics.wins }}</td>
                <td>{{ user.statistics.losses }}</td>
                <td>{{ rating(user, 'html')}}</td>
                <td>{{ rating(user, 'css')}}</td>
                <td>{{ rating(user, 'js')}}</td>
                <td class="color-devcoins">{{ user.statistics.coins | number }}</td>
                <td class="modpanel-table__actions">
                    <a href="#edit" class="btn-link btn-icon-reverse" @click="addPlayer(user)">
                        <span>Add Player</span>
                        <i class="fa fa-caret-down"></i>
                    </a>
                </td>
            </tr>
        </Table>
    </div>
</template>


<script>
import User from '~/components/user/User';
import Table from '~/components/Table';
import Http from '../../../services/Http';
import GameTeam from '~/components/game/GameTeam';
import Player from '~/components/game/Player';
import Select from '~/components/form/Select';
import AddPlayerModal from '~/components/modal/AddPlayerModal';
import ConfirmModal from '~/components/modal/ConfirmModal';
import AddRegistrantModal from '~/components/modal/AddRegistrantModal';
import { team_for_game } from '../../../utils/objectives';

export default {
    name: 'GameBrief',
    components: { User, Table, GameTeam, Player, Select },
    data() {
        return {
            applications: [],
        };
    },
    computed: {
        game() {
            return this.$store.state.game.game;
        },
        rating(user, lang) {
            if (!user.competitor) return 0;

            return user.competitor[`${lang}_rate`];
        },
    },
    mounted() {
        this.refresh();
    },
    methods: {
        team_for_game,
        addPlayer(user) {
            this.$open(AddPlayerModal, { user, game: this.game });
        },
        async refresh() {
            this.applications = await Http.for(`game/${this.game.id}`).get(
                'applications'
            );
        },
        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });

            await this.refresh();
        },
        async removePlayer(player, team) {
            const confirmed = await this.$open(ConfirmModal, {
                description:
                    'Are you sure you would like to remove this player?',
            });

            if (!confirmed) return;

            await Http.for(`/game/players/${player.id}`).delete();

            team.players.splice(team.players.indexOf(player), 1);
        },
    },
};
</script>


<style lang="scss" scoped>
.status {
    margin: 10px 0 20px;
}
</style>
