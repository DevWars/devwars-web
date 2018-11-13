<template>
    <div v-if="game">
        <div class="banner row" :class="[game.name.split(' ').join('-').toLowerCase()]">
            <div class="banner__inner">
                <div class="banner__meta">
                    <span class="banner__date">
                        {{ game.timestamp | moment('MMM') }} {{ game.timestamp | moment('DD') }}, {{ game.timestamp | moment('YYYY') }}
                    </span>
                    <h2 class="banner__gamemode">
                        {{ game.name }}
                    </h2>
                    <div class="banner__versus">
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

        <div class="roster row">
            <div
                v-for="(team, index) in ['blue', 'red']" :key="team" :class="['team-' + team]"
                class="team mirror col-sm-6"
            >
                <div class="team__header row">
                    <div class="team__header-inner">
                        <h3 v-if="index === 0" class="team__name">{{ team_for_game(team, game).name }}</h3>
                        <div class="team__score">
                                <span
                                    class="team__win"
                                    v-show="index === 0 && winner_for_game(game) === team_for_game(team, game)"
                                >Win</span>
                            <span class="team__points">{{ points_for_team(team_for_game(team, game), game)}}</span>
                            <span
                                class="team__win"
                                v-show="index === 1 && winner_for_game(game) === team_for_game(team, game)"
                            >Win</span>
                        </div>
                        <h3 v-if="index === 1" class="team__name">{{ team_for_game(team, game).name }}</h3>
                    </div>
                </div>
                <div class="players">
                    <div
                        class="player" v-for="language in ['html', 'css', 'js']" :key="language"
                        v-if="player(team, language)"
                    >
                        <div class="user-group">
                            <div v-if="index === 0" class="player__avatar">
                                <Avatar :user="player(team, language).user" />
                            </div>
                            <div class="player__name user-group__name">
                                {{ player(team, language).user.username }}
                            </div>
                            <div v-if="index === 1" class="player__avatar">
                                <Avatar :user="player(team, language).user" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ul class="roster__positions">
                <li
                    v-for="language in ['html', 'css', 'js']" :key="language" :class="[language + '-color']"
                    v-show="player('blue', language) || player('red', language)"
                >{{ language | uppercase }}
                </li>
            </ul>
        </div>

        <div class="resources">
            <a
                target="_blank"
                :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + game.id + '/blue'"
                class="btn btn-outline-primary"
            >
                View Blue Website
            </a>
            <a
                target="_blank"
                :href="'/games/code?id=' + game.id"
                class="btn btn-outline-white">
                View Game Code
            </a>
            <a
                target="_blank"
                :href="'https://s3.amazonaws.com/devwars-cdn/sitestorage/' + game.id + '/red'"
                class="btn btn-outline-secondary"
            >
                View Red Website
            </a>

        </div>

        <SubScore
            title="New Theme"
            v-if="game.theme"
        >
            <h3>{{ game.theme }}</h3>
        </SubScore>

        <SubScore
            title="Objectives"
            :blueScore="team_for_game('blue', game).completedObjectives.length"
            :redScore="team_for_game('red', game).completedObjectives.length"
            v-if="game.objectives.length > 0"
        >
            <ul class="objectives">
                <li
                    class="objectives__item" :class="{bonus: index === game.objectives.length - 1 }"
                    v-for="(objective, index) in game.objectives" :key="objective.id"
                >
                    <div
                        class="objectives__square team-blue"
                        :class="{active: didTeamComplete('blue', objective) }"
                    ></div>
                    <span class="objectives__obj">{{ objective.description }}</span>
                    <div
                        class="objectives__square team-red"
                        :class="{active: didTeamComplete('red', objective) }"
                    ></div>
                </li>
            </ul>
        </SubScore>

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
    import SubScore from '~/components/game/SubScore';

    import { team_completed_objective, team_for_game, points_for_team, winner_for_game } from '../../utils/objectives';

    @Component({
        components: {Avatar, SubScore, VoteBox},
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

.roster {
    position: relative;

    &__positions {
        @extend %absolute-center-x;
        height: 65px;
        top: 65px + $xs-space;
        list-style: none;
        text-align: center;

    li {
        height: 50px + ($xs-space * 2) + ($border-size * 2);
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
    }

        .html-color { color: $html-color; }
        .css-color { color: $css-color; }
        .js-color { color: $js-color; }
    }
}

.banner {
    background-size: cover;
    padding: $m-space $s-space;

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__meta {
        line-height: 1;
    }

    &__date {
        display: block;
        margin-bottom: $xs-space;
    }

    &__gamemode,
    &__versus {
        @extend %align-middle;
        line-height: 1;
    }

    &__gamemode {
        font-size: $display5-size;

        &:after {
            @extend %align-middle;
            content: "";
            height: 2.5rem;
            width: 1px;
            background-color: $text-color-muted;
            margin: 0 $xs-space 0 $xxs-space;
        }
    }

    &__versus {
        font-size: $h4-font-size;
    }

    &.classic { background-image: url('~/assets/img/classic-bg.jpg'); }
    &.zen-garden { background-image: url('~/assets/img/zen-garden-bg.jpg'); }
    //&.coffee-run { background-image: url('~/assets/img/coffee-run-bg.jpg'); }
}


.team {

    &__header {
        border-bottom-width: $border-size;
        border-bottom-style: solid;
        text-transform: uppercase;
    }

    &__header-inner {
        @extend %flex-justify;
        padding: 0 $s-space;
    }

    &__name {
        font-weight: $font-weight-bold;
        font-size: 24px;
    }

    &__score {}

    &__points,
    &__win {
        vertical-align: middle;
    }

    &__points {
        font-size: 42px;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(#fff, 0.6);
        color: #fff;
    }

    &__win {
        padding: 0 $s-space;
        color: $success-color;
        font-weight: bold;
        font-size: 18px;
    }

    // Variations
    @mixin team-variant($team, $color, $direction) {
        &.#{$team} &__header {
            border-color: $color;
            background: linear-gradient(
                to left,
                rgba($color, 0.3),
                transparent
            );
        }
        &.#{$team} &__name { color: $color; }
        &.#{$team} .player__avatar { border-color: $color; }

        &.mirror.#{$team} &__header {
            background: linear-gradient(
                to $direction,
                rgba($color, 0.3),
                transparent
            );
        }
        &.mirror.#{$team} .player {
            display: block; // undos flexbox
            text-align: $direction;
        }
    }

    @include team-variant(team-blue, $brand-primary, left);
    @include team-variant(team-red, $brand-secondary, right);
}

.players {
	padding: $xs-space;
}

.player {
    @extend %flex-justify;
    padding: $xs-space 0;

    &__avatar,
    &__name {
        @extend %align-middle;
    }

    &__avatar {
        border: $border-size solid transparent;
        border-radius: 50%;
    }

    &__name {
        padding: 0 $xs-space;
        font-size: $h4-font-size;
    }

    &__position {

    }
}

.resources {
    @extend %flex-justify;
    padding: $s-space;
}

.objectives {

    &__item {
        @extend %flex-justify;
        width: 100%;
        padding-bottom: $s-space;
        text-align: center;

        &.bonus {
            color: $bonus-color;
        }
    }

    &__square {
        width: 30px;
        height: 30px;
        border: 5px solid #23252C;

        &.team-blue.active {
            background-color: $brand-primary;
        }

        &.team-red.active {
            background-color: $brand-secondary;
        }
    }

    &__item.bonus &__square.active {
        background-color: $bonus-color;
    }
}
</style>
