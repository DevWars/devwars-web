<template>
  <div v-if="nameFromStatus(game.status) === 'ENDED'" class="plain dark">
    <Card class="plain dark">
      <SubScore
        title="Objectives"
        :blue-score="teams[0].scores.objectives"
        :red-score="teams[1].scores.objectives"
      >
        <ul class="objectives">
          <li
            v-for="objective in game.objectives"
            :key="objective.id"
            class="objectives__item"
            :class="{ bonus: objective.isBonus }"
          >
            <div
              class="objectives__square team-blue"
              :class="{ active: teamCompletedObjective(0, objective) }"
              @click="ToggleObjectiveState(0, objective)"
            />
            <span class="objectives__obj">{{ objective.description }}</span>
            <div
              class="objectives__square team-red"
              :class="{ active: teamCompletedObjective(1, objective) }"
              @click="ToggleObjectiveState(1, objective)"
            />
          </li>
        </ul>
      </SubScore>
    </Card>
  </div>
  <div v-else>
    <h1>Game Not Ended</h1>
  </div>
</template>

<script>
// META: WINNING TEAM, TEAM SCORES (UI, UX, Objective Count)
// TEAMS: Votes (matches meta team scores), objectives complete.
import * as _ from 'lodash'
import { names } from '../../../utils/auth'
import { teams, usersFromGame } from '@/utils/mixins'

import {
  getScoreByGameTeam,
  getPlayersByGameTeam,
  getLanguageByGamePlayer,
  teamCompletedObjective
} from '@/utils'

import SubScore from '@/components/game/SubScore'
import nameFromStatus from '@/utils/gameStatus'
import Card from '@/components/Card'

export default {
  name: 'GameBrief',

  meta: {
    auth: names.MODERATOR
  },

  components: { SubScore, Card },

  mixins: [teams, usersFromGame],

  props: {
    includePlayers: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    game() {
      const games = this.$store.state.game.game
      return Array(games).find(
        (game) => game.id === Number(this.$route.query.game)
      )
    }
  },

  mounted() {
    if (_.isNil(this.game.meta)) {
      this.game.meta = {
        winningTeam: null,
        teamScores: _.fill(Array(2), {
          objectives: 0,
          ui: 0,
          ux: 0,
          tie: 0
        })
      }
    }

    _.forEach(this.game.teams, (team) => {
      if (_.isNil(team.votes)) team.votes = { ui: 0, ux: 0, tie: 0 }
      if (_.isNil(team.objectives)) team.objectives = {}
    })

    this.$store.commit('game/game', Object.assign({}, this.game))
  },

  methods: {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
    teamCompletedObjective,
    nameFromStatus,

    ToggleObjectiveState(team, objective) {
      const specTeam = this.game.teams[team]

      if (_.isNil(specTeam.objectives)) specTeam.objectives = {}

      if (
        _.isNil(specTeam.objectives[objective.id]) ||
        specTeam.objectives[objective.id] === 'incomplete'
      ) {
        specTeam.objectives[objective.id] = 'complete'
      } else if (specTeam.objectives[objective.id] === 'complete') {
        specTeam.objectives[objective.id] = 'incomplete'
      }

      let total = 0
      _.forEach(specTeam.objectives, (obj) => {
        if (obj === 'complete') total += 1
      })

      this.game.meta.teamScores[team].objectives = total
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.roster {
  display: flex;

  .GameTeam {
    flex: 1 1 100%;
  }
}

.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.objectives {
  &__item {
    @extend %flex-justify;
    width: 100%;
    padding-bottom: $s-space;
    text-align: center;

    &.bonus {
      color: $bonus-color;
    }
  }

  &__square {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border: 5px solid #23252c;

    &.team-blue.active {
      background-color: $brand-primary;
    }

    &.team-red.active {
      background-color: $brand-secondary;
    }
  }

  &__item.bonus &__square.active {
    background-color: $bonus-color;
  }
}
</style>
