<template>
    <div class="home-highlights">
        <Container>
            <Row>
                <Column :lg="6">
                    <NextShowing v-if="!active"/>
                    <NowShowing v-if="active"/>
                </Column>

                <Column :lg="6">
                    <Recap v-if="game" :game="game"/>
                </Column>
            </Row>
        </Container>
    </div>
</template>


<script>
import Recap from '@/components/game/Recap';
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
