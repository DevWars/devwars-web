<template>
    <div>
        <PanelHeader
            :title="game.startTime | moment('mediumDate')"
            :subtitle="`${game.id} / ${game.season} / ${game.name}`"
        >
            <a href="/mod/games" class="btn btn-outline-gray">Back</a>
            <button
                v-async-click="[endGame]"
                class="btn btn-danger"
                v-if="game.active && !game.done"
            >End</button>
            <button
                v-show="!game.done && !game.active"
                v-async-click="[activate]"
                class="btn btn-primary"
            >Activate</button>
            <button v-async-click="[save]" class="btn btn-primary">Save</button>
            <button v-async-click="[remove]" class="btn btn-secondary">Delete</button>
        </PanelHeader>

        <nav class="nav-tabs">
            <nuxt-link :to="'/mod/game/details?game=' + game.id" class="nav-tabs__item">Details</nuxt-link>
            <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="nav-tabs__item">Brief</nuxt-link>
        </nav>

        <nuxt/>
    </div>
</template>


<script>
import Component, { State } from 'nuxt-class-component';
import Http from '../../services/Http';

import PanelHeader from '~/components/mod/PanelHeader';
import DeleteModal from '~/components/modal/DeleteModal';
import EndGameModal from '~/components/modal/EndGameModal';

import { name_from_status } from '../../utils/game-status';

@Component({
    components: { PanelHeader },
    methods: { name_from_status },
})
export default class DashboardGame extends Vue {
    @State((state) => state.game.game) game;

    async activate() {
        this.game.status = 2;

        await this.save();
    }

    async endGame() {
        await this.$open(EndGameModal, { game: this.game });
    }

    async save() {
        let cloned = { ...this.game };

        delete cloned.objectives;
        delete cloned.teams;

        // Make sure the list doesn't include objectives with games
        const transformed = this.game.objectives
            .map((it) => ({ ...it, game: null }))
            .filter((it) => it.description);

        await Http.for(`/game/${this.game.id}/objectives`).post(transformed);

        // Go ahead and save each team
        for (const team of Object.values(this.game.teams)) {
            let cloned = { ...team };
            delete cloned.players;

            await Http.for('game/team').save(cloned);
        }

        // Last but not least, save the game
        await Http.for('game').save(cloned);

        // Can't forget to update our state with the new game
        await this.$store.dispatch('game/game', this.game.id);
    }

    async remove() {
        const [confirmed] = await this.$open(DeleteModal, {
            title: 'Delete Game?',
            description: `Are you sure you want to delete this game?`,
        });

        if (!confirmed) return;

        try {
            await Http.for('game').delete(this.game);

            this.$store.dispatch('toast/success', 'Game deleted.');

            this.$router.push({ path: '/mod/games' });
        } catch (e) {
            this.$store.dispatch('toast/error', 'Game could not be deleted.');
        }
    }

    async fetch({ store, query }) {
        await store.dispatch('game/game', query.game);
    }
}
</script>
