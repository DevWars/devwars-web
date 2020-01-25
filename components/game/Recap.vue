<template>
  <div>
    <HomeCard v-if="game" title="Last Game Recap">
      <div class="header">
        <div class="team">
          <div class="team-logo blue" />
        </div>
        <div class="score">
          <div class="gamemode">
            {{ game.mode }}
          </div>
          <div v-for="team in game.teams" :key="team.id" class="points">
            {{ getScoreByGameTeam(game, team) }}
          </div>
        </div>
        <div class="team">
          <div class="team-logo red" />
        </div>
      </div>

      <div class="matchup">
        <ul
          v-for="team in game.teams"
          :key="team.id"
          class="players"
          :class="{ blue: team.name === 'blue', red: team.name === 'red' }"
        >
          <li
            v-for="player in getPlayersByGameTeam(game, team)"
            :key="player.id"
          >
            {{ player.username }}
          </li>
        </ul>
        <ul class="pos">
          <li class="html">
            HTML
          </li>
          <li class="css">
            CSS
          </li>
          <li class="js">
            JS
          </li>
        </ul>
      </div>

      <ButtonGroup>
        <Button to="/games" class="outline primary">
          View Full Game
        </Button>
      </ButtonGroup>
    </HomeCard>
    <HomeCard v-else title="Last Game Recap">
      <p>Please check back at a later time</p>
    </HomeCard>
  </div>
</template>

<script>
import { getScoreByGameTeam, getPlayersByGameTeam } from '@/utils'
import HomeCard from '@/components/HomeCard'

export default {
  name: 'Recap',
  components: { HomeCard },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    getScoreByGameTeam,
    getPlayersByGameTeam
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.header {
  display: flex;
}

.team {
  flex: 1 1 100%;

  @include breakpoint(md) {
    width: 60px;
    height: 60px;
  }

  @include breakpoint(xs) {
    display: none;
  }
}

.team-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-size: cover;
  background-color: $bg-color-2;

  &.blue {
    background-image: url('~assets/img/team-blue.png');
  }

  &.red {
    margin-left: auto;
    background-image: url('~assets/img/team-red.png');
  }
}

.score {
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
  justify-content: center;
  text-transform: uppercase;
  line-height: 1.37;
}

.gamemode {
  width: 100%;
}

.points {
  font-size: 38px;
  letter-spacing: 1px;

  &:last-child:before {
    content: '-';
    padding: 0 0 0 10px;
  }

  @include breakpoint(md) {
    font-size: 24px;
  }
  @include breakpoint(xs) {
    font-size: $h1-font-size;
  }
}

.matchup {
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  margin: $s-space auto 0;
  font-weight: $font-weight-semibold;

  @include breakpoint(sm) {
    padding: 0;
  }

  li {
    margin-top: $xs-space;
  }
}

.players,
.pos {
  @extend %list-unstyled;
  font-size: $font-size-sm;
}

.players {
  flex: 1 1 100%;

  &.blue {
    text-align: left;
  }

  &.red {
    order: 1;
    text-align: right;
  }
}

.pos {
  text-align: center;

  &.html {
    color: $html-color;
  }
  &.css {
    color: $css-color;
  }
  &.js {
    color: $js-color;
  }
}
</style>
