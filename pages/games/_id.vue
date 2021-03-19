<template>
    <div class="GamesViewPage">
        <div class="header">
            <ButtonIcon
                icon="chevron-left"
                class="link white"
                :to="`/games?game=${game.id}&season=${game.season}`"
            >
                Game Details
            </ButtonIcon>

            <div class="score">
                <span class="blue">{{ teamReport[0].score }}</span>
                <span class="vs">VS</span>
                <span class="red">{{ teamReport[1].score }}</span>
            </div>

            <div class="headerActions">
                <Button class="link white" @click="handleViewObjectives">Objectives</Button>
            </div>
        </div>

        <div class="main">
            <GameProjectTeam
                v-for="(players, teamId) in teams"
                :key="teamId"
                :game="game"
                :players="players"
                :class="[teamClassMap[teamId], expandedClass(teamId)]"
                :team-id="Number(teamId)"
                :sources="sources"
                :expanded="expandedTeamId === Number(teamId)"
                @expandTeam="(teamId) => expandedTeamId = teamId"
            />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { createTeamReport } from '@/utils/mixins';
import GameProjectTeam from '@/components/game/GameProjectTeam';
import ViewObjectivesModal from '@/components/modal/ViewObjectivesModal';

export default {
    name: 'GamesViewPage',

    layout: 'header',

    components: { GameProjectTeam },

    mixins: [createTeamReport],

    async asyncData({ query, params, error, app: { $api }, store }) {
        try {
            if (Number(query.season) === 4) {
                const game = await store.dispatch('game/getNewGame', params.id);
                const players = await store.dispatch('game/getNewGamePlayers', params.id);
                const teams = _.groupBy(players, (p) => p.team);
                const sources = game.storage.raw.editors.map(editor => ({
                    createdAt: game.createdAt,
                    updatedAt: game.updatedAt,
                    id: editor.id,
                    file: editor.fileName,
                    team: editor.teamId - 1,
                    source: editor.fileText,
                }));

                return { game, players, teams, sources }
            }

            const game = await $api.games.getGame(params.id);
            const sources = await $api.games.getSourcesForGame(params.id);
            const players = await $api.games.getAllAssignedPlayersToGame(params.id);
            const teams = _.groupBy(players, (p) => p.team);

            return { game, players, teams, sources };
        } catch (e) {
            error({
                statusCode: e.status,
                description: e.error,
                message: e.message,
            });
        }
    },

    data: () => ({
        viewSite: false,
        expandedTeamId: null,
        teamClassMap: { 0: 'blue', 1: 'red' },
    }),

    computed: {
        teamReport() {
            return this.createTeamReport(this.game, this.players);
        },
    },

    methods: {
        expandedClass(teamId) {
            if (!this.teamClassMap[this.expandedTeamId]) return;

            return this.expandedTeamId === Number(teamId) ? 'expanded' : 'collapsed';
        },

        handleViewObjectives() {
            this.$open(ViewObjectivesModal, { game: this.game, players: this.players });
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.GamesViewPage {
    height: calc(100vh - #{$header-height});
    background-color: $bg-color-4;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
        background: $bg-color-3;
        position: relative;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 28px;
        pointer-events: none;

        .vs {
            margin: 0 10px;
            font-size: $font-size-base;
        }

        .blue {
            color: $brand-primary;
        }

        .red {
            color: $brand-secondary;
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .GameProjectTeam {
        &.collapsed {
            display: none;
        }
    }
}
</style>
