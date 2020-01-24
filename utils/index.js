import { isNil } from 'lodash'

// ---------------------------------------------------------
// Methods
export function getScoreByGameTeam(game, team) {
  if (isNil(game) || isNil(game.meta) || isNil(game.meta.teamScores)) {
    return 0
  }

  const teamScores = game.meta.teamScores[team.id]
  let teamScore = 0
  if (teamScores) {
    for (const score of Object.values(teamScores)) {
      teamScore += score
    }
  }

  return teamScore
}

export function getPlayersByGameTeam(game, team) {
  return Object.values(game.players).filter((player) => player.team === team.id)
}

export function getLanguageByGamePlayer(game, player) {
  const editors = game.editors
  const languages = []

  for (const editor of Object.values(editors)) {
    if (player.id === editor.player) {
      languages.push(editor.language)
    }
  }

  return languages
}

export function teamCompletedObjective(teamIndex, objective) {
  const objectives = this.game.teams[teamIndex].objectives
  if (!objectives) {
    return
  }

  for (const [key, value] of Object.entries(objectives)) {
    if (objective.id === Number(key) && value === 'complete') {
      return value
    }
  }
}
