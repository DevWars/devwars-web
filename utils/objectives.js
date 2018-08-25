export const team_completed_objective = (team, objective) => team.completed_objectives.some(it => it.id === objective.id);
