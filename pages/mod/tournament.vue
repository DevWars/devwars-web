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

            <ButtonGroup class="modpanel__header-actions">
                <Button href="/mod/tournaments" class="outline muted">Back</Button>
                <Button
                    v-if="tournament.active && !tournament.done"
                    v-async-click="[endTournament]"
                    class="danger"
                >End</Button>
                <Button
                    v-show="!tournament.done && !tournament.active"
                    v-async-click="[activate]"
                    class="primary"
                >Activate</Button>
                <Button v-async-click="[save]" class="primary">Save</Button>
                <Button v-async-click="[remove]" class="danger">Delete</Button>
            </ButtonGroup>
        </div>

        <Tabs>
            <nuxt-link :to="'/mod/tournament/details?tournament=' + tournament.id">Details</nuxt-link>
        </Tabs>

        <nuxt/>
    </div>
</template>


<script>
import Http from '../../services/Http';
import Tabs from '~/components/Tabs';
import DeleteModal from '~/components/modal/DeleteModal';
import { names } from '../../utils/auth';

export default {
    name: 'DashboardTournament',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Tabs },

    computed: {
        tournament() {
            return this.$store.state.tournament.tournament;
        },
    },

    async fetch({ store, query }) {
        await store.dispatch('tournament/tournament', query.tournament);
    },

    methods: {
        async activate() {
            this.tournament.active = true;

            await this.save();
        },

        async endGame() {
            await Http.for(`/tournament/${this.tournament.id}/ended`).save();
        },

        async save() {
            const cloned = { ...this.tournament };

            delete cloned.objectives;
            delete cloned.teams;

            // Make sure the list doesn't include objectives with games
            const transformed = this.tournament.objectives.map((it) => ({
                ...it,
                tournament: null,
            }));

            // Save the objectives
            await Http.for(`/game/${this.tournament.id}/objective`).save(transformed);

            // Go ahead and save each team
            Object.values(this.tournament.teams).forEach(async (team) => {
                const cloned = { ...team };
                delete cloned.players;

                await Http.for('tournament/team').save(cloned);
            });

            // Last but not least, save the game
            // const game = await Http.for('tournament').save(cloned);

            // Can't forget to update our state with the new game
            this.$store.commit('tournament/tournament', this.tournament);
        },

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
                this.$store.dispatch('toast/error', 'Tournament could not be deleted.');
            }
        },
    },
};
</script>
