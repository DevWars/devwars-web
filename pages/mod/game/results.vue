<template>
  <div>
    <Card v-if="nameFromStatus(game.status) === 'ENDED'" class="plain dark">
      <Card v-if="teams" class="roster plain dark bezeless">
        <GameTeam v-for="team in teams" :key="team.id" :team="team">
          <Player
            v-for="player in playersWithUser(team.players)"
            :key="player.id"
            :user="player"
            :team="team"
            :languages="getLanguageByGamePlayer(game, player)"
            @click="removePlayer(player)"
          />
        </GameTeam>
      </Card>
      <Card v-else class="plain dark">
        <h4>No players</h4>
      </Card>

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
              />
              <span class="objectives__obj">{{ objective.description }}</span>
              <div
                class="objectives__square team-red"
                :class="{ active: teamCompletedObjective(1, objective) }"
              />
            </li>
          </ul>
        </SubScore>
      </Card>

      <Card class="plain dark">
        <VoteBox :show-override="true" :game="game" category="ui" />
        <VoteBox :show-override="true" :game="game" category="ux" />
      </Card>
    </Card>
    <div v-else>
      <h1>Game Not Ended</h1>
    </div>
  </div>
</template>

<script>
import { names } from '../../../utils/auth'

import nameFromStatus from '@/utils/gameStatus'
import Card from '@/components/Card'
import VoteBox from '@/components/game/VoteBox'
import GameTeam from '@/components/game/GameTeam'
import Player from '@/components/game/Player'
import DeleteModal from '@/components/modal/DeleteModal'
import { teams, usersFromGame } from '@/utils/mixins'
import {
  getScoreByGameTeam,
  getPlayersByGameTeam,
  getLanguageByGamePlayer,
  teamCompletedObjective
} from '@/utils'
import SubScore from '@/components/game/SubScore'

export default {
  name: 'GameBrief',

  meta: {
    auth: names.MODERATOR
  },

  components: { SubScore, Card, Player, GameTeam, VoteBox },

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

  methods: {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
    teamCompletedObjective,
    nameFromStatus,

    async removePlayer(player) {
      const confirmed = await this.$open(DeleteModal, {
        title: 'Remove Player?',
        description: `Are you sure you would like to remove this player?`
      })
      if (!confirmed) {
        return
      }

      // Add languages to each player for Database
      for (const player of Object.values(this.game.players)) {
        player.language = getLanguageByGamePlayer(this.game, player)
      }

      const res = await this.$axios.delete(`/games/${this.game.id}/player`, {
        data: { player }
      })

      this.$store.commit('game/game', res.data)
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
