<template>
    <div>
        <PanelHeader
            :title="game.startTime | moment('mediumDate')"
            :subtitle="`#${game.id} / S${game.season} / ${game.mode}`"
        >
            <a href="/mod/games" class="btn btn-outline-gray">Back</a>
            <button
                v-if="isActive && !isEnded && !isScheduled"
                v-async-click="[endGame]"
                class="btn btn-danger"
            >End</button>
            <button
                v-if="!isActive && !isEnded && isScheduled"
                v-async-click="[activate]"
                class="btn btn-primary"
            >Activate</button>
            <button v-if="viewingDetailsPage" v-async-click="[save]" class="btn btn-primary">Save</button>
            <button
                v-if="user.role === 'ADMIN'"
                v-async-click="[remove]"
                class="btn btn-secondary"
            >Delete</button>
        </PanelHeader>

        <Tabs>
            <nuxt-link :to="'/mod/game/details?game=' + game.id">Details</nuxt-link>
            <nuxt-link :to="'/mod/game/brief?game=' + game.id">Brief</nuxt-link>
        </Tabs>

        <nuxt/>
    </div>
</template>


<script>
import Http from '../../services/Http';
import Tabs from '~/components/Tabs';
import PanelHeader from '~/components/mod/PanelHeader';
import DeleteModal from '~/components/modal/DeleteModal';
import EndGameModal from '~/components/modal/EndGameModal';
import { roles } from '../../utils/auth';

import nameFromStatus from '~/utils/gameStatus';

export default {
    name: 'DashboardGame',

    meta: {
        auth: [roles.moderator, roles.admin],
    },

    components: { Tabs, PanelHeader },

    computed: {
        game() {
            return this.$store.state.game.game;
        },

        isActive() {
            return nameFromStatus(this.game.status) === 'ACTIVE';
        },

        isEnded() {
            return nameFromStatus(this.game.status) === 'ENDED';
        },

        isScheduled() {
            return nameFromStatus(this.game.status) === 'SCHEDULED';
        },

        viewingDetailsPage() {
            const currentPage = this.$route.path.split('/').pop();

            return currentPage === 'details';
        },

        user() {
            return this.$store.state.user.user;
        },
    },

    async fetch({ store, query }) {
        await store.dispatch('game/game', query.game);
    },

    methods: {
        nameFromStatus,

        async activate() {
            await this.$axios.post(`/games/${this.game.id}/activate`);
            await this.$store.dispatch('game/game', this.game.id);
        },

        async endGame() {
            await this.$open(EndGameModal, { game: this.game });
        },

        async save() {
            await this.$axios.patch(`/games/${this.game.id}`, this.game);
            await this.$store.dispatch('game/game', this.game.id);
        },

        async remove() {
            const [confirmed] = await this.$open(DeleteModal, {
                title: 'Delete Game?',
                description: `Are you sure you want to delete this game?`,
            });

            if (!confirmed) return;

            try {
                await Http.for('games').delete(this.game);

                this.$store.dispatch('toast/success', 'Game deleted.');

                this.$router.push({ path: '/mod/games' });
            } catch (e) {
                this.$store.dispatch('toast/error', 'Game could not be deleted.');
            }
        },
    },
};
</script>
