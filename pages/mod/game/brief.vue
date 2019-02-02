<template>
    <div>
        <div class="games-roster mod-card card-bezeless">
            <div class="col-sm-6">
                <GameTeam team="blue">
                    <div
                        :key="player.id"
                        v-for="player in team_for_game('blue', game).players"
                        @click="removePlayer(player, team_for_game('blue', game))"
                    >
                        <Player :user="player.user" :lang="player.language" team="blue" />
                    </div>
                </GameTeam>

                <div class="status">
                    <Select v-model="team_for_game('blue', game).status">
                        <option :selected="true">Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </Select>
                </div>
            </div>

            <div class="col-sm-6">
                <GameTeam team="red">
                    <div
                        :key="player.id"
                        v-for="player in team_for_game('red', game).players"
                        @click="removePlayer(player, team_for_game('red', game))"
                    >
                        <Player :user="player.user" :lang="player.language" team="red" />
                    </div>
                </GameTeam>

                <div class="status">
                    <Select v-model="team_for_game('red', game).status">
                        <option :selected="true">Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </Select>
                </div>
            </div>

        </div>

        <br><br>

        <div class="mod-card">
            <div class="mod-card__header">
                <h4 class="modpanel__subtitle" style="margin-bottom: 0">({{ applications.length }}) Applicants</h4>
                <button @click="addRegistrant" class="btn btn-outline-primary">Add Registrant</button>
            </div>

        </div>
        <table class="modpanel-table">
            <thead>
                <tr>
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
            </thead>
            <tbody>
                <tr v-for="user in applications" :key="user.id">
                    <td>
                        <Avatar :user="user" />
                        <span>{{ user.username }}</span>
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
            </tbody>
        </table>
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import Avatar from '~/components/user/Avatar';
    import Http from "../../../services/Http";
    import GameTeam from '~/components/game/GameTeam';
    import Player from '~/components/game/Player';
    import Select from '~/components/form/Select';
    import AddPlayerModal from '~/components/modal/AddPlayerModal';
    import ConfirmModal from '~/components/modal/ConfirmModal';
    import AddRegistrantModal from '~/components/modal/AddRegistrantModal';

    import { team_for_game } from '../../../utils/objectives';

    @Component({
        components: { Avatar, GameTeam, Player, Select },
        methods: { team_for_game },
    })
    export default class  extends Vue {
        @State(state => state.game.game) game;

        applications = [];

        rating(user, lang) {
            if (!user.competitor) return 0;

            return user.competitor[lang + '_rate'];
        }

        async mounted() {
            this.applications = await Http.for(`game/${this.game.id}`).get('applications');
        }

        addPlayer(user) {
            this.$open(AddPlayerModal, { user, game: this.game });
        }

        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });

            this.applications = await Http.for('game/application').get(`${this.game.id}`);
        }

        async removePlayer(player, team) {
            let confirmed = await this.$open(ConfirmModal, { description: "Are you sure you would like to remove this player?" });

            if (!confirmed) return;

            await Http.for('player').delete(player);

            team.players.splice(team.players.indexOf(player), 1);
        }
    }
</script>

<style lang="scss" scoped>
.status {
    margin: 10px 0 20px;
}
</style>
