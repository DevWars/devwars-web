<template>
    <div>
        <PanelHeader title="Games" showSearch>
            <button class="btn btn-primary btn-icon btn-sm" @click="createGame">
                <i class="fa fa-plus"></i>
                <span>Add Game</span>
            </button>
        </PanelHeader>

        <ListingFilters/>

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="game in all" :key="game.id">
                <td>{{ game.startTime | moment('MM/DD/YYYY') }}</td>
                <td>
                    <span
                        :class="['mod-status', nameFromStatus(game.status).toLowerCase()]"
                    >{{ nameFromStatus(game.status) }}</span>
                </td>
                <td>{{ game.theme }}</td>
                <td>{{ game.name }}</td>
                <td>
                    <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="btn-link">Edit</nuxt-link>
                </td>
            </tr>
        </Table>

        <Pagination/>
    </div>
</template>


<script>
import CreateGameModal from '~/components/modal/CreateGameModal';
import PanelHeader from '~/components/mod/PanelHeader';
import ListingFilters from '~/components/mod/ListingFilters';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';

import nameFromStatus from '../../utils/gameStatus';

export default {
    name: 'ModGames',
    components: { PanelHeader, ListingFilters, Table, Pagination },
    computed: {
        all() {
            return this.$store.state.game.all;
        },
    },
    async fetch({ store }) {
        await store.dispatch('game/all');
    },
    methods: {
        nameFromStatus,
        async createGame() {
            const [game] = await this.$open(CreateGameModal, {});

            if (!game) return;

            this.$router.push({
                path: `/mod/game/details`,
                params: { game: game.id },
            });
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.mod-status {
    font-weight: $font-weight-bold;

    &.scheduled {
        color: $info-color;
    }

    &.preparing {
        color: $warning-color;
    }

    &.live {
        color: $danger-color;
    }

    &.active,
    &.complete {
        color: $success-color;
    }

    &.ended {
        color: $text-color-muted;
    }
}
</style>
