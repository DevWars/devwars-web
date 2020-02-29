<template>
    <div>
        <PanelHeader title="Games" show-search>
            <ButtonIcon
                icon="fa fa-plus"
                class="primary sm"
                @click="createGame"
            >
                Add Game
            </ButtonIcon>
        </PanelHeader>

        <ListingFilters />

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Season</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="game in games" :key="game.id">
                <td>{{ game.createdAt | moment('MM/DD/YYYY') }}</td>
                <td>
                    <span
                        :class="[
                            'mod-status',
                            nameFromStatus(game.status).toLowerCase(),
                        ]"
                    >
                        {{ nameFromStatus(game.status) }}
                    </span>
                </td>
                <td>{{ game.season }}</td>
                <td>{{ game.title }}</td>
                <td>{{ game.mode }}</td>
                <td>
                    <Button
                        :to="'/mod/game/brief?game=' + game.id"
                        class="link"
                    >
                        Edit
                    </Button>
                </td>
            </tr>
        </Table>

        <Pagination />
    </div>
</template>

<script>
import { names } from '../../utils/auth';
import CreateGameModal from '@/components/modal/CreateGameModal';
import PanelHeader from '@/components/mod/PanelHeader';
import ListingFilters from '@/components/mod/ListingFilters';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

import nameFromStatus from '@/utils/gameStatus';

export default {
    name: 'ModGames',
    meta: {
        auth: names.MODERATOR,
    },
    components: { PanelHeader, ListingFilters, Table, Pagination },
    async fetch({ store }) {
        await store.dispatch('game/all');
    },
    computed: {
        games() {
            return this.$store.state.game.all;
        },
    },
    methods: {
        nameFromStatus,
        async createGame() {
            const [game] = await this.$open(CreateGameModal, {});

            if (!game) {
                return;
            }

            this.$router.push({
                path: '/mod/game/details',
                params: { game: game.id },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

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
