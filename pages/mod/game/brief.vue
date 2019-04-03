<template>
    <div>
        <div class="roster mod-card card-bezeless">
            <GameTeam v-for="team in teams" :key="team.id" :team="team">
                <Player
                    v-for="player in playersWithUser(team.players)"
                    :key="player.id"
                    :user="player"
                    :team="team"
                    :language="getLanguageByGamePlayer(game, player)"
                    @click="removePlayer(player)"
                />
            </GameTeam>
        </div>

        <!-- <div class="mod-card">
            <div class="mod-card__header">
                <h4
                    class="modpanel__subtitle"
                    style="margin-bottom: 0"
                >({{ applications.length }}) Applicants</h4>
                <button class="btn btn-outline-primary" @click="addRegistrant">Add Registrant</button>
            </div>
        </div>-->

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
                <th>&nbsp;</th>
            </tr>

            <tr v-for="applicant in applications" :key="applicant.id">
                <td>
                    <User :user="applicant"/>
                </td>
                <td>{{ applicant.gameStats.wins + applicant.gameStats.loses }}</td>
                <td>{{ applicant.gameStats.wins }}</td>
                <td>{{ applicant.gameStats.loses }}</td>
                <td>{{ applicant.profile.skills.html }}</td>
                <td>{{ applicant.profile.skills.css }}</td>
                <td>{{ applicant.profile.skills.js }}</td>
                <td class="color-devcoins">{{ applicant.stats.coins }}</td>
                <td class="modpanel-table__actions">
                    <a href="#edit" class="btn-link btn-icon-reverse" @click="addPlayer(user)">
                        <span>Add Player</span>
                        <i class="fa fa-caret-down"></i>
                    </a>
                </td>
            </tr>
        </Table>
    </div>
</template>


<script>
import Table from '~/components/Table';
import Http from '../../../services/Http';
import GameTeam from '~/components/game/GameTeam';
import Player from '~/components/game/Player';
import User from '~/components/user/User';
import AddPlayerModal from '~/components/modal/AddPlayerModal';
import ConfirmModal from '~/components/modal/ConfirmModal';
import AddRegistrantModal from '~/components/modal/AddRegistrantModal';
import { teams, usersFromGame } from '~/utils/mixins';
import {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
} from '~/utils';
import { roles } from '../../../utils/auth';

export default {
    name: 'GameBrief',
    meta: {
        auth: [roles.moderator, roles.admin],
    },
    components: { Table, GameTeam, Player, User },
    mixins: [teams, usersFromGame],
    data() {
        return {
            applications: [],
        };
    },
    computed: {
        game() {
            return this.$store.state.game.game;
        },
        rating(user, lang) {
            if (!user.competitor) return 0;

            return user.competitor[`${lang}_rate`];
        },
    },
    async asyncData({ query }) {
        const applications = await Http.for(
            `/applications/${query.game}`
        ).get();

        for (const applicant of applications) {
            // eslint-disable-next-line no-await-in-loop
            applicant.stats = await Http.for(
                `/users/${applicant.id}/stats`
            ).get();
            // eslint-disable-next-line no-await-in-loop
            applicant.gameStats = await Http.for(
                `/users/${applicant.id}/stats/game`
            ).get();
            // eslint-disable-next-line no-await-in-loop
            applicant.profile = await Http.for(
                `/users/${applicant.id}/profile`
            ).get();
        }

        return { applications };
    },
    // mounted() {
    //     this.refresh();
    // },
    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,
        addPlayer(user) {
            this.$open(AddPlayerModal, { user, game: this.game });
        },
        // async refresh() {
        //     this.applications = await Http.for(`game/${this.game.id}`).get(
        //         'applications'
        //     );
        // },
        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });

            await this.refresh();
        },
        async removePlayer(player) {
            const confirmed = await this.$open(ConfirmModal, {
                description:
                    'Are you sure you would like to remove this player?',
            });
            if (!confirmed) return;

            await Http.for(`/game/players/${player.id}`).delete();

            // team.players.splice(team.players.indexOf(player), 1);
        },
    },
};
</script>


<style lang="scss" scoped>
.roster {
    display: flex;
    margin-bottom: 30px;

    .GameTeam {
        flex: 1 1 100%;
    }
}

.status {
    margin: 10px 0 20px;
}
</style>
