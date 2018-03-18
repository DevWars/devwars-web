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
                                        <div class="countdown__number">00</div>
                                        <div class="countdown__label">Days</div>
                                    </li>
                                    <li class="countdown__item" id="hours">
                                        <div class="countdown__number">00</div>
                                        <div class="countdown__label">Hours</div>
                                    </li>
                                    <li class="countdown__item" id="days">
                                        <div class="countdown__number">00</div>
                                        <div class="countdown__label">Minutes</div>
                                    </li>
                                    <li class="countdown__item" id="seconds">
                                        <div class="countdown__number">00</div>
                                        <div class="countdown__label">Seconds</div>
                                    </li>
                                </ul>
                                <div class="next-showing">
                                    <div class="next-showing__date">Saturday, March 31</div>
                                    <div class="next-showing__time">17:00 (UTC)</div>
                                </div>
                                <nuxt-link to="/competitor/register" class="btn btn-outline-primary">Register to play</nuxt-link>
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

    import {Prop} from 'vue-property-decorator';

    import Recap from '~/components/game/Recap';

    @Component({
        components: {Recap}
    })
    export default class Highlights extends Vue {
        @Prop() latest;
        @State(state => state.blog.latest) posts;

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

