<template>
  <HomeCard v-if="game" title="Next Showing">
    <ul class="countdown" id="countdown">
      <li class="countdown__item" id="days">
        <div class="countdown__number">{{ timeDifference.days}}</div>
        <div class="countdown__label">Days</div>
      </li>
      <li class="countdown__item" id="hours">
        <div class="countdown__number">{{ timeDifference.hours}}</div>
        <div class="countdown__label">Hours</div>
      </li>
      <li class="countdown__item" id="minutes">
        <div class="countdown__number">{{ timeDifference.minutes}}</div>
        <div class="countdown__label">Minutes</div>
      </li>
      <li class="countdown__item" id="seconds">
        <div class="countdown__number">{{ timeDifference.seconds}}</div>
        <div class="countdown__label">Seconds</div>
      </li>
    </ul>
    <div class="next-showing">
      <div class="next-showing__date">{{ game.startTime | moment('dddd, MMMM DD') }}</div>
      <div class="next-showing__time">{{ game.startTime | moment('H:mm')}} (UTC)</div>
    </div>

    <div slot="actions">
      <RegistrationButton :game="game" />
    </div>
  </HomeCard>
</template>

<script>
import Component, { State } from 'nuxt-class-component';
import Vue from 'vue';
import moment from 'moment';
import { sortBy, first } from 'lodash';
import HomeCard from "@/components/HomeCard";
import RegistrationButton from "@/components/game/RegistrationButton";

@Component({
  components: { HomeCard, RegistrationButton }
})

export default class extends Vue {
  @State(state => state.game.upcoming) upcoming;

  timeDifference = {};

  updateTime() {
    let diff = moment.utc(this.game.startTime).diff(moment());
    let units = ['days', 'hours', 'minutes', 'seconds'];

    let updated = {};

    units.forEach(unit => updated[unit] = moment.duration(diff)[unit]().toFixed(0));

    this.timeDifference = updated;
  }

  mounted() {
    this.updateTime();

    setInterval(this.updateTime.bind(this), 1000);
  }

  get game() {
    return first(sortBy(this.upcoming, game => game.startTime));
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.countdown {
  @extend %list-unstyled;
  width: 100%;
  margin: 0 auto;
  font-weight: $font-weight-bold;
  color: #fff;
  overflow: hidden;

  &__item {
    display: inline-block;
    width: 25%;
    padding: 0;
    font-size: $h1-font-size;
    text-align: center;
  }

  &__label {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    text-transform: uppercase;
  }
}

.next-showing {
  width: 100%;
  padding-top: $grid-gutter-width;
  margin-top: $s-space;
  border-top: $border-size solid $divider-color;
  line-height: 1.4;

  &__time {
    font-size: $h3-font-size;
  }
}
</style>
