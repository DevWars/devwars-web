export const voteAnalysisForTeam = (team, otherTeam, category) => {
    let points = 0;
    let blueVotes = 0;
    let redVotes = 0;

    if (team.votes) {
        blueVotes = team.votes[category];
        redVotes = otherTeam.votes[category];
    }

    const total = blueVotes + redVotes;
    if (blueVotes / total > 0.55) {
        points += 1;
    }
    if (blueVotes / total > 0.8) {
        points += 1;
    }

    const percent = `${((blueVotes / total) * 100).toFixed(0)}%`;
    const win = blueVotes > redVotes;
    return { points, win, percent };
};

export const voteAnalysisForTeamOld = (team, otherTeam, label) => {
    let points = 0;
    const teamVotes = team.votes[label] || 0;
    const otherVotes = otherTeam.votes[label] || 0;
    const total = teamVotes + otherVotes;

    if (teamVotes >= total * (2.0 / 3.0)) {
        points = 2;
    } else if (teamVotes >= total * (1.0 / 3.0)) {
        points = 1;
    }

    const percent = `${((teamVotes / total) * 100).toFixed(0)}%`;
    const win = teamVotes > otherVotes;
    return { points, win, percent, votes: teamVotes };
};
