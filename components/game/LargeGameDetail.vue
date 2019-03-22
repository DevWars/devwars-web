<template>
    <div>
        <div class="banner row">
            <div class="banner__inner">
                <div class="banner__meta">
                    <span class="banner__date">{{ game.createdAt | moment('MM/DD/YYYY') }}</span>
                    <h2 class="banner__gamemode">{{ game.mode }}</h2>
                    <div class="banner__versus">{{ bluePlayers.length }} VS {{ redPlayers.length }}</div>
                </div>
                <a
                    v-show="game.videoUrl"
                    :href="game.videoUrl"
                    class="btn btn-icon btn-youtube"
                    target="_blank"
                >
                    <i class="fab fa-youtube"></i>
                    <span>Watch on YouTube</span>
                </a>
            </div>
        </div>

        <div class="roster row">
            <GameTeam
                v-for="team in game.teams"
                :key="team.id"
                :team="team"
                :points="teamScore(team.id)"
                :winner="game.meta.winningTeam === team.id"
            >
                <Player
                    v-if="users[player.id]"
                    v-for="player in getTeamPlayers(team.id)"
                    :key="player.id"
                    :user="users[player.id]"
                    :team="team"
                    :language="languageByPlayer(player)"
                />
            </GameTeam>
        </div>

        <SubScore v-if="game.title" title="Theme">
            <h3>{{ game.title }}</h3>
        </SubScore>

        <SubScore
            title="Objectives"
            :blueScore="blueObjectivesScore"
            :redScore="redObjectivesScore"
        >
            <ul class="objectives">
                <li
                    v-for="objective of Object.values(game.objectives)"
                    :key="objective.id"
                    class="objectives__item"
                    :class="{bonus: objective.isBonus }"
                >
                    <div
                        class="objectives__square team-blue"
                        :class="{active: teamCompletedObjective(0, objective) }"
                    ></div>
                    <span class="objectives__obj">{{ objective.description }}</span>
                    <div
                        class="objectives__square team-red"
                        :class="{active: teamCompletedObjective(1, objective) }"
                    ></div>
                </li>
            </ul>
        </SubScore>

        <VoteBox :game="game" category="ui"/>
        <VoteBox :game="game" category="ux"/>
    </div>
</template>


<script>
import Avatar from '~/components/user/User';
import VoteBox from '~/components/game/VoteBox';
import SubScore from '~/components/game/SubScore';
import GameTeam from '~/components/game/GameTeam';
import Player from '~/components/game/Player';

export default {
    name: 'LargeGameDetail',
    components: { GameTeam, Player, Avatar, SubScore, VoteBox },
    props: {
        game: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        users: {},
    }),
    computed: {
        bluePlayers() {
            return Object.values(this.game.players).filter(
                (player) => player.team === 0
            );
        },
        redPlayers() {
            return Object.values(this.game.players).filter(
                (player) => player.team === 1
            );
        },
        blueObjectivesScore() {
            return this.game.meta.teamScores[0].objectives;
        },
        redObjectivesScore() {
            return this.game.meta.teamScores[1].objectives;
        },
    },
    watch: {
        game() {
            this.getUsersFromGame();
        },
    },
    mounted() {
        this.getUsersFromGame();
    },
    methods: {
        async getUsersFromGame() {
            const players = Object.values(this.game.players);

            const fetchUser = async (id) => {
                const res = await this.$axios.get(`/users/${id}`);
                return res.data;
            };

            const users = await Promise.all(
                players.map((player) => fetchUser(player.id))
            );

            this.users = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});
        },
        getTeamPlayers(team) {
            return Object.values(this.game.players).filter(
                (player) => player.team === team
            );
        },
        teamScore(teamIndex) {
            const teamScores = this.game.meta.teamScores[teamIndex];
            let teamScore = 0;
            if (teamScores) {
                for (const score of Object.values(teamScores)) {
                    teamScore += score;
                }
            }

            return teamScore;
        },
        player(index, language) {
            const team = this.game.teams[index];
            return 'html';
        },
        teamCompletedObjective(teamIndex, objective) {
            const objectives = this.game.teams[teamIndex].objectives;

            for (const [key, value] of Object.entries(objectives)) {
                if (objective.id === Number(key) && value === 'complete') {
                    return value;
                }
            }
        },
        languageByPlayer(player) {
            const editors = this.game.editors;

            for (const editor of Object.values(editors)) {
                if (player.id === editor.player) {
                    return editor.language;
                }
            }
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.roster {
    display: flex;

    .GameTeam {
        flex: 1 1 auto;
    }
}

.banner {
    background-size: cover;
    padding: $m-space $s-space;

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__meta {
        line-height: 1;
    }

    &__date {
        display: block;
        margin-bottom: $xs-space;
    }

    &__gamemode,
    &__versus {
        @extend %align-middle;
        line-height: 1;
    }

    &__gamemode {
        font-size: $display5-size;

        &:after {
            @extend %align-middle;
            content: '';
            height: 2.5rem;
            width: 1px;
            background-color: $text-color-muted;
            margin: 0 $xs-space 0 $xxs-space;
        }
    }

    &__versus {
        font-size: $h4-font-size;
    }
}

.objectives {
    &__item {
        @extend %flex-justify;
        width: 100%;
        padding-bottom: $s-space;
        text-align: center;

        &.bonus {
            color: $bonus-color;
        }
    }

    &__square {
        width: 30px;
        height: 30px;
        border: 5px solid #23252c;

        &.team-blue.active {
            background-color: $brand-primary;
        }

        &.team-red.active {
            background-color: $brand-secondary;
        }
    }

    &__item.bonus &__square.active {
        background-color: $bonus-color;
    }
}
</style>
