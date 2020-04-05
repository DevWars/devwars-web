<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/games" class="outline muted">Back</Button>
                <Button
                    v-if="isActive && !isEnded && !isScheduled"
                    class="danger"
                    :async-click="endGame"
                >
                    End
                </Button>
                <Button
                    v-if="!isActive"
                    class="primary"
                    :async-click="activate"
                >
                    Activate
                </Button>
                <Button
                    v-if="viewingDetailsPage || viewingEditPage"
                    class="primary"
                    :async-click="save"
                >
                    Save
                </Button>
                <Button
                    v-if="user.role === 'ADMIN'"
                    class="danger"
                    :async-click="remove"
                >
                    Delete
                </Button>
            </ButtonGroup>
        </PanelHeader>

        <LinkTabs>
            <nuxt-link :to="`/mod/game/brief?game=${game.id}`">Brief</nuxt-link>
            <nuxt-link :to="`/mod/game/details?game=${game.id}`">
                Details
            </nuxt-link>
            <nuxt-link :to="`/mod/game/edit?game=${game.id}`">Edit</nuxt-link>
        </LinkTabs>

        <nuxt />
    </div>
</template>

<script>
import moment from 'moment';
import { names } from '../../utils/auth';
import LinkTabs from '@/components/LinkTabs';
import PanelHeader from '@/components/mod/PanelHeader';
import DeleteModal from '@/components/modal/DeleteModal';

import nameFromStatus from '@/utils/gameStatus';

export default {
    name: 'DashboardGame',

    meta: {
        auth: names.MODERATOR,
    },

    components: { LinkTabs, PanelHeader },

    async fetch({ store, query }) {
        await store.dispatch('game/game', { id: query.game, players: true });
    },

    computed: {
        game() {
            const { game: id } = this.$route.query;
            return this.$store.getters['game/gameById'](id);
        },

        startDate() {
            return moment(this.game.startTime).format('MM/DD/YYYY');
        },

        startTime() {
            return moment(this.game.startTime).format('HH:mm');
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

        viewingEditPage() {
            const currentPage = this.$route.path.split('/').pop();
            return currentPage === 'edit';
        },

        user() {
            return this.$store.state.user.user;
        },
    },

    methods: {
        nameFromStatus,

        async activate() {
            await this.$axios.post(`/games/${this.game.id}/activate`);
            await this.$store.dispatch('game/game', { id: this.game.id });
        },

        async endGame() {
            await this.$axios.post(`/games/${this.game.id}/end`);
            await this.$store.dispatch('game/game', { id: this.game.id });
        },

        async save() {
            await this.$store.dispatch('game/sendPatch', this.game);
        },

        async remove() {
            const confirmed = await this.$open(DeleteModal, {
                title: 'Delete Game?',
                description: 'Are you sure you want to delete this game?',
            });

            if (!confirmed) return;

            try {
                await this.$axios.delete(`/games/${this.game.id}`);

                this.$store.dispatch('toast/success', 'Game deleted.');

                this.$router.push({ path: '/mod/games' });
            } catch (e) {
                this.$store.dispatch(
                    'toast/error',
                    'Game could not be deleted.',
                );
            }
        },
    },
};
</script>
