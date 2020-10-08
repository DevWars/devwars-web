import { isNil, reduce } from 'lodash';

export function getScoreByGameTeam(game, team) {
    if (isNil(game) || isNil(game.meta) || isNil(game.meta.teamScores)) {
        return 0;
    }

    const teamScores = game.meta.teamScores[team.id];
    return reduce(Object.values(teamScores), (acc, score) => (acc += score));
}
