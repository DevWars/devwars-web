<template>
    <div v-if="game != null">
        <Card v-if="teamReport" class="roster plain dark bezeless">
            <GameTeam
                v-for="team in teamReport"
                :key="team.id"
                :team="team"
                :points="team.score"
                :winner="team.winner"
            >
                <Player
                    v-for="player in team.players"
                    :key="player.user.id"
                    :player="player"
                    :team="team"
                    :languages="player.assignedLanguages"
                    @click="removePlayer(player)"
                />
            </GameTeam>
        </Card>
        <Card v-else class="plain">
            <h4>No players</h4>
        </Card>

        <Applications
            :game="game"
            :players="players"
            @assigned-player="playerAssigned"
        />
    </div>
</template>

<script>
import { size, isNil } from 'lodash';
import { createTeamReport, usersFromGame } from '@/utils/mixins';
import { names } from '@/utils/auth';
import Card from '@/components/Card';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import Applications from '@/components/game/Applications';
import DeleteModal from '@/components/modal/DeleteModal';

export default {
    name: 'GameBrief',

    meta: { auth: names.MODERATOR },

    components: { Card, GameTeam, Player, Applications },

    mixins: [createTeamReport, usersFromGame],

    props: {
        players: {
            type: Array,
            required: false,
            default: () => [],
        },
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({}),

    computed: {
        teamReport() {
            return this.createTeamReport(this.game, this.players);
        },
    },

    methods: {
        playerAssigned({ player, user }) {
            if (isNil(this.game.players)) this.game.players = {};
            if (isNil(this.game.editors)) this.game.editors = {};

            this.game.players[player.id] = {
                id: player.id,
                team: player.team,
                username: player.username,
                avatarUrl: user.avatarUrl,
                connections: user.connections,
            };

            this.game.editors[size(this.game.editors)] = {
                id: size(this.game.editors),
                language: player.language,
                player: player.id,
                team: player.team,
            };

            this.$emit('update-game', this.game);
        },

        async removePlayer(player) {
            const confirmed = await this.$open(DeleteModal, {
                title: 'Remove Player?',
                description:
                    'Are you sure you would like to remove this player?',
            });

            if (!confirmed) return;

            const res = await this.$api.games.removePlayerFromGame(
                this.game.id,
                player.user.id,
            );

            this.$emit('update-game', res);
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
