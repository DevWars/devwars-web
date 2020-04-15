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
                    <Tag :class="[game.mode.toLowerCase()]" class="sm">
                        {{ game.mode }}
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
    async asyncData({ query, error, $axios }) {
        if (query.season == null || isNaN(Number(query.season)))
            query.season = 3;

        if (query.game == null || isNaN(Number(query.game)))
            query.game = undefined;

        try {
            const { data } = await $axios.get(
                `/games/season/${query.season}?first=10`,
            );

            const games = data.data;
            let viewing = null;

            if (query.game != null && games != null) {
                const view = games.filter((g) => g.id === Number(query.game));
                viewing = view[0];

                // If the given game that the user was sent too is not on the
                // first page of the season, load that game directly and shift
                // it to the top of the games list, making it shown in the
                // sidebar and highlighted (regardless of this the game would
                // still be shown in the large game overview)
                if (viewing == null) {
                    viewing = (await $axios.get(`/games/${query.game}`)).data;
                    games.unshift(viewing);
                }
            }

            return {
                games: data || {},
                viewing: viewing || data.data[0],
                season: Number(query.season),
            };
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
            seasons: [3, 2, 1],
            season: 3,
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
            if (isNil(this.games?.pagination?.after)) return false;
            return (
                this.games?.pagination?.after != null &&
                this.games?.data?.length >= 10
            );
        },

        /**
         * Returns true if we can page backward, ensuring that we are not the first
         * page.
         */
        canPagePreviousGames() {
            if (isNil(this.games?.pagination?.before)) return false;
            return this.games?.pagination?.before != null;
        },
    },

    watch: {
        '$route.query.season': {
            async handler(newSeason) {
                if (this.season === newSeason) return;

                const season = newSeason || 3;
                this.season = Number(season);

                const { data } = await this.$axios.get(
                    `/games/season/${this.season}?first=10`,
                );

                // if a route update is triggered, requiring the regathering of
                // the games, ensure to reset the page number. Otherwise paging
                // will be performed correctly but the indicated page number
                // will not be correct.
                this.games = data;
                this.page = 0;

                if (!this.$route.query.game) {
                    this.viewing = this.games.data[0];
                }
            },
        },

        '$route.query.game': {
            handler(newGame) {
                if (newGame && this.games && this.games.data) {
                    this.viewing = this.games.data.filter(
                        (game) => game.id === newGame,
                    )[0];
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
            const before = pagination.before.split('games')[1];

            const response = await this.$axios.get(`games${before}`);
            this.games = response.data;
        },

        /**
         * Execute a page forward.
         */
        async next() {
            this.page += 1;
            const { pagination } = this.games;
            const after = pagination.after.split('games')[1];

            const response = await this.$axios.get(`games${after}`);
            this.games = response.data;
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
        &.blitz {
            color: #f1c40f;
            border-color: #f1c40f;
        }
    }
}
</style>
