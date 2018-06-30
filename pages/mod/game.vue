<template>
    <div>
        <div class="modpanel__header">
            <div class="modpanel__header-main">
                <h1 class="modpanel__header-title">{{ game.timestamp | moment('mediumDate')}}</h1>
                <h2 class="modpanel__header-subtitle">
                    #{{ game.id }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    S{{ game.season}}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    {{ game.name }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span class="mod-status preparing">{{ game.active ? 'Active' : 'Preparing'}}</span>
                </h2>
            </div>

            <div class="modpanel__header-actions">
                <a href="/mod/games" class="btn btn-outline-gray">Back</a>
                <button
                    v-show="!game.done && !game.active" v-async-click="[activate]"
                    class="btn btn-primary"
                >
                    Activate
                </button>
                <button v-async-click="[save]" class="btn btn-primary">Save</button>
                <button async-click="mod.delete()" class="btn btn-secondary">Delete</button>
            </div>
        </div>

        <nav class="nav-tabs">
            <nuxt-link :to="'/mod/game/details?game=' + game.id" class="nav-tabs__item">Details</nuxt-link>
            <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="nav-tabs__item">Brief</nuxt-link>
        </nav>

        <nuxt />
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../../services/Http";

    @Component({
        components: {}
    })
    export default class DashboardGame extends Vue {
        @State(state => state.game.game) game;

        async activate() {
            this.game.active = true;

            await this.save();
        }

        async save() {
            let cloned = { ...this.game };

            delete cloned.objectives;
            delete cloned.teams;

            // Make sure the list doesn't include objectives with games
            const transformed = this.game.objectives.map(it => ({...it, game: null}));

            // Save the objectives
            await Http.for(`/game/${this.game.id}/objective`).save(transformed);

            // Go ahead and save each team
            Object.values(this.game.teams).forEach(async team => {
                let cloned = { ...team };
                delete cloned.players;

                await Http.for('game/team').save(cloned);
            });

            // Last but not least, save the game
            let game = await Http.for('game').save(cloned);

            // Can't forget to update our state with the new game
            this.$store.commit('game/game', game);
        }

        async fetch({ store, query }) {
            await store.dispatch('game/game', query.game);
        }
    }
</script>
