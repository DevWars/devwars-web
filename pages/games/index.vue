<template>
    <Container>
        <Column :sm="3" class="sidebar no-gutter">
            <LinkTabs class="fluid invert" :selected="season">
                <nuxt-link
                    v-for="current in seasons"
                    :key="current"
                    :to="'/games?season=' + current"
                >
                    Season {{ current }}
                </nuxt-link>
            </LinkTabs>

            <div
                v-for="game in games.data"
                :key="game.id"
                class="game"
                :class="{ active: viewing && viewing.id === game.id }"
                @click="view(game)"
            >
                <div class="meta">
                    <Tag :class="[game.mode.toLowerCase(), 'mode']" class="sm">
                        {{ game.mode === 'zen' ? 'Zen Garden' : game.mode }}
                    </Tag>
                    <span class="date">{{
                        game.startTime | moment('M/DD/YYYY')
                    }}</span>
                    <span class="theme">{{ game.title }}</span>
                </div>
                <div class="icons">
                    <Icon
                        v-show="game.videoUrl"
                        name="brands/youtube"
                        class="youtube"
                    />
                </div>
            </div>

            <Pagination
                v-if="canPageNextGames || canPagePreviousGames"
                :page="page"
                :per-page="10"
                :can-next="canPageNextGames"
                :can-previous="canPagePreviousGames"
                @next="next"
                @previous="previous"
            />
        </Column>

        <Column :sm="9" class="view">
            <LargeGameDetail
                v-if="viewing"
                :game="viewing"
                :include-players="includePlayers"
                :key="viewing.id"
            />
        </Column>
    </Container>
</template>

<script>
import { isNil } from 'lodash';

import Tag from '@/components/Tag';
import LinkTabs from '@/components/LinkTabs';
import LargeGameDetail from '@/components/game/LargeGameDetail';
import Pagination from '@/components/Pagination';

export default {
    name: 'Games',

    components: { LinkTabs, Tag, LargeGameDetail, Pagination },

    /**
     * On the server, process loading the games, this will be based on the query
     * for the season and the game. If no season is provided, then it will
     * default to season 3, otherwise if no game is provided, the first game is
     * selected.
     */

    async asyncData({ query, error, app: { $api }, store }) {
        if (query.season == null || isNaN(Number(query.season)))
            query.season = 4;

        if (query.game == null || isNaN(Number(query.game)))
            query.game = undefined;

        if (query.season == '4') {
            const data = await store.dispatch('game/getNewGames');
            return {
                games: { data } || {},
                viewing: data[0],
                season: Number(query.season),
            };
        }

        try {
            const { data, pagination } = await $api.games.gamesWithPaging({
                first: 25,
                status: 'ended',
                season: query.season,
            });

            const games = data;
            let viewing = null;

            // If the given game that the ser was sent too is not on the
            // first page of the season, load that game directly and shift
            // it to the top of the games list, making it shown in the
            // sidebar and highlighted (regardless of this the game would
            // still be shown in the large game overview)
            if (!isNil(query.game)) {
                const view = games.filter((g) => g.id === Number(query.game));
                const gameId = view[0] == null ? query.game : view[0].id;

                viewing = await $api.games.getGame(gameId);

                // if we did not find the game in our current list (wrong page)
                // shift it to the front of our list so the linked players get
                // to see the game.
                if (view[0] == null) data.unshift(viewing);
            } else if (!isNil(games[0])) {
                viewing = await $api.games.getGame(games[0].id);
            }

            return {
                games: { data, pagination } || {},
                viewing: viewing || games[0],
                season: Number(query.season),
            };
        } catch (e) {
            error({
                statusCode: e.status,
                description: e.error,
                message: e.message,
            });
        }
    },

    data() {
        return {
            seasons: [4, 3, 2, 1],
            season: 4,
            games: {},
            viewing: null,
            includePlayers: true,
            page: 0,
        };
    },

    computed: {
        /**
         * Returns true if any games have been loaded or not.
         */
        hasGames() {
            if (isNil(this.games?.data)) return false;
            return this.games.data.length > 0;
        },

        /**
         * Returns true if we can page forward in the games list, this ensures we have
         * the next page link and the next page will not be empty.
         */
        canPageNextGames() {
            if (isNil(this.games?.pagination?.next)) return false;
            return (
                this.games?.pagination?.next != null &&
                this.games?.data?.length >= 10
            );
        },

        /**
         * Returns true if we can page backward, ensuring that we are not the first
         * page.
         */
        canPagePreviousGames() {
            if (isNil(this.games?.pagination?.previous)) return false;
            return this.games?.pagination?.previous != null;
        },
    },

    watch: {
        '$route.query.season': {
            async handler(newSeason) {
                if (this.season === newSeason) return;

                const season = newSeason || 4;
                this.season = Number(season);

                let data = null;
                if (this.season === 4) {
                    const games = await this.$store.dispatch('game/getNewGames');
                    data = { data: games };
                } else {
                    data = await this.$api.games.gamesWithPaging({
                        first: 25,
                        status: 'ended',
                        season: this.season,
                    });
                }

                // if a route update is triggered, requiring the regathering of
                // the games, ensure to reset the page number. Otherwise paging
                // will be performed correctly but the indicated page number
                // will not be correct.
                this.games = data;
                this.page = 0;

                if (isNil(this.$route.query.game)) {
                    this.$router.push({
                        path: '/games',
                        query: {
                            game: this.$route.query.game,
                            season: this.season,
                        },
                    });
                }
            },
        },

        '$route.query.game': {
            async handler(newGameId) {
                if (
                    isNil(newGameId) ||
                    isNil(this.games) ||
                    isNil(this.games.data)
                )
                    return;

                // Due to a limitation of the database, its not easily or best
                // to perform cross joins on tables based on the jsonb data for
                // a game to join players. Even more so when its a object vs a
                // array, and thus to include actual avatar and user related
                // information, we must regather the game directly to ensure
                // players are loaded.
                // this.viewing = this.games.data.filter((game) => game.id === newGameId)[0];

                try {
                    if (this.$route.query.season == '4') {
                        this.viewing = await this.$store.dispatch('game/getNewGame', newGameId);
                    } else {
                        this.viewing = await this.$api.games.getGame(newGameId);
                    }
                } catch (e) {
                    this.$store.dispatch('toast/error', e);
                }
            },
        },
    },

    methods: {
        view(game) {
            this.$router.push({
                path: '/games',
                query: { game: game.id, season: game.season },
            });
        },

        /**
         * Execute a page backward.
         */
        async previous() {
            this.page -= 1;
            const { pagination } = this.games;
            const before = pagination.previous;

            const data = await this.$api.games.gamesWithPaging({
                first: 25,
                status: 'ended',
                season: this.season,
                before,
            });

            this.games = data;
        },

        /**
         * Execute a page forward.
         */
        async next() {
            this.page += 1;
            const { pagination } = this.games;
            const after = pagination.next;

            const data = await this.$api.games.gamesWithPaging({
                first: 25,
                status: 'ended',
                season: this.season,
                after,
            });

            this.games = data;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.sidebar,
.view {
    min-height: calc(100vh - #{$header-height});
    height: calc(100vh - #{$header-height});
    position: fixed;
    overflow-y: auto;
}

.sidebar {
    left: 0;
    background-color: $bg-color-3;
}

.view {
    padding-bottom: $l-space;
    background-color: $bg-color-4;
    right: 0;
}

.game {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $grid-gutter-width;
    border-bottom: 1px solid $divider-color;
    background-color: $bg-color-3;
    cursor: pointer;

    &:hover {
        background-color: $bg-color-2;
    }

    &.active {
        background-color: $bg-color-1;
    }

    .date,
    .mode {
        display: inline-block;
        vertical-align: bottom;
    }

    .mode {
        text-transform: capitalize;
    }

    .date {
        font-size: $font-size-sm;
        color: lightgray;
    }

    .theme {
        display: block;
        margin-top: $xxs-space;
        font-size: 20px;
    }

    .Icon.youtube {
        color: $youtube-color;
        font-size: 24px;
    }

    .Tag {
        margin-right: 5px;

        &.zen {
            color: $success-color;
            border-color: $success-color;
        }
        &.classic {
            color: $brand-primary;
            border-color: $brand-primary;
        }
        &.blitz, &.duel {
            color: #f1c40f;
            border-color: #f1c40f;
        }
    }
}
</style>
