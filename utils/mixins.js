// eslint-disable-next-line import/prefer-default-export
export const teams = {
    computed: {
        teams() {
            return Object.values(this.game.teams).reduce((teams, team) => {
                const players = Object.values(this.game.players).reduce(
                    (players, player) => {
                        if (player.team === team.id) {
                            players[player.id] = player;
                        }
                        return players;
                    },
                    {}
                );

                teams[team.id] = {
                    ...team,
                    players,
                    numPlayers: Object.values(players).length,
                    scores: {
                        total: Math.floor(Math.random() * 10),
                        objectives: this.game.meta.teamScores[team.id]
                            .objectives,
                    },
                    isWinner: this.game.meta.winningTeam === team.id,
                };

                return teams;
            }, {});
        },
    },
};
