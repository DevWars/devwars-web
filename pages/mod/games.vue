<template>
    <div>
        <PanelHeader :model="search" title="Games" @input="input">
            <Input
                v-model="search"
                label="Search Users"
                @keyup.enter.native="performSearch"
            />
            <Button :disabled="!searched" @click="clearSearch">Clear</Button>
            <Button
                :disabled="searching || search == null"
                @click="performSearch"
            >
                Search
            </Button>
            <Button icon="plus" class="primary" @click="createGame">
                Add
            </Button>
        </PanelHeader>

        <ListingFilters
            :options="gamesFilterOptions"
            @change="onGameFilterChange"
        />

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Season</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="game in games.data" :key="game.id">
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
                    <Button :to="'/mod/game?game=' + game.id" class="link">
                        Edit
                    </Button>
                </td>
            </tr>
        </Table>

        <Pagination
            :page="page"
            :per-page="10"
            :can-next="canPageNextGames"
            :can-previous="canPagePreviousGames"
            @next="next"
            @previous="previous"
        />
    </div>
</template>

<script>
import { isNil } from 'lodash';
import { names } from '../../utils/auth';

import Input from '@/components/form/Input';
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
    components: { PanelHeader, ListingFilters, Table, Pagination, Input },

    async asyncData({ query, error, app: { $api } }) {
        try {
            const games = await $api.games.gamesWithPaging({ first: 10 });
            return { games, page: 0 };
        } catch (e) {
            error({
                statusCode: e.response.status,
                description: e.response.data.error,
                message: e.response.statusText,
            });
        }
    },

    data() {
        return {
            search: null,
            searched: false,
            searching: false,

            gameFilter: 'all',

            gamesFilterOptions: [
                { name: 'Show All', value: 'all' },
                { name: 'Scheduled', value: 'scheduled' },
                { name: 'Active', value: 'active' },
                { name: 'Ended', value: 'ended' },
            ],
        };
    },

    computed: {
        /**
         * Returns true if we can page forward in the games list, this ensures
         * we have the next page link and the next page will not be empty.
         */
        canPageNextGames() {
            if (isNil(this.games?.pagination?.next)) return false;
            return (
                this.games?.pagination?.next != null &&
                this.games?.data?.length >= 10
            );
        },

        /**
         * Returns true if we can page backward, ensuring that we are not the
         * first page.
         */
        canPagePreviousGames() {
            if (isNil(this.games?.pagination?.previous)) return false;
            return this.games?.pagination?.previous != null;
        },
    },
    methods: {
        nameFromStatus,
        async onGameFilterChange(e) {
            try {
                this.gameFilter = e;

                const status = e !== 'all' ? this.gameFilter : null;
                const games = await this.$api.games.gamesWithPaging({
                    first: 10,
                    status,
                });
                this.games = games;
                this.page = 0;
            } catch (error) {
                this.$store.dispatch('toast/error', e);
            }
        },

        input(searchText) {
            this.search = searchText;
        },

        async performSearch() {
            if (this.search == null || this.search.trim() === '') return;
            this.gameFilter = 'all';

            const games = await this.$api.search.searchForGames({
                title: this.search,
                full: true,
            });

            this.games = { data: games, pagination: {} };
            this.searched = true;
        },

        async clearSearch() {
            const games = await this.$api.games.gamesWithPaging({ first: 10 });
            this.games = games;
            this.searched = false;
            this.search = null;
            this.page = 0;
        },

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

        /**
         * Execute a page backward.
         */
        async previous() {
            this.page -= 1;
            const { pagination } = this.games;
            const before = pagination.previous;

            const status = this.gameFilter !== 'all' ? this.gameFilter : null;
            this.games = await this.$api.games.gamesWithPaging({
                first: 10,
                before,
                status,
            });
        },

        /**
         * Execute a page forward.
         */
        async next() {
            this.page += 1;
            const { pagination } = this.games;
            const after = pagination.next;

            const status = this.gameFilter !== 'all' ? this.gameFilter : null;
            this.games = await this.$api.games.gamesWithPaging({
                first: 10,
                after,
                status,
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
