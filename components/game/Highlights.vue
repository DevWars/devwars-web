<template>
    <div class="home-highlights">
        <Container>
            <Row>
                <Column :lg="6">
                    <NowShowing v-if="active"/>
                    <NextShowing v-else-if="!active && upcoming.length > 0"/>
                    <HomeCard v-else class="no-showing" title="Next Showing">
                        <div>
                            <h3>No upcoming games</h3>
                            <p>Keep an eye on our schedule page or Discord for announcements.</p>

                            <Button
                                href="https://www.discord.gg/devwars"
                                target="_blank"
                                class="outline"
                            >Discord</Button>
                            <Button to="/schedule" class="primary">Full Schedule</Button>
                        </div>
                    </HomeCard>
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
import HomeCard from '@/components/HomeCard';
import NowShowing from './NowShowing';
import NextShowing from './NextShowing';

export default {
    name: 'Highlights',

    components: { NextShowing, NowShowing, Recap, HomeCard },

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


<style lang="scss" scoped>
.no-showing {
    h3 {
        margin: 30px 0 10px;
    }

    .Button {
        margin-top: 30px;
    }
}
</style>
