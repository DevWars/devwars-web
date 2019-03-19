<template>
    <div class="home-highlights">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <NextShowing v-if="!active"/>
                    <NowShowing v-if="active"/>
                </div>
                <div class="col-lg-6">
                    <Recap v-if="latest" :game="latest"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import moment from 'moment';
import RegistrationButton from '~/components/game/RegistrationButton';
import Recap from '~/components/game/Recap';
import NowShowing from './NowShowing';
import NextShowing from './NextShowing';

export default {
    name: 'Highlights',
    components: { NextShowing, NowShowing, Recap, RegistrationButton },
    props: ['latest'],
    computed: {
        altered() {
            if (process.server) return this.posts;

            return this.posts.map((post) => {
                const el = document.createElement('div');
                el.innerHTML = post.text;
                let text = el.innerText;
                el.innerHTML = text;
                text = el.innerText;

                const cutoff = 100;

                text = `${text.substring(0, cutoff)  }...`;

                return {
                    user: post.user,
                    text,
                    image_url: post.image_url,
                };
            });
        },
        posts() {
            return this.$store.state.blog.lastest;
        },
        upcoming() {
            return this.$store.state.game.upcoming;
        },
        active() {
            return this.$store.state.game.active;
        },
    },
};
</script>
