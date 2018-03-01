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
                        <div class="games-player" :key="player.id" v-for="player in game.teams.blue.players"
                             ng-click="mod.removePlayer(player)">
                            <div class="user-group">
                                <div class="games-player__avatar">
                                    <Avatar :user="player.user"/>
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
                    <select v-model="game.teams.blue.status" class="form-control">
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
                        <div class="games-player" :key="player.id" v-for="player in game.teams.red.players"
                             ng-click="mod.removePlayer(player)">
                            <div class="user-group">
                                <div class="games-player__avatar">
                                    <Avatar :user="player.user"/>
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
                    <select v-model="game.teams.red.status" class="form-control">
                        <option>Waiting for players...</option>
                        <option>Setting up Discord</option>
                        <option>Setting up game</option>
                        <option>Ready to play!</option>
                    </select>
                </div>
            </div>

        </div>

        <br><br>

        <div class="modpanel-table">
            <br>
            <h3 class="modpanel__subtitle">({{ applications.length }}) Applicants</h3>
            <table>
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
                    <th>Bits</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="application in applications" :key="application.user.id">
                    <td>
                        <img class="modpanel-table__item_image" :src="application.user.avatar_url">
                        <span class="modpanel-table__item_name">{{ application.user.username }}</span>
                    </td>
                    <td>{{ application.user.ranking.rank.rank }}</td>
                    <td>{{ application.wins + application.losses }}</td>
                    <td>{{ application.wins }}</td>
                    <td>{{ application.losses }}</td>
                    <td>{{ rating(application.user, 'html')}}</td>
                    <td>{{ rating(application.user, 'css')}}</td>
                    <td>{{ rating(application.user, 'js')}}</td>
                    <td class="color-devbits">{{ application.user.ranking.bits | number }}</td>
                    <td class="modpanel-table__actions">
                        <a href="#edit" class="btn-link btn-icon-reverse" ng-click="mod.addPlayer(user)">
                            <span>Add Player</span>
                            <i class="fa fa-caret-down"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import Avatar from '~/components/user/Avatar';
    import Http from "../../../services/Http";

    @Component({
        components: {Avatar}
    })
    export default class  extends Vue {
        @State(state => state.game.game) game;
        applications = [];

        rating(user, lang) {
            if(!user.competitor) return 0;

            return user.competitor[lang + '_rate'];
        }

        async mounted() {
            let applications = await Http.for('game/application').get(`${this.game.id}`);

            this.applications = applications;

            console.log(this.applications);
        }
    }
</script>
