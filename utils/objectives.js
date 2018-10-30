export const team_completed_objective = (team, objective) => team.completedObjectives.some(it => it.id === objective.id);

export const team_for_game = (name, game) => {
    return game.teams.find(team => team.name === name);
};

export const points_for_team = (team, game) => {
    let points = 0;

    // Starter points based off objective count
    points += team.completedObjectives.length;

    // Aced it
    if (game.objectives.length === team.completedObjectives.length) {
        points++;
    }

    const otherTeam = game.teams.find(it => it !== team);

    for (const vote in team.votes) {
        if (game.season < 3) {
            points += vote_analysis_for_team(team, otherTeam, vote).points;
        } else {
            points += vote_analysis_for_team_old(team, otherTeam, vote).points;
        }
    }

    return points;
};

export const winner_for_game = (game) => {
    return game.teams.sort((a, b) => {
        const aPoints = points_for_team(a, game);
        const bPoints = points_for_team(b, game);

        return bPoints - aPoints;
    })[0];
};

export const vote_analysis_for_team = (team, otherTeam, label) => {
    let points;
    let teamVotes = team.votes[label] || 0;
    let otherVotes = otherTeam.votes[label] || 0;
    let total = teamVotes + otherVotes;

    if (teamVotes >= total * (2.0 / 3.0)) {
        points = 2;
    } else if (teamVotes >= total * (1.0 / 3.0)) {
        points = 1;
    } else {
        points = 0;
    }

    let percent = (teamVotes / total * 100).toFixed(0) + '%';
    let win = teamVotes > otherVotes;
    return { points, win, percent, votes: teamVotes };
};

export const vote_analysis_for_team_old = (team, otherTeam, label) => {
    let points;
    let teamVotes = team.votes[label] || 0;
    let otherVotes = otherTeam.votes[label] || 0;
    let total = teamVotes + otherVotes;

    if (teamVotes >= total * (2.0 / 3.0)) {
        points = 2;
    } else if (teamVotes >= total * (1.0 / 3.0)) {
        points = 1;
    } else {
        points = 0;
    }

    let percent = (teamVotes / total * 100).toFixed(0) + '%';
    let win = teamVotes > otherVotes;
    return { points, win, percent, votes: teamVotes };
};
