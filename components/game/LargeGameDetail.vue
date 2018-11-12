<template>
    <div v-if="game">
        <div class="games-banner row" :class="[game.name.split(' ').join('-').toLowerCase()]">
            <div class="games-banner__inner">
                <div class="games-banner__meta">
                    <span class="games-banner__date">
                        {{ game.timestamp | moment('MMM') }} {{ game.timestamp | moment('DD') }}, {{ game.timestamp | moment('YYYY') }}
                    </span>
                    <h2 class="games-banner__gamemode">
                        {{ game.name }}
                    </h2>
                    <div class="games-banner__versus">
                        {{ blue.players.length }} VS {{ red.players.length }}
                    </div>
                </div   >
                <a
                    v-show="game.youtube_url" :href="game.youtube_url"
                    class="btn btn-icon btn-youtube" target="_blank"
                >
                    <i class="fab fa-youtube"></i>
                    <span>Watch on YouTube</span>
                </a>
            </div>
        </div>

        <div class="games-roster row">
            <div
                v-for="(team, index) in ['blue', 'red']" :key="team" :class="['team-' + team]"
                class="games-team mirror col-sm-6"
            >
                <div class="games-team__header row">
                    <div class="games-team__header-inner">
                        <h3 v-if="index === 0" class="games-team__name">{{ team_for_game(team, game).name }}</h3>
                        <div class="games-team__score">
                                <span
                                    class="games-team__win"
                                    v-show="index === 0 && winner_for_game(game) === team_for_game(team, game)"
                                >Win</span>
                            <span class="games-team__points">{{ points_for_team(team_for_game(team, game), game)}}</span>
                            <span
                                class="games-team__win"
                                v-show="index === 1 && winner_for_game(game) === team_for_game(team, game)"
                            >Win</span>
                        </div>
                        <h3 v-if="index === 1" class="games-team__name">{{ team_for_game(team, game).name }}</h3>
                    </div>
                </div>
                <div class="games-players">
                    <div
                        class="games-player" v-for="language in ['html', 'css', 'js']" :key="language"
                        v-if="player(team, language)"
                    >
                        <div class="user-group">
                            <div v-if="index === 0" class="games-player__avatar">
                                <Avatar :user="player(team, language).user" />
                            </div>
                            <div class="games-player__name user-group__name">
                                {{ player(team, language).user.username }}
                            </div>
                            <div v-if="index === 1" class="games-player__avatar">
                                <Avatar :user="player(team, language).user" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ul class="games-roster__positions">
                <li
                    v-for="language in ['html', 'css', 'js']" :key="language" :class="[language + '-color']"
                    v-show="player('blue', language) || player('red', language)"
                >{{ language | uppercase }}
                </li>
            </ul>
        </div>

        <div class="games-resources">
            <a
                target="_blank" :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + game.id + '/blue'"
                class="btn btn-outline-primary"
            >View
                Blue Website</a>
            <a target="_blank" :href="'/games/code?id=' + game.id" class="btn btn-outline-white">View
                Game
                Code</a>
            <a
                target="_blank" :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + game.id + '/red'"
                class="btn btn-outline-secondary"
            >View
                Red Website</a>

        </div>

        <div class="sub-score-section" v-if="game.theme">
            <div class="sub-score-header theme">
                <h3 class="sub-score-header__title">Theme</h3>
            </div>
            <h3 class="sub-score-header__theme">{{ game.theme }}</h3>
        </div>

        <div class="sub-score-section" v-if="game.objectives.length > 0">
            <div class="sub-score-header">
                    <span
                        class="sub-score-header__points team-blue"
                    >{{ team_for_game("blue", game).completedObjectives.length }}</span>
                <h3 class="sub-score-header__title">Objectives</h3>
                <span
                    class="sub-score-header__points team-red"
                >{{ team_for_game("red", game).completedObjectives.length }}</span>
            </div>
            <ul class="obj-list">
                <li
                    class="obj-list__item" :class="{bonus: index === game.objectives.length - 1 }"
                    v-for="(objective, index) in game.objectives" :key="objective.id"
                >
                    <div
                        class="obj-list__square team-blue"
                        :class="{active: didTeamComplete('blue', objective) }"
                    ></div>
                    <span class="obj-list__obj">{{ objective.description }}</span>
                    <div
                        class="obj-list__square team-red"
                        :class="{active: didTeamComplete('red', objective) }"
                    ></div>
                </li>
            </ul>
        </div>

        <VoteBox :game="game" vote="Design" label="ui" />
        <VoteBox :game="game" vote="Functionality" label="ux" />
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';

    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    import Avatar from '~/components/user/Avatar';
    import VoteBox from '~/components/game/VoteBox';

    import { team_completed_objective, team_for_game, points_for_team, winner_for_game } from '../../utils/objectives';

    @Component({
        components: {Avatar, VoteBox},
        methods: {team_for_game, points_for_team, winner_for_game}
    })
    export default class extends Vue {
        @Prop() game;

        player(team, language) {
            return team_for_game(team, this.game).players.find(player => player.language.toLowerCase() === language);
        }

       didTeamComplete(team, objective) {
            return team_completed_objective(team_for_game(team, this.game), objective);
        }

        get blue() {
            return team_for_game("blue", this.game);
        }

        get red() {
            return team_for_game("red", this.game);
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';


</style>
