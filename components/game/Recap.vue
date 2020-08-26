<template>
    <div>
        <HomeCard v-if="game" title="Last Game Recap">
            <div class="content-container">
                <div class="header">
                    <div class="team">
                        <div class="team-logo blue" />
                    </div>
                    <div class="score">
                        <div class="gamemode">
                            {{ game.mode }}
                        </div>
                        <div
                            v-for="team in currentTeams"
                            :key="team.id"
                            class="points"
                        >
                            {{ team.score }}
                        </div>
                    </div>
                    <div class="team">
                        <div class="team-logo red" />
                    </div>
                </div>

                <div class="matchup">
                    <ul
                        v-for="team in currentTeams"
                        :key="team.id"
                        class="players"
                        :class="{
                            blue: team.name === 'blue',
                            red: team.name === 'red',
                        }"
                    >
                        <li
                            v-for="player in team.players"
                            :key="player.user.id"
                        >
                            <nuxt-link :to="`/dashboard/${player.user.id}`">
                                {{ player.user.username }}
                            </nuxt-link>
                        </li>
                    </ul>
                    <ul class="pos">
                        <li class="html">HTML</li>
                        <li class="css">CSS</li>
                        <li class="js">JS</li>
                    </ul>
                </div>
                <ButtonGroup class="buttons">
                    <Button to="/games" class="outline primary">
                        View Full Game
                    </Button>
                </ButtonGroup>
            </div>
        </HomeCard>
        <HomeCard v-else title="Last Game Recap">
            <p>Please check back at a later time</p>
        </HomeCard>
    </div>
</template>

<script>
import { teams } from '@/utils/mixins';

import { getScoreByGameTeam, getPlayersByGameTeam } from '@/utils';
import HomeCard from '@/components/HomeCard';

export default {
    name: 'Recap',
    components: { HomeCard },
    mixins: [teams],
    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        currentTeams: null,
    }),

    mounted() {
        const { game, players } = this.game;
        this.currentTeams = this.teams(game, players);
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.content-container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(3, auto);
    row-gap: 5px;
    margin-bottom: 10px;
}

.header {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 1fr;
    justify-items: center;
    width: 100%;

    @include breakpoint(xs) {
        grid-template-columns: 1fr;
    }
}

.team {
    flex: 1 1 100%;

    @include breakpoint(xs) {
        display: none;
    }
}

.team-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-size: cover;
    background-color: $bg-color-2;

    &.blue {
        background-image: url('~assets/img/team-blue.png');
    }

    &.red {
        margin-left: auto;
        background-image: url('~assets/img/team-red.png');
    }
}

.score {
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    justify-content: center;
    text-transform: uppercase;
    line-height: 1.37;
}

.gamemode {
    width: 100%;
}

.points {
    font-size: 38px;
    letter-spacing: 1px;

    &:last-child:before {
        content: '-';
        padding: 0 0 0 10px;
    }

    @include breakpoint(md) {
        // font-size: 24px;
    }
    @include breakpoint(xs) {
        font-size: 36px;
    }
}

.matchup {
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    margin: auto auto 0;
    font-weight: $font-weight-semibold;

    @include breakpoint(sm) {
        padding: 0;
    }

    li {
        margin-top: $xs-space;
    }

    a {
        color: inherit;
    }
}

.players,
.pos {
    @extend %list-unstyled;
    font-size: $font-size-sm;
}

.players {
    flex: 1 1 100%;

    &.blue {
        text-align: left;
    }

    &.red {
        order: 1;
        text-align: right;
    }
}

.pos {
    text-align: center;

    &.html {
        color: $html-color;
    }
    &.css {
        color: $css-color;
    }
    &.js {
        color: $js-color;
    }
}

.buttons {
    margin-top: 10px;
}
</style>
