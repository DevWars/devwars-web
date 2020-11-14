import * as _ from 'lodash';

export const createTeamReport = {
    methods: {
        createTeamReport(game, players = []) {
            const teams = {
                0: {
                    id: 0,
                    name: 'blue',
                    players: [],
                    objectives: {},
                    completedObjectives: 0,
                    score: 0,
                    bets: 0,
                    ui: 0,
                    ux: 0,
                },
                1: {
                    id: 1,
                    name: 'red',
                    players: [],
                    objectives: {},
                    completedObjectives: 0,
                    score: 0,
                    bets: 0,
                    ui: 0,
                    ux: 0,
                },
            };

            for (const player of players) {
                if (_.isNil(teams[player.team])) {
                    teams[player.team] = {
                        id: player.team,
                        name: player.team === 1 ? 'red' : 'blue',
                        players: [],
                    };
                }

                teams[player.team].players.push(player);
            }

            if (game.meta && game.meta.teamScores) {
                for (const teamScoreId in game.meta.teamScores) {
                    const { objectives, bets, ui, ux } = game.meta.teamScores[
                        teamScoreId
                    ];

                    const team = Object.assign(teams[teamScoreId], {
                        objectives: objectives || {},
                        bets: bets || 0,
                        ui: ui || 0,
                        ux: ux || 0,
                        score: 0,
                    });

                    team.completedObjectives = _.filter(
                        objectives,
                        (e) => e === 'complete',
                    ).length;

                    team.score = team.ui + team.ux + team.completedObjectives;
                }
            }

            return teams;
        },
    },
};

export const usersFromGame = {
    data: () => ({
        users: {},
    }),

    watch: {
        game() {
            this.getUsersFromGame();
        },
    },

    async mounted() {
        await this.getUsersFromGame();
    },
    methods: {
        playersWithUser(players) {
            const result = [];

            for (const player of Object.values(players)) {
                const user = this.users[player.originalId];
                if (!_.isNil(user)) result.push({ ...user, ...player });
            }

            return result;
        },

        async getUsersFromGame() {
            this.users =
                (this.includePlayers ? this.game.players : this.users) || [];

            if (Object.keys(this.users).length >= 1) return;

            const standardPlayers = _.filter(this.users, (value, key) => {
                return value.id !== 0;
            });

            const competitorPlayers = _.filter(this.users, (value, key) => {
                return value.id === 0;
            });

            const fetchUser = async (id) => {
                const res = await this.$api.users.getUser(id);
                return Object.assign({ originalId: id }, res.data);
            };

            const standardUsers = await Promise.all(
                standardPlayers.map((player) => fetchUser(player.id)),
            );

            this.users = standardUsers
                .concat(competitorPlayers)
                .reduce((acc, user) => {
                    acc[user.originalId] = user;
                    return acc;
                }, {});
        },
    },
};
