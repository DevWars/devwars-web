<template>
    <div>
        <HomeCard v-if="game" title="Latest Game">
            <div class="content-container">
                <div class="header">
                    <div class="team">
                        <div class="team-logo blue" />
                    </div>
                    <div class="score">
                        <div class="gamemode">
                            {{ game.game.mode }}
                        </div>
                        <div
                            v-for="team in teamReport"
                            :key="team.id"
                            class="points"
                            :class="{
                                blue: team.name === 'blue',
                                red: team.name === 'red',
                            }"
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
                        v-for="team in teamReport"
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
                    <Button to="/games" class="outline">
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
import { createTeamReport } from '@/utils/mixins';
import HomeCard from '@/components/HomeCard';

export default {
    name: 'Recap',

    components: { HomeCard },

    mixins: [createTeamReport],

    props: {
        game: { type: Object, required: true },
    },

    data: () => ({
        teamReport: null,
    }),

    mounted() {
        const { game, players } = this.game;
        this.teamReport = this.createTeamReport(game, players);
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
        background-image: url('/img/team-blue.png');
    }

    &.red {
        margin-left: auto;
        background-image: url('/img/team-red.png');
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
        color: #fff;
    }

    &.blue {
        color: $brand-primary;
    }

    &.red {
        color: $brand-secondary;
    }

    @include breakpoint(xs) {
        font-size: 36px;
    }
}

.matchup {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: auto auto $grid-gutter-width;
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
        color: $brand-primary;
    }

    &.red {
        order: 1;
        text-align: right;
        color: $brand-secondary;
    }
}

.pos {
    text-align: center;

}

.buttons {
    margin-top: 10px;
}
</style>
