<template>
    <div class="container-fluid">
        <div class="sidebar no-gutter col-sm-3">
            <nav class="nav-tabs nav-tabs-fluid">
                <nuxt-link
                    :to="'/games?season=' + current"
                    class="nav-tabs__item" v-for="current in seasons" :key="current"
                    :class="{active: season === current}"
                >
                    Season {{ current }}
                </nuxt-link>
            </nav>

            <div
                class="game" @click="view(game)" :key="game.id" v-for="game in games"
                :class="{active: viewing && viewing.id === game.id}"
            >
                <div class="game__meta">
                    <span class="game__mode" :class="[game.name.toLowerCase()]">{{ game.name }}</span>
                    <span class="game__date">
                        {{ game.timestamp | moment('MMM') }} {{ game.timestamp | moment('DD') }}, {{ game.timestamp | moment('YYYY') }}
                    </span>
                    <span class="game__theme">{{ game.theme }}</span>
                </div>
                <div class="game__icons">
                    <i v-show="game.youtube_url" class="game__youtube fab fa-youtube"></i>
                </div>
            </div>
        </div>

        <div class="view col-sm-9" >
            <LargeGameDetail :game="viewing" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Component from 'nuxt-class-component';
    import { Watch } from 'vue-property-decorator';

    import Http from '../services/Http';
    import LargeGameDetail from '../components/game/LargeGameDetail';

    @Component({
        components: { LargeGameDetail }
    })
    export default class Games extends Vue {
        seasons = [3, 2, 1];
        season = 3;

        games = [];

        viewing = null;

        @Watch('$route.query.season', { immediate: true })
        async seasonChange(newSeason) {
            this.season = parseInt(newSeason || "3");

            this.games = await Http.for('game/season').get(this.season);

            if(!this.$route.query.game) {
                this.viewing = await Http.for('game').get(this.games[0].id);
            }
        }

        @Watch('$route.query.game', { immediate: true })
        async gameChange(newGame) {
            if(newGame) {
                this.viewing = await Http.for('game').get(newGame);
            }
        }

        async view(game) {
            this.$router.push({ path: '/games', query: { game: game.id, season: game.season } })
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

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

    .nav-tabs button {
        border-top: none;
        border-bottom-style: solid;
    }
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
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;
    background-color: $bg-color-3;
    cursor: pointer;

    &:hover {
        background-color: $bg-color-2;
    }

    &.active {
        background-color: $bg-color-1;
    }

    &__date,
    &__mode {
        display: inline-block;
        vertical-align: bottom;
    }

    &__date {
        font-size: $font-size-sm;
        color: lightgray;
    }

    &__mode {
        padding: $xxxs-space $xxs-space;
        border: 1px solid $brand-primary;
        margin-right: $xxs-space;
        color: $brand-primary;
        font-size: $font-size-xs;
    }

    &__theme {
        display: block;
        margin-top: $xxs-space;
        font-size: 20px;

    }

    &__youtube {
        color: $youtube-color;
        font-size: 24px;
    }

    // Variationss
    @mixin game-item-variant($mode, $color) {
        &__mode.#{$mode}  {
            border-color: $color;
            color: $color;
        }
    }

    @include game-item-variant(classic, $brand-primary);
    @include game-item-variant(zen, $green-color);
    @include game-item-variant(coffee, $yellow-color);
}
</style>
