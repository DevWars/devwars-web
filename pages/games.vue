<template>
    <div class="container-fluid">
        <div class="games-sidebar no-gutter col-sm-3">
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
                class="game-item" @click="view(game)" :key="game.id" v-for="game in games"
                :class="{active: viewing && viewing.id === game.id}"
            >
                <div class="game-item__meta">
                    <span class="game-item__gamemode" :class="[game.name.toLowerCase()]">{{ game.name }}</span>
                    <span class="game-item__date">
                    {{ game.timestamp | moment('MMM') }} {{ game.timestamp | moment('DD') }}, {{ game.timestamp | moment('YYYY') }}
                </span>
                    <span class="game-item__theme">{{ game.theme }}</span>
                </div>
                <div class="game-item__icons">
                    <i v-show="game.youtube_url" class="game-item__youtube fab fa-youtube"></i>
                </div>
            </div>
        </div>

        <LargeGameDetail :game="viewing" />
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
            const season = parseInt(newSeason || "3");

            this.games = await Http.for('game/season').get(season);

            if(!this.$route.query.game) {
                await this.view(this.games[0]);
            }
        }

        @Watch('$route.query.game', { immediate: true })
        async gameChange(newGame) {
            if(newGame) {
                this.viewing = await Http.for('game').get(newGame);
            }
        }

        async view(game) {
            this.$router.push({ path: '/games', query: { game: game.id, season: this.season } })
        }
    }
</script>
