<template>
    <div class="home-highlights">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <NextShowing v-if="active" />
                    <NowShowing v-if="!active"/>
                </div>
                <div class="col-lg-6">
                    <Recap v-if="latest" :game="latest" />
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
    import NowShowing from "./NowShowing";
    import NextShowing from "./NextShowing";

    @Component({
        components: {NextShowing, NowShowing, Recap, RegistrationButton}
    })
    export default class Highlights extends Vue {
        @Prop() latest;
        @State(state => state.blog.latest) posts;
        @State(state => state.game.upcoming) upcoming;
        @State(state => state.game.active) active;


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

