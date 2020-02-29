<template>
    <HomeCard v-if="latestSchedule" title="Next Showing">
        <div v-if="updateTimeInterval === null" class="now-showing">
            <div class="next-showing__time">Any Minute Now!</div>
        </div>

        <ul id="countdown" class="countdown">
            <li id="days" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.days }}</div>
                <div class="countdown__label">Days</div>
            </li>
            <li id="hours" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.hours }}</div>
                <div class="countdown__label">Hours</div>
            </li>
            <li id="minutes" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.minutes }}</div>
                <div class="countdown__label">Minutes</div>
            </li>
            <li id="seconds" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.seconds }}</div>
                <div class="countdown__label">Seconds</div>
            </li>
        </ul>
        <div class="next-showing">
            <div class="next-showing__date">
                {{ latestSchedule.startTime | moment('dddd, MMMM DD') }}
            </div>
            <div class="next-showing__time">
                {{ latestSchedule.startTime | moment('H:mm') }} (UTC)
            </div>
        </div>

        <div slot="actions">
            <RegistrationButtons :schedule="latestSchedule" />
        </div>
    </HomeCard>
</template>

<script>
import moment from 'moment';
import { sortBy, first } from 'lodash';
import HomeCard from '@/components/HomeCard';
import RegistrationButtons from '@/components/game/RegistrationButtons';

export default {
    name: 'NextShowing',
    components: { HomeCard, RegistrationButtons },
    data: () => {
        return {
            timeDifference: {},
            updateTimeInterval: null,
            units: ['days', 'hours', 'minutes', 'seconds'],
        };
    },
    computed: {
        upcoming() {
            return this.$store.state.game.upcoming;
        },
        latestSchedule() {
            if (this.upcoming.length === 0) {
                return false;
            }

            return first(
                sortBy(this.upcoming, (schedule) => schedule.startTime),
            );
        },
    },
    mounted() {
        this.updateTimeInterval = setInterval(this.updateTime.bind(this), 1000);
        this.updateTime();
    },
    methods: {
        resetTime() {
            clearInterval(this.updateTimeInterval);
            const updatedTimeDifference = {};

            this.units.forEach((value) => {
                updatedTimeDifference[value] = 0;
            });

            this.timeDifference = updatedTimeDifference;
            this.updateTimeInterval = null;
        },

        updateTime() {
            const delta = moment
                .utc(this.latestSchedule.startTime)
                .diff(moment());
            if (delta <= 0) {
                return this.resetTime();
            }

            const updatedTimeDifference = {};

            this.units.forEach((unit) => {
                const unitTime = moment.duration(delta)[unit]();
                updatedTimeDifference[unit] = unitTime.toFixed(0);
            });

            this.timeDifference = updatedTimeDifference;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.countdown {
    @extend %list-unstyled;
    display: flex;
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

.now-showing {
    width: 100%;
    margin-bottom: 0px;
    margin-top: -25px;
}

.next-showing {
    width: 100%;
    padding-top: 30px;
    margin-top: $s-space;
    border-top: $border-size solid $divider-color;
    line-height: 1.4;

    &__time {
        font-size: $h3-font-size;
    }
}
</style>
