<template>
    <div>
        <div class="modpanel__header">
            <div class="modpanel__header-main">
                <h1 class="modpanel__header-title">{{ tournament.timestamp | moment('mediumDate')}}</h1>
                <h2 class="modpanel__header-subtitle">
                    #{{ tournament.id }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    S{{ tournament.season}}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    {{ tournament.name }}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span
                        class="mod-status preparing"
                    >{{ tournament.active ? 'Active' : 'Preparing'}}</span>
                </h2>
            </div>

            <div class="modpanel__header-actions">
                <a href="/mod/tournaments" class="btn btn-outline-gray">Back</a>
                <button
                    v-async-click="[endTournament]"
                    class="btn btn-danger"
                    v-if="tournament.active && !tournament.done"
                >End</button>
                <button
                    v-show="!tournament.done && !tournament.active"
                    v-async-click="[activate]"
                    class="btn btn-primary"
                >Activate</button>
                <button v-async-click="[save]" class="btn btn-primary">Save</button>
                <button v-async-click="[remove]" class="btn btn-secondary">Delete</button>
            </div>
        </div>

        <nav class="nav-tabs">
            <nuxt-link
                :to="'/mod/tournament/details?tournament=' + tournament.id"
                class="nav-tabs__item"
            >Details</nuxt-link>
        </nav>

        <nuxt/>
    </div>
</template>


<script>
import Component, { State } from 'nuxt-class-component';
import Http from '../../services/Http';

import DeleteModal from '~/components/modal/DeleteModal';

@Component({
    components: {},
})
export default class DashboardTournament extends Vue {
    @State((state) => state.tournament.tournament) tournament;

    async activate() {
        this.tournament.active = true;

        await this.save();
    }

    async endGame() {
        await Http.for(`/tournament/${this.tournament.id}/ended`).save();
    }

    async save() {
        let cloned = { ...this.tournament };

        delete cloned.objectives;
        delete cloned.teams;

        // Make sure the list doesn't include objectives with games
        const transformed = this.tournament.objectives.map((it) => ({
            ...it,
            tournament: null,
        }));

        // Save the objectives
        await Http.for(`/game/${this.tournament.id}/objective`).save(
            transformed
        );

        // Go ahead and save each team
        Object.values(this.tournament.teams).forEach(async (team) => {
            let cloned = { ...team };
            delete cloned.players;

            await Http.for('tournament/team').save(cloned);
        });

        // Last but not least, save the game
        let game = await Http.for('tournament').save(cloned);

        // Can't forget to update our state with the new game
        this.$store.commit('tournament/tournament', tournament);
    }

    async remove() {
        const [confirmed] = await this.$open(DeleteModal, {
            title: 'Delete Tournament?',
            description: `Are you sure you want to delete this tournament?`,
        });

        if (!confirmed) return;

        try {
            await Http.for('tournament').delete(this.tournament);

            this.$store.dispatch('toast/success', 'Tournament deleted.');

            this.$router.push({ path: '/mod/tournaments' });
        } catch (e) {
            this.$store.dispatch(
                'toast/error',
                'Tournament could not be deleted.'
            );
        }
    }

    async fetch({ store, query }) {
        await store.dispatch('tournament/tournament', query.tournament);
    }
}
</script>
