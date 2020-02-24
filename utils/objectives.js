import { isNil, defaultTo } from 'lodash';

export const voteAnalysisForTeam = (team, otherTeam, category) => {
    let points = 0;
    let blueVotes = 0;
    let redVotes = 0;

    if (!isNil(team.votes)) {
        blueVotes = defaultTo(team.votes[category], 0);
        redVotes = defaultTo(otherTeam.votes[category], 0);
    }

    const total = blueVotes + redVotes;

    if (defaultTo(blueVotes / total, 0) > 0.55) {
        points += 1;
    }
    if (defaultTo(blueVotes / total, 0) > 0.8) {
        points += 1;
    }

    const percent = defaultTo((blueVotes / total) * 100, 0);
    const win = blueVotes > redVotes;
    return { points, win, percent: `${percent.toFixed(0)}%` };
};
