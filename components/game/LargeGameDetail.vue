<template>
    <div>
        <div class="banner">
            <div class="banner__inner">
                <div class="banner__meta">
                    <span class="banner__date">{{
                        game.startTime | moment('M/DD/YYYY')
                    }}</span>
                    <h2 class="banner__gamemode">
                        {{ game.mode }}
                    </h2>
                    <div v-if="currentTeams != null" class="banner__versus">
                        {{ currentTeams[0].players.length }} VS
                        {{ currentTeams[1].players.length }}
                    </div>
                </div>
                <ButtonIcon
                    v-show="game.videoUrl"
                    :href="game.videoUrl"
                    target="_blank"
                    icon="brands/youtube"
                    class="youtube"
                >
                    Watch on YouTube
                </ButtonIcon>
            </div>
        </div>
        <div v-if="currentTeams != null" class="roster">
            <GameTeam
                v-for="team in currentTeams"
                :key="team.id"
                :team="team"
                :points="team.completedObjectives()"
                :winner="game.meta.winningTeam === team.id"
            >
                <Player
                    v-for="player in team.players"
                    :key="player.id"
                    :player="player"
                    :team="team"
                    :languages="[player.assignedLanguage]"
                />
            </GameTeam>
        </div>
        <SubScore v-if="game.title" title="Theme" no-score>
            <h3>{{ game.title }}</h3>
        </SubScore>

        <SubScore
            v-if="currentTeams != null"
            title="Objectives"
            :blue-score="currentTeams[0].completedObjectives()"
            :red-score="currentTeams[1].completedObjectives()"
        >
            <ul class="objectives">
                <li
                    v-for="objective in game.objectives"
                    :key="objective.id"
                    class="objectives__item"
                    :class="{ bonus: objective.isBonus }"
                >
                    <div
                        class="objectives__square team-blue"
                        :class="{
                            active:
                                currentTeams[0].objectives[objective.id] ===
                                'complete',
                        }"
                    />
                    <span class="objectives__obj">{{
                        objective.description
                    }}</span>
                    <div
                        class="objectives__square team-red"
                        :class="{
                            active:
                                currentTeams[1].objectives[objective.id] ===
                                'complete',
                        }"
                    />
                </li>
            </ul>
        </SubScore>

        <!-- <VoteBox :game="game" category="ui" />
        <VoteBox :game="game" category="ux" /> -->
    </div>
</template>

<script>
// import VoteBox from '@/components/game/VoteBox';
import SubScore from '@/components/game/SubScore';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import { getLanguageByGamePlayer, teamCompletedObjective } from '@/utils';
import { teams } from '@/utils/mixins';

export default {
    name: 'LargeGameDetail',
    components: { GameTeam, Player, SubScore },
    mixins: [teams],
    props: {
        game: {
            type: Object,
            required: true,
        },
        includePlayers: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    data: () => ({
        players: [],
        currentTeams: null,
    }),

    computed: {},

    watch: {
        game: {
            async handler(newVal, oldVal) {
                if (this.includePlayers) {
                    this.players = await this.$api.games.getAllAssignedPlayersToGame(
                        this.game.id,
                    );
                }

                this.currentTeams = this.teams(this.game, this.players);
            },
            immediate: true,
        },
    },

    async mounted() {},

    methods: {
        getLanguageByGamePlayer,
        teamCompletedObjective,
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.roster {
    display: flex;

    @include breakpoint(md) {
        display: inherit;
    }

    .GameTeam {
        flex: 1 1 100%;
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
            content: '';
            height: 2.5rem;
            width: 1px;
            background-color: $text-color-muted;
            margin: 0 $xs-space 0 $xxs-space;
        }
    }

    &__versus {
        font-size: $font-size-lg;
    }
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
        border: 5px solid #23252c;

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

.SubScore {
    border-top: 1px solid $divider-color;
    margin-top: 30px;
}
</style>
