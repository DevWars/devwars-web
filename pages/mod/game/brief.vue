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
                        <div class="games-player" :key="player.id" v-for="player in game.teams.blue.players" ng-click="mod.removePlayer(player)">
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

        <!--<div class="modpanel-table">-->
            <!--<br>-->
            <!--<h3 class="modpanel__subtitle">({{ applications.length }}) Applicants</h3>-->
            <!--<table>-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th>Username</th>-->
                    <!--<th>Rank</th>-->
                    <!--<th>Games</th>-->
                    <!--<th>Won</th>-->
                    <!--<th>Lost</th>-->
                    <!--<th>HTML</th>-->
                    <!--<th>CSS</th>-->
                    <!--<th>JS</th>-->
                    <!--<th>&nbsp;</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="user in applications" :key="user.id">-->
                    <!--<td>-->
                        <!--<img class="modpanel-table__item_image" ng-src="{{ user.avatarURL }}">-->
                        <!--<span class="modpanel-table__item_name">{{ user.username }}</span>-->
                    <!--</td>-->
                    <!--<td>{{ user.rank.rank }}</td>-->
                    <!--<td>{{ user.gamesPlayed }}</td>-->
                    <!--<td>{{ user.gamesWon}}</td>-->
                    <!--<td>{{ user.gamesLost}}</td>-->
                    <!--<td>{{ user.warrior.htmlRate}}</td>-->
                    <!--<td>{{ user.warrior.cssRate }}</td>-->
                    <!--<td>{{ user.warrior.jsRate }}</td>-->
                    <!--<td class="color-devbits">{{ user.devBits | number : fractionSize }}</td>-->
                    <!--<td class="modpanel-table__actions">-->
                        <!--<a href="#edit" class="btn-link btn-icon-reverse" ng-click="mod.addPlayer(user)">-->
                            <!--<span>Add Player</span>-->
                            <!--<i class="fa fa-caret-down"></i>-->
                        <!--</a>-->
                    <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
        <!--</div>-->
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        components: {}
    })
    export default class  extends Vue {
        @State(state => state.game.game) game;

    }
</script>
