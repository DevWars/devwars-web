export const team_completed_objective = (team, objective) => team.completed_objectives.some(it => it.id === objective.id);

export const team_for_game = (name, game) => {
    return game.teams.find(team => team.name === name);
};
