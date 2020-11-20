<template>
    <DashboardCard class="GamesPlayed" title="Games Played" icon="dice">
        <Table v-if="playedGames.length">
            <tr slot="head">
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Title</th>
                <th></th>
            </tr>

            <tr v-for="game in playedGames" :key="game.id">
                <td>{{ game.startTime | moment('mediumDate') }}</td>
                <td>{{ game.startTime | moment('H:mm') }} UTC</td>
                <td>{{ durations[game.mode] || '30' }} minutes</td>
                <td>{{ game.title }}</td>
                <td>
                    <Button
                        class="outline muted sm"
                        :to="`/games?game=${game.id}&season=${game.season}`"
                    >
                        View
                    </Button>
                </td>
            </tr>
        </Table>

        <div v-else class="item">
            <div class="main">
                <Column :xs="15" class="no-gutter">
                    No games played by {{ user.username }} 😟
                </Column>
            </div>
        </div>
    </DashboardCard>
</template>

<script>
import GameDurations from '../../utils/gameDurations';
import DashboardCard from '@/components/DashboardCard';
import Table from '@/components/Table';

export default {
    name: 'GamesPlayed',

    components: { DashboardCard, Table },

    props: {
        user: { type: Object, required: true },
    },

    data: () => ({
        playedGames: [],
        durations: GameDurations,
    }),

    async mounted() {
        this.playedGames = await this.$api.users.getAllUsersPlayedGames(this.user.id);
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.GamesPlayed {
    .item {
        @extend %flex-justify;
        padding: $grid-gutter-width;
        border-bottom: 1px solid $divider-color;
    }

    .main {
        width: 100%;
        padding: $grid-gutter-width 0;
        text-align: center;
    }

    .Table /deep/ {
        thead,
        tr {
            display: table;
            width: 100%;
        }

        thead {
            th:last-of-type {
                text-align: right;
                padding-right: 45px;
            }
        }

        tbody {
            display: block;
            width: 100%;
            height: 300px;
            overflow-y: auto;

            td:first-of-type {
                font-weight: normal;
                max-width: 150px;
                padding-left: 20px;
            }

            td:last-of-type {
                text-align: right;
            }
        }

        th,
        td {
            width: 20%;
            padding-top: $grid-gutter-width;
            padding-bottom: $grid-gutter-width;
        }
    }
}
</style>
