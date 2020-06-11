<template>
    <div v-if="currentGame != null" class="GameBrief">
        <Card v-if="currentTeams" class="roster plain dark bezeless">
            <GameTeam
                v-for="team in currentTeams"
                :key="team.id"
                :team="team"
                :points="team.scores.total"
                :winner="team.winner"
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

        <Applications :game="game" @assigned-player="playerAssigned" />
    </div>
</template>

<script>
import { defaults, size, isNil } from 'lodash';

import { names } from '../../../utils/auth';
import Card from '@/components/Card';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import Applications from '@/components/game/Applications';
import DeleteModal from '@/components/modal/DeleteModal';
import {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
} from '@/utils';
import { teams, usersFromGame } from '@/utils/mixins';

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
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        currentGame: {},
        defaultGame: {},
    }),

    computed: {
        currentTeams() {
            return this.teams(this.currentGame);
        },
    },

    watch: {
        game(newGame, oldGame) {
            this.currentGame = defaults(newGame, this.defaultGame);
        },
    },

    beforeMount() {
        this.currentGame = defaults(this.game, this.defaultGame);
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,

        playerAssigned({ player, user }) {
            if (isNil(this.currentGame.players)) this.currentGame.players = {};
            if (isNil(this.currentGame.editors)) this.currentGame.editors = {};

            this.currentGame.players[player.id] = {
                id: player.id,
                team: player.team,
                username: player.username,
                avatarUrl: user.avatarUrl,
                connections: user.connections,
            };

            this.currentGame.editors[size(this.currentGame.editors)] = {
                id: size(this.currentGame.editors),
                language: player.language,
                player: player.id,
                team: player.team,
            };

            this.$emit('update-game', this.currentGame);
        },

        async removePlayer(player) {
            const confirmed = await this.$open(DeleteModal, {
                title: 'Remove Player?',
                description:
                    'Are you sure you would like to remove this player?',
            });

            if (!confirmed) return;

            // Reset the id of the player back to its org for the delete. Since
            // the server will not handle the case for 0 since the root
            // directory would still be the org id.
            player.id = player.originalId || player.id;

            // Add languages to each player for Database
            for (const player of Object.values(this.currentGame.players)) {
                player.language = getLanguageByGamePlayer(
                    this.currentGame,
                    player,
                );
            }

            const res = await this.$axios.delete(
                `/games/${this.currentGame.id}/player`,
                {
                    data: { player },
                },
            );

            this.$emit('update-game', res.data);
        },
    },
};
</script>

<style lang="scss" scoped>
.GameBrief {
    .roster {
        display: flex;

        .GameTeam {
            flex: 1 1 100%;
        }
    }
}
</style>
