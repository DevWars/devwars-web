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
                <span class="blue">0</span>
                <span class="vs">VS</span>
                <span class="red">0</span>
            </div>

            <div class="headerActions">
                <Button class="link white">Objectives</Button>
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
import GameProjectTeam from '@/components/game/GameProjectTeam';

export default {
    name: 'GamesViewPage',

    components: { GameProjectTeam },

    async asyncData({ params, error, app: { $api } }) {
        try {
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

    methods: {
        expandedClass(teamId) {
            if (!this.teamClassMap[this.expandedTeamId]) return;

            return this.expandedTeamId === Number(teamId) ? 'expanded' : 'collapsed';
        },
    },
};
</script>

<style lang="scss">
    #__layout > div {
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .footer {
        display: none;
    }
</style>

<style lang="scss" scoped>
@import 'utils.scss';

.GamesViewPage {
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
