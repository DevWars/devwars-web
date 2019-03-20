<template>
    <HomeCard v-if="game && game.teams" title="Last Game Recap">
        <div class="team team-blue"></div>
        <div class="score">
            <span class="gamemode">{{ game.name }}</span>
            <span
                class="points"
            >{{ points_for_team(team_for_game("blue", game), game) }}
            &nbsp;&hyphen;&nbsp;{{ points_for_team(team_for_game("red", game), game) }}
            </span>
        </div>
        <div class="team team-red"></div>

        <div class="matchup">
            <ul class="players players--blue">
                <li>{{ player('blue', 'html').user.username }}</li>
                <li>{{ player('blue', 'css').user.username }}</li>
                <li>{{ player('blue', 'js').user.username }}</li>
            </ul>
            <ul class="pos">
                <li class="color-html">HTML</li>
                <li class="color-css">CSS</li>
                <li class="color-js">JS</li>
            </ul>
            <ul class="players players--red">
                <li>{{ player('red', 'html').user.username }}</li>
                <li>{{ player('red', 'css').user.username }}</li>
                <li>{{ player('red', 'js').user.username }}</li>
            </ul>
        </div>

        <div slot="actions">
            <a href="/games" class="btn btn-outline-primary">View Full Game</a>
        </div>
    </HomeCard>
</template>


<script>
import HomeCard from '@/components/HomeCard';
import { team_for_game, points_for_team } from '../../utils/objectives';

export default {
    name: 'Recap',
    components: { HomeCard },
    props: {
        'game': {
            type: Object,
            required: true,
        },
    },
    data: () => {
        return {
            points_for_team,
            team_for_game,
        };
    },
    methods: {
        player(team, language) {
            return (
                team_for_game(team, this.game).players.find((player) => {
                    return (
                        player.language &&
                        player.language.toLowerCase() === language
                    );
                }) || {
                    user: {},
                }
            );
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.team,
.score {
    @extend %align-middle;
}

.team {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-size: cover;
    background-color: $bg-color-2;

    @include breakpoint(md) {
        width: 60px;
        height: 60px;
    }

    @include breakpoint(xs) {
        display: none;
    }

    &.team-blue {
        background-image: url('~assets/img/team-blue.png');
    }

    &.team-red {
        background-image: url('~assets/img/team-red.png');
    }
}

.score {
    display: inline-block;
    text-transform: uppercase;
    margin: 0 $m-space;
    line-height: 1.37;
    @include breakpoint(md) {
        margin: 0 $s-space;
    }
}

.gamemode,
.points {
    display: block;
}

.points {
    font-size: 48px;
    letter-spacing: 5px;
    @include breakpoint(md) {
        font-size: 24px;
    }
    @include breakpoint(xs) {
        font-size: $h1-font-size;
    }
}

.matchup {
    width: 100%;
    padding: 0 $grid-gutter-width;
    display: flex;
    justify-content: space-between;
    margin: $s-space auto 0;
    font-weight: $font-weight-semibold;

    @include breakpoint(sm) {
        padding: 0;
    }

    li {
        margin-top: $xs-space;
    }
}

.players,
.pos {
    @extend %list-unstyled;
    font-size: $font-size-sm;
}

.players {
    &--blue {
        text-align: left;
    }

    &--red {
        text-align: right;
    }
}

.pos {
    text-align: center;
}
</style>
