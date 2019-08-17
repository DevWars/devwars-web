// eslint-disable-next-line import/prefer-default-export
export const teams = {
    computed: {
        teams() {
            if (!this.game.teams) return null;

            return Object.values(this.game.teams).reduce((teams, team) => {
                const players = Object.values(this.game.players).reduce((players, player) => {
                    if (player.team === team.id) {
                        players[player.id] = player;
                    }
                    return players;
                }, {});

                let scores = {};
                let isWinner;
                if (this.game.meta && this.game.meta.teamScores) {
                    scores = {
                        total: Math.floor(Math.random() * 10),
                        objectives: this.game.meta.teamScores[team.id].objectives,
                    };

                    isWinner = this.game.meta.winningTeam === team.id;
                }

                teams[team.id] = {
                    ...team,
                    players,
                    numPlayers: Object.values(players).length,
                    scores,
                    isWinner,
                };

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
    mounted() {
        this.getUsersFromGame();
    },
    methods: {
        playersWithUser(players) {
            const result = [];
            for (const player of Object.values(players)) {
                const user = this.users[player.id];
                if (user) {
                    result.push({ ...user, ...player });
                }
            }

            return result;
        },

        async getUsersFromGame() {
            const players = Object.values(this.game.players);

            const fetchUser = async (id) => {
                const res = await this.$axios.get(`/users/${id}`);
                return res.data;
            };

            const users = await Promise.all(players.map((player) => fetchUser(player.id)));

            this.users = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});
        },
    },
};
