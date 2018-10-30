export const team_completed_objective = (team, objective) => team.completedObjectives.some(it => it.id === objective.id);

export const team_for_game = (name, game) => {
    return game.teams.find(team => team.name === name);
};

const winner_for_game = (game) => {
    if (game.season < 3) {
        return winner_for_game_old(game);
    }

};

const winner_for_game_old = (game) => {

};

export const vote_analysis_for_team = (team, otherTeam) => {
    let points;
    let teamVotes = team.votes[this.vote] ? team.votes[this.vote].count : 0;
    let otherVotes = otherTeam.votes[this.vote] ? otherTeam.votes[this.vote].count : 0;
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

export const winning_team = (game) => {
    let analysis = {};

    analysis.red = this.analysisForTeam(team_for_game("red", this.game), team_for_game("blue", this.game));
    analysis.blue = this.analysisForTeam(team_for_game("blue", this.game), team_for_game("red", this.game));

    let redPoints = analysis.red.points;
    let bluePoints = analysis.blue.points;


}
