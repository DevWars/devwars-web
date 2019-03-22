export function getGameTeamScore(game, team) {
    const teamScores = game.meta.teamScores[team.id];
    let teamScore = 0;
    if (teamScores) {
        for (const score of Object.values(teamScores)) {
            teamScore += score;
        }
    }

    return teamScore;
}

export function getGameTeamPlayers(game, team) {
    return Object.values(game.players).filter(
        (player) => player.team === team.id
    );
}
