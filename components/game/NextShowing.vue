<template>
    <HomeCard v-if="schedule" title="Next Showing">
        <ul id="countdown" class="countdown">
            <li id="days" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.days}}</div>
                <div class="countdown__label">Days</div>
            </li>
            <li id="hours" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.hours}}</div>
                <div class="countdown__label">Hours</div>
            </li>
            <li id="minutes" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.minutes}}</div>
                <div class="countdown__label">Minutes</div>
            </li>
            <li id="seconds" class="countdown__item">
                <div class="countdown__number">{{ timeDifference.seconds}}</div>
                <div class="countdown__label">Seconds</div>
            </li>
        </ul>
        <div class="next-showing">
            <div class="next-showing__date">{{ schedule.startTime | moment('dddd, MMMM DD') }}</div>
            <div class="next-showing__time">{{ schedule.startTime | moment('H:mm')}} (UTC)</div>
        </div>

        <div slot="actions">
            <RegistrationButton :schedule="schedule"/>
        </div>
    </HomeCard>
</template>


<script>
import moment from 'moment';
import { sortBy, first } from 'lodash';
import HomeCard from '@/components/HomeCard';
import RegistrationButton from '@/components/game/RegistrationButton';

export default {
    name: 'NextShowing',
    components: { HomeCard, RegistrationButton },
    data: () => {
        return {
            timeDifference: {},
        };
    },
    computed: {
        upcoming() {
            return this.$store.state.game.upcoming;
        },
        schedule() {
            return first(sortBy(this.upcoming, (game) => game.startTime));
        },
    },
    mounted() {
        this.updateTime();

        setInterval(this.updateTime.bind(this), 1000);
    },
    methods: {
        updateTime() {
            const diff = moment.utc(this.schedule.startTime).diff(moment());
            const units = ['days', 'hours', 'minutes', 'seconds'];

            const updated = {};

            units.forEach((unit) => {
                updated[unit] = moment
                    .duration(diff)
                    [unit]()
                    .toFixed(0);
            });

            this.timeDifference = updated;
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
