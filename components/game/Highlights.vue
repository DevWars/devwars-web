<template>
    <div class="home-highlights">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card card--home">
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
                                    <div class="next-showing__date">{{ nextGame.timestamp | moment('dddd, MMMM DD') }}
                                    </div>
                                    <div class="next-showing__time">{{ nextGame.timestamp | moment('H:mm')}} (UTC)</div>
                                </div>

                                <RegistrationButton :game="nextGame"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <Recap :game="latest"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import moment from 'moment';

    import RegistrationButton from '~/components/game/RegistrationButton';

    import {Prop} from 'vue-property-decorator';

    import Recap from '~/components/game/Recap';

    @Component({
        components: {Recap, RegistrationButton}
    })
    export default class Highlights extends Vue {
        @Prop() latest;
        @State(state => state.blog.latest) posts;
        @State(state => state.game.upcoming) upcoming;

        timeDifference = {};

        updateTime() {
            let diff = moment.utc(this.nextGame.timestamp).diff(moment());
            let units = ['days', 'hours', 'minutes', 'seconds'];

            let updated = {};

            units.forEach(unit => updated[unit] = moment.duration(diff)[unit]().toFixed(0));

            this.timeDifference = updated;
        }

        mounted() {
            this.updateTime();

            setInterval(this.updateTime.bind(this), 1000);
        }

        get nextGame() {
            return this.upcoming[0];
        }

        get altered() {
            if (process.server) return this.posts;

            return this.posts.map(post => {
                let el = document.createElement('div');
                el.innerHTML = post.text;
                let text = el.innerText;
                el.innerHTML = text;
                text = el.innerText;

                let cutoff = 100;

                text = text.substring(0, cutoff) + '...';

                return {
                    user: post.user,
                    text,
                    image_url: post.image_url
                };
            })
        }
    }
</script>

