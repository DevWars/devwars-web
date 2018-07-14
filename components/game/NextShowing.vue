<template>
    <div v-if="game" class="card card--home">
        <div class="card__inner">
            <h2 class="card__title">Next Showing</h2>
            <div class="card--home__contents">
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
                    <div class="next-showing__date">{{ game.timestamp | moment('dddd, MMMM DD') }}
                    </div>
                    <div class="next-showing__time">{{ game.timestamp | moment('H:mm')}} (UTC)</div>
                </div>

                <div class="card--home__actions">
                    <RegistrationButton :game="game" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';
    import moment from 'moment';
    import { sortBy, first } from 'lodash';
    import RegistrationButton from "./RegistrationButton";

    @Component({
        components: { RegistrationButton }
    })
    export default class extends Vue {
        @State(state => state.game.upcoming) upcoming;

        timeDifference = {};

        updateTime() {
            let diff = moment.utc(this.game.timestamp).diff(moment());
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
            return first(sortBy(this.upcoming, game => game.timestamp));
        }

    }
</script>
