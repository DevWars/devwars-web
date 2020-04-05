<template>
    <Container class="fluid">
        <Column :sm="3" class="sidebar no-gutter">
            <LinkTabs class="fluid invert">
                <nuxt-link
                    v-for="current in seasons"
                    :key="current"
                    :to="'/games?season=' + current"
                >
                    Season {{ current }}
                </nuxt-link>
            </LinkTabs>

            <div
                v-for="game in games"
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
import LinkTabs from '../components/LinkTabs';
import Tag from '../components/Tag';
import LargeGameDetail from '../components/game/LargeGameDetail';
import nameFromStatus from '../utils/gameStatus';
export default {
    name: 'Games',

    components: { LinkTabs, Tag, LargeGameDetail },

    data() {
        return {
            seasons: [3, 2, 1],
            season: 3,
            games: [],
            viewing: null,
            includePlayers: true,
        };
    },

    watch: {
        '$route.query.season': {
            immediate: true,
            async handler(newSeason) {
                const season = Number(newSeason) || 3;
                this.season = season;

                const { data } = await this.$axios.get(
                    `/games/season/${this.season}`,
                );

                if (data.length > 0) {
                    this.games = data.filter(
                        (game) => nameFromStatus(game.status) !== 'ACTIVE',
                    );
                }
                if (!this.$route.query.game) {
                    const { data } = await this.$axios.get(
                        `/games/${this.games[0]}?players=${this.includePlayers}`,
                    );

                    this.viewing = data;
                }
            },
        },

        '$route.query.game': {
            immediate: true,
            async handler(newGame) {
                if (newGame) {
                    const { data } = await this.$axios.get(
                        `/games/${newGame}?players=${this.includePlayers}`,
                    );

                    this.viewing = data;
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
