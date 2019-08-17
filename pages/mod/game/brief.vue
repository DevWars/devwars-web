<template>
    <div>
        <Card v-if="teams" class="roster plain dark bezeless">
            <GameTeam v-for="team in teams" :key="team.id" :team="team">
                <Player
                    v-for="player in playersWithUser(team.players)"
                    :key="player.id"
                    :user="player"
                    :team="team"
                    :languages="getLanguageByGamePlayer(game, player)"
                    @click="removePlayer(player)"
                />
            </GameTeam>
        </Card>
        <Card v-else class="plain dark">
            <h4>No players</h4>
        </Card>

        <div class="application-controls">
            <h4>({{ applications.length }}) Applicants</h4>
            <Button class="outline primary" @click="addRegistrant">Add Registrant</Button>
        </div>

        <div class="Applications">
            <Table>
                <tr slot="head">
                    <th>Username</th>
                    <th>Games</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>HTML</th>
                    <th>CSS</th>
                    <th>JS</th>
                    <th>Devcoins</th>
                </tr>

                <tr
                    v-for="applicant in applications"
                    :key="applicant.id"
                    @click="addPlayer(applicant)"
                >
                    <td>
                        <User :user="applicant"/>
                    </td>
                    <td>{{ applicant.stats.game.wins + applicant.stats.game.loses }}</td>
                    <td>{{ applicant.stats.game.wins }}</td>
                    <td>{{ applicant.stats.game.loses }}</td>
                    <td>{{ applicant.profile.skills ? applicant.profile.skills.html : 0 }}</td>
                    <td>{{ applicant.profile.skills ? applicant.profile.skills.css : 0 }}</td>
                    <td>{{ applicant.profile.skills ? applicant.profile.skills.js : 0 }}</td>
                    <td>
                        <Devcoins :amount="applicant.stats.coins" class="xs"/>
                    </td>
                </tr>
            </Table>

            <Card v-if="!applications || applications.length === 0" class="dark plain">
                <p>No players have applied for this game</p>
            </Card>
        </div>
    </div>
</template>


<script>
import Card from '@/components/Card';
import Table from '@/components/Table';
import User from '@/components/user/User';
import Devcoins from '@/components/Devcoins';
import GameTeam from '@/components/game/GameTeam';
import Player from '@/components/game/Player';
import AddPlayerModal from '@/components/modal/AddPlayerModal';
import DeleteModal from '@/components/modal/DeleteModal';
import AddRegistrantModal from '@/components/modal/AddRegistrantModal';
import { teams, usersFromGame } from '@/utils/mixins';
import { getScoreByGameTeam, getPlayersByGameTeam, getLanguageByGamePlayer } from '@/utils';
import { names } from '../../../utils/auth';

export default {
    name: 'GameBrief',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Table, User, Devcoins, GameTeam, Player },

    mixins: [teams, usersFromGame],

    data() {
        return {
            applications: [],
        };
    },

    computed: {
        game() {
            const games = this.$store.state.game.game;
            return Array(games).find((game) => game.id === Number(this.$route.query.game));
        },

        // rating(user, lang) {
        //     if (!user.competitor) return 0;

        //     return user.competitor[`${lang}_rate`];
        // },
    },

    async asyncData({ $axios, route }) {
        const applications = (await $axios.get(`/applications/game/${route.query.game}`)).data;

        for (const applicant of applications) {
            // eslint-disable-next-line no-await-in-loop
            applicant.stats = (await $axios.get(`/users/${applicant.id}/stats`)).data;
            // eslint-disable-next-line no-await-in-loop
            applicant.profile = (await $axios.get(`/users/${applicant.id}/profile`)).data;
        }

        return { applications };
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,

        addPlayer(user) {
            this.$open(AddPlayerModal, { user, game: this.game });
        },

        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });

            await this.refresh();
        },

        async removePlayer(player) {
            const confirmed = await this.$open(DeleteModal, {
                title: 'Remove Player?',
                description: `Are you sure you would like to remove this player?`,
            });
            if (!confirmed) return;

            // Add languages to each player for Database
            for (const player of Object.values(this.game.players)) {
                player.language = getLanguageByGamePlayer(this.game, player);
            }

            const res = await this.$axios.delete(`/games/${this.game.id}/player`, {
                data: { player },
            });

            this.$store.commit('game/game', res.data);
        },
    },
};
</script>


<style lang="scss" scoped>
.roster {
    margin-bottom: 30px;

    /deep/ .inner {
        display: flex;
    }

    .GameTeam {
        flex: 1 1 100%;
    }
}

.status {
    margin: 10px 0 20px;
}

.application-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
}
</style>
