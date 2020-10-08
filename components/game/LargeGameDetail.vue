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
                    <div v-if="teamReport != null" class="banner__versus">
                        {{ teamReport[0].players.length }} VS
                        {{ teamReport[1].players.length }}
                    </div>
                </div>

                <div class="banner__actions">
                    <ButtonIcon
                        v-show="game.videoUrl"
                        :href="game.videoUrl"
                        target="_blank"
                        icon="brands/youtube"
                        class="youtube"
                    >
                        Watch Game
                    </ButtonIcon>
                    <ButtonIcon
                        :to="`/games/${game.id}`"
                        icon="code"
                        class="outline"
                    >
                        View Code
                    </ButtonIcon>
                </div>
            </div>
        </div>
        <div v-if="teamReport != null" class="roster">
            <GameTeam
                v-for="team in teamReport"
                :key="team.id"
                :team="team"
                :points="team.score"
                :winner="game.meta.winningTeam === team.id"
            >
                <Player
                    v-for="player in team.players"
                    :key="player.id"
                    :player="player"
                    :team="team"
                    :languages="player.assignedLanguages"
                />
            </GameTeam>
        </div>

        <SubScore v-if="game.title" title="Theme" no-score>
            <h3>{{ game.title }}</h3>
        </SubScore>

        <ObjectivesList :game="game" :players="players" />

        <VoteBox :game="game" category="ui" />
        <VoteBox :game="game" category="ux" />
    </div>
</template>

<script>
import VoteBox from '@/components/game/VoteBox';
import SubScore from '@/components/game/SubScore';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import ObjectivesList from '@/components/game/ObjectivesList';
import { createTeamReport } from '@/utils/mixins';

export default {
    name: 'LargeGameDetail',

    components: { GameTeam, Player, SubScore, VoteBox, ObjectivesList },

    mixins: [createTeamReport],

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
        teamReport: null,
    }),

    watch: {
        game: {
            async handler(newVal, oldVal) {
                if (this.includePlayers) {
                    this.players = await this.$api.games.getAllAssignedPlayersToGame(
                        this.game.id,
                    );
                }

                this.teamReport = this.createTeamReport(this.game, this.players);
            },
            immediate: true,
        },
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

        @include breakpoint(sm) {
            flex-direction: column;
            text-align: center;
        }
    }

    &__meta {
        line-height: 1;

        @include breakpoint(sm) {
            margin-bottom: $grid-gutter-width;
        }
    }

    &__actions {
        .ButtonIcon + .ButtonIcon {
            margin-left: 10px;
        }
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

.SubScore {
    border-top: 1px solid $divider-color;
    margin-top: 30px;
}
</style>
