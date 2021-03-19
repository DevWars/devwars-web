import { defaultTo } from 'lodash';

export const voteAnalysisForTeam = (team, otherTeam, category, game) => {
    let points = 0;
    let blueVotes = 0;
    let redVotes = 0;

    blueVotes = defaultTo(team[category], 0);
    redVotes = defaultTo(otherTeam[category], 0);

    const total = blueVotes + redVotes;

    if (game.season === 4) {
        const { teamVoteResults } = game.storage.raw;
        const result = teamVoteResults.find(r => {
            const newCategory = category === 'ui' ? 'design' : (game.mode === 'zen' ? 'responsive' : 'function');
            return r.teamId - 1 === team.id && r.category === newCategory;
        });

        points = result?.score ?? 0;
    } else {
        if (defaultTo(blueVotes / total, 0) > 0.55) {
            points += 1;
        }
        if (defaultTo(blueVotes / total, 0) > 0.8) {
            points += 1;
        }
    }

    const percent = defaultTo((blueVotes / total) * 100, 0);
    const win = blueVotes > redVotes;

    return { points, win, percent: `${percent.toFixed(0)}%` };
};
