<template>
    <div>
        <div class="games-roster mod-card card-bezeless">
            <div class="col-sm-6">
                <div class="games-team team-blue">
                    <div class="games-team__header row">
                        <div class="games-team__header-inner">
                            <h3 class="games-team__name">Blue</h3>
                            <div class="games-team__score">
                                <span class="games-team__points" style="opacity: 0;">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="games-players">
                        <div
                            class="games-player" :key="player.id" v-for="player in team_for_game('blue', game).players"
                            @click="removePlayer(player, team_for_game('blue', game))"
                        >
                            <div class="user-group">
                                <div class="games-player__avatar">
                                    <Avatar :user="player.user" />
                                </div>
                                <div class="games-player__name user-group__name">
                                    {{ player.user.username }}
                                </div>
                            </div>
                            <span class="games-player__position color-js">{{ player.language }}</span>
                        </div>
                    </div>
                </div>
                <div class="select-container">
                    <select v-model="team_for_game('blue', game).status" class="form-control">
                        <option>Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </select>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="games-team team-red">
                    <div class="games-team__header row">
                        <div class="games-team__header-inner">
                            <h3 class="games-team__name">Red</h3>
                            <div class="games-team__score">
                                <span class="games-team__points" style="opacity: 0;">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="games-players">
                        <div
                            class="games-player" :key="player.id" v-for="player in team_for_game('red', game).players"
                            @click="removePlayer(player, team_for_game('red', game))"
                        >
                            <div class="user-group">
                                <div class="games-player__avatar">
                                    <Avatar :user="player.user" />
                                </div>
                                <div class="games-player__name user-group__name">
                                    {{ player.user.username }}
                                </div>
                            </div>
                            <span class="games-player__position color-js">{{ player.language }}</span>
                        </div>
                    </div>
                </div>
                <div class="select-container">
                    <select v-model="team_for_game('red', game).status" class="form-control">
                        <option>Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </select>
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
                <tr v-for="application in applications" :key="application.user.id">
                    <td>
                        <Avatar :user="application.user" />
                        <span>{{ application.user.username }}</span>
                    </td>
                    <td>{{ application.user.statistics.rank.rank }}</td>
                    <td>{{ application.wins + application.losses }}</td>
                    <td>{{ application.wins }}</td>
                    <td>{{ application.losses }}</td>
                    <td>{{ rating(application.user, 'html')}}</td>
                    <td>{{ rating(application.user, 'css')}}</td>
                    <td>{{ rating(application.user, 'js')}}</td>
                    <td class="color-devcoins">{{ application.user.statistics.coins | number }}</td>
                    <td class="modpanel-table__actions">
                        <a href="#edit" class="btn-link btn-icon-reverse" @click="addPlayer(application.user)">
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
    import AddPlayerModal from '~/components/modal/AddPlayerModal';
    import ConfirmModal from '~/components/modal/ConfirmModal';
    import AddRegistrantModal from '~/components/modal/AddRegistrantModal';

    import { team_for_game } from '../../../utils/objectives';

    @Component({
        components: { Avatar },
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
            let applications = await Http.for('game/application').get(`${this.game.id}`);

            this.applications = applications;
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
