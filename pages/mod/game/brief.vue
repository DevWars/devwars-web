<template>
    <div>
        <Card v-if="teams" class="roster plain dark bezeless">
            <GameTeam
                v-for="team in teams"
                :key="team.id"
                :team="team"
                :points="team.scores.total"
                :winner="teams.winner"
            >
                <Player
                    v-for="player in playersWithUser(team.players)"
                    :key="player.id"
                    :user="player"
                    :team="team"
                    :navigate="false"
                    :languages="getLanguageByGamePlayer(game, player)"
                    @click="removePlayer(player)"
                />
            </GameTeam>
        </Card>
        <Card v-else class="plain">
            <h4>No players</h4>
        </Card>

        <Applications :game="game" :assignments="assignments" />
    </div>
</template>

<script>
import { names } from '../../../utils/auth';
import Card from '@/components/Card';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import Applications from '@/components/game/Applications';
import DeleteModal from '@/components/modal/DeleteModal';
import { teams, usersFromGame } from '@/utils/mixins';
import {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
} from '@/utils';

export default {
    name: 'GameBrief',

    meta: { auth: names.MODERATOR },

    components: { Card, GameTeam, Player, Applications },
    mixins: [teams, usersFromGame],

    props: {
        includePlayers: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    async asyncData({ params, query, $axios }) {
        const { data } = await $axios.get(`games/${query.game}?players=true`);
        return { game: data };
    },

    data() {
        return {};
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,

        async removePlayer(player) {
            const confirmed = await this.$open(DeleteModal, {
                title: 'Remove Player?',
                description:
                    'Are you sure you would like to remove this player?',
            });

            if (!confirmed) return;

            // Reset the id of the player back to its org for the delete. Since the server will not handle
            // the case for 0 since the root directory would still be the org id.
            player.id = player.originalId || player.id;

            // Add languages to each player for Database
            for (const player of Object.values(this.game.players)) {
                player.language = getLanguageByGamePlayer(this.game, player);
            }

            const res = await this.$axios.delete(
                `/games/${this.game.id}/player`,
                {
                    data: { player },
                },
            );

            this.$store.commit('game/game', res.data);
        },
    },
};
</script>

<style lang="scss" scoped>
.roster {
    display: flex;

    .GameTeam {
        flex: 1 1 100%;
    }
}
</style>
