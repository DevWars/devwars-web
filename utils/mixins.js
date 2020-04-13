import * as _ from 'lodash';

export const teams = {
    methods: {
        teams(game) {
            if (_.isNil(game.teams)) {
                return;
            }

            return Object.values(game.teams).reduce((teams, team) => {
                const players = {};

                _.forEach(game.players, (player, key) => {
                    if (player.team === team.id) players[key] = player;
                    player.originalId = Number(key);
                });

                teams[team.id] = {
                    ...team,
                    players,
                    scores: { total: 0, objectives: 0 },
                    winner: false,
                    size: _.size(players),
                };

                if (game.meta && game.meta.teamScores) {
                    const t = teams[team.id];

                    t.scores.objectives =
                        game.meta.teamScores[team.id].objectives;
                    t.scores.tie = game.meta.teamScores[team.id].tie;
                    t.winner = game.meta.winningTeam === team.id;
                    t.scores.total = t.scores.objectives;
                }

                return teams;
            }, {});
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
                const res = await this.$axios.get(`/users/${id}`);
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
