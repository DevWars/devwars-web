// ---------------------------------------------------------
// Methods
export function getScoreByGameTeam(game, team) {
    const teamScores = game.meta.teamScores[team.id];
    let teamScore = 0;
    if (teamScores) {
        for (const score of Object.values(teamScores)) {
            teamScore += score;
        }
    }

    return teamScore;
}

export function getPlayersByGameTeam(game, team) {
    return Object.values(game.players).filter(
        (player) => player.team === team.id
    );
}

export function getLanguageByGamePlayer(game, player) {
    const editors = game.editors;

    for (const editor of Object.values(editors)) {
        if (player.id === editor.player) {
            return editor.language;
        }
    }
}

export function teamCompletedObjective(teamIndex, objective) {
    const objectives = this.game.teams[teamIndex].objectives;

    for (const [key, value] of Object.entries(objectives)) {
        if (objective.id === Number(key) && value === 'complete') {
            return value;
        }
    }
}
