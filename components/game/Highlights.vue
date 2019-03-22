<template>
    <div class="home-highlights">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <NextShowing v-if="!active"/>
                    <NowShowing v-if="active"/>
                </div>
                <div class="col-lg-6">
                    <Recap v-if="game" :game="game"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Recap from '~/components/game/Recap';
import NowShowing from './NowShowing';
import NextShowing from './NextShowing';

export default {
    name: 'Highlights',
    components: { NextShowing, NowShowing, Recap },
    props: {
        game: {
            type: Object,
            required: true,
        },
    },
    computed: {
        upcoming() {
            return this.$store.state.game.upcoming;
        },
        active() {
            return this.$store.state.game.active;
        },
    },
};
</script>
