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
                <Button class="primary" :async-click="save">
                    Save
                </Button>
                <Button class="danger" :async-click="remove">
                    Delete
                </Button>
            </ButtonGroup>
        </PanelHeader>

        <Tabbed>
            <TabbedItem name="Brief" default>
                <GameBrief :game="game.game" @update-game="triggerGameUpdate" />
            </TabbedItem>
            <!-- <TabbedItem name="Details">
                <GameDetails :game="game.game" @update-game="triggerGameUpdate" />
            </TabbedItem>
            <TabbedItem name="Edit">
                <GameEdit :game="game.game" @update-game="triggerGameUpdate" />
            </TabbedItem> -->
        </Tabbed>
    </div>
</template>

<script>
import moment from 'moment';

import { names } from '../../utils/auth';

import Tabbed from '@/components/Tabbed';
import TabbedItem from '@/components/TabbedItem';

import PanelHeader from '@/components/mod/PanelHeader';
import DeleteModal from '@/components/modal/DeleteModal';

import GameBrief from '@/components/mod/game/GameBrief';
import GameDetails from '@/components/mod/game/GameDetails';
import GameEdit from '@/components/mod/game/GameEdit';

import nameFromStatus from '@/utils/gameStatus';

export default {
    name: 'DashboardGame',

    meta: {
        auth: names.MODERATOR,
    },

    components: {
        PanelHeader,
        Tabbed,
        TabbedItem,
        GameBrief,
        GameDetails,
        GameEdit,
    },

    async asyncData({ query, error, app: { $api } }) {
        if (query.game == null || query.game.trim() === '')
            return { game: null };

        try {
            const game = $api.games.getGame(query.game);
            const players = await $api.games.getAllAssignedPlayersToGame(
                query.game,
            );
            return { game, players };
        } catch (e) {
            error({
                statusCode: e.status,
                description: e.error,
                message: e.message,
            });
        }
    },

    computed: {
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

        triggerGameUpdate(updatedGame) {
            this.game = Object.assign({}, updatedGame);
        },

        async gatherGame(id) {
            const game = await this.$api.games.gatGame(id);
            const players = await this.$api.games.getAllAssignedPlayersToGame(
                id,
            );

            return { game, players };
        },

        async activate() {
            await this.$api.games.activateGame(this.game.id);
            this.game = await this.gatherGame(this.game.id);
        },

        async endGame() {
            await this.$api.games.endGame(this.game.id);
            this.game = await this.gatherGame(this.game.id);
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
                await this.$api.games.deleteGame(this.game.id);

                this.$store.dispatch('toast/success', 'Game deleted.');
                this.$router.push({ path: '/mod/games' });
            } catch (e) {
                this.$store.dispatch('toast/error', e);
            }
        },
    },
};
</script>
