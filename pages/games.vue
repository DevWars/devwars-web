<template>
    <div class="container-fluid">
        <div class="games-sidebar no-gutter col-sm-3">
            <nav class="nav-tabs nav-tabs-fluid">
                <button class="nav-tabs__item" v-for="current in seasons" :key="current" @click="season = current"
                        :class="{active: season === current}">
                    Season {{ current }}
                </button>
            </nav>

            <div class="game-item" @click="view(game)" :key="game.id" v-for="game in games"
                 :class="{active: viewing.id === game.id}">
                <div class="game-item__meta">
                    <span class="game-item__gamemode" :class="[game.name.toLowerCase()]">{{ game.name }}</span>
                    <span class="game-item__date">
                    {{ game.timestamp | moment('MMM') }} {{ game.timestamp | moment('DD') }}, {{ game.timestamp | moment('YYYY') }}
                </span>
                    <span class="game-item__theme">{{ game.theme }}</span>
                </div>
                <div class="game-item__icons">
                    <i v-show="game.youtube_url" class="game-item__youtube fa fa-youtube-play"></i>
                    <!-- For some reason no games have youtube URLs? -->
                </div>
            </div>
        </div>
        <!--sidebar-->


        <div class="games-view col-sm-9">
            <div class="games-banner row" :class="[viewing.name.split(' ').join('-').toLowerCase()]">
                <div class="games-banner__inner">
                    <div class="games-banner__meta">
                    <span class="games-banner__date">
                        {{ viewing.timestamp | moment('MMM') }} {{ viewing.timestamp | moment('DD') }}, {{ viewing.timestamp | moment('YYYY') }}
                    </span>
                        <h2 class="games-banner__gamemode">
                            {{ viewing.name }}
                        </h2>
                        <div class="games-banner__versus">
                            {{ viewing.teams.blue.players.length }} VS {{ viewing.teams.red.players.length }}
                        </div>
                    </div>
                    <a v-show="viewing.youtube_url" :href="viewing.youtube_url"
                       class="games-banner__youtube btn btn-icon btn-youtube" target="_blank">
                        <i class="icon icon-youtube"></i>
                        <span>Watch on YouTube</span>
                    </a>
                </div>
            </div>

            <div class="games-roster row">
                <div v-for="(team, index) in ['blue', 'red']" :key="team" :class="['team-' + team]"
                     class="games-team mirror col-sm-6">
                    <div class="games-team__header row">
                        <div class="games-team__header-inner">
                            <h3 v-if="index === 0" class="games-team__name">{{ viewing.teams[team].name }}</h3>
                            <div class="games-team__score">
                                <span class="games-team__win"
                                      v-if="viewing.teams[team].winner && index === 0">Win</span>
                                <span class="games-team__points">{{ viewing.teams[team].points }}</span>
                                <span class="games-team__win"
                                      v-if="viewing.teams[team].winner && index === 1">Win</span>
                            </div>
                            <h3 v-if="index === 1" class="games-team__name">{{ viewing.teams[team].name }}</h3>
                        </div>
                    </div>
                    <div class="games-players">
                        <div class="games-player" v-for="language in ['html', 'css', 'js']" :key="language"
                             v-if="player(team, language)">
                            <div class="user-group">
                                <div v-if="index === 0" class="games-player__avatar">
                                    <Avatar :user="player(team, language).user"/>
                                </div>
                                <div class="games-player__name user-group__name">
                                    {{ player(team, language).user.username }}
                                </div>
                                <div v-if="index === 1" class="games-player__avatar">
                                    <Avatar :user="player(team, language).user"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <ul class="games-roster__positions">
                    <li v-for="language in ['html', 'css', 'js']" :key="language" :class="[language + '-color']" v-show="player('blue', language) || player('red', language)">{{ language | uppercase }}</li>
                </ul>
            </div>

            <div class="games-resources">
                <a target="_blank" :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + viewing.id + '/blue'"
                   class="btn btn-outline-primary">View
                    Blue Website</a>
                <a target="_blank" :href="'/games/code?id=' + viewing.id" class="btn btn-outline-white">View
                    Game
                    Code</a>
                <a target="_blank" :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + viewing.id + '/red'"
                   class="btn btn-outline-secondary">View
                    Red Website</a>

            </div>

            <div class="sub-score-section" v-if="viewing.theme">
                <div class="sub-score-header theme">
                    <h3 class="sub-score-header__title">Theme</h3>
                </div>
                <h3 class="sub-score-header__theme">{{ viewing.theme }}</h3>
            </div>

            <div class="sub-score-section" v-if="viewing.objectives.length > 0">
                <div class="sub-score-header">
                    <span
                        class="sub-score-header__points team-blue">{{ viewing.teams.blue.completed_objectives.length }}</span>
                    <h3 class="sub-score-header__title">Objectives</h3>
                    <span
                        class="sub-score-header__points team-red">{{ viewing.teams.red.completed_objectives.length }}</span>
                </div>
                <ul class="obj-list">
                    <li class="obj-list__item" :class="{bonus: index === viewing.objectives.length - 1 }"
                        v-for="(objective, index) in viewing.objectives" :key="objective.id">
                        <div class="obj-list__square team-blue"
                             :class="{active: didTeamComplete('blue', objective) }"></div>
                        <span class="obj-list__obj">{{ objective.description }}</span>
                        <div class="obj-list__square team-red"
                             :class="{active: didTeamComplete('red', objective) }"></div>
                    </li>
                </ul>
            </div>

            <VoteBox :game="viewing" vote="Design" label="UI"/>
            <VoteBox :game="viewing" vote="Functionality" label="UX"/>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../services/Http";

    import Avatar from '~/components/user/Avatar';
    import VoteBox from '~/components/game/VoteBox';

    @Component({
        components: {Avatar, VoteBox}
    })
    export default class Games extends Vue {
        seasons = [3, 2, 1];
        season = 3;

        player(team, language) {
            return this.viewing.teams[team].players.find(player => player.language.toLowerCase() === language);
        }

        didTeamComplete(team, objective) {
            return this.viewing.teams[team].completed_objectives.some(completed => completed === objective.id);
        }

        view(game) {
            this.viewing = game;
        }

        get games() {
            return this.past[this.season];
        }

        async asyncData() {
            let past = await Http.for('game').get('past');

            let viewing = Object.values(past).reverse().find(it => it.length)[0];

            return {past, viewing, season: viewing.season};
        }
    }
</script>
