<template>
    <div class="home-highlights">
        <Container>
            <Row>
                <Column :lg="6">
                    <NowShowing v-if="active" />
                    <HomeCard v-else title="More Content" class="support-us">
                        <div>
                            <h3>DevWars not live?</h3>
                            <p>
                                You can still watch recent recordings, check out past games, or hang out in our Discord community.
                            </p>

                            <div class="actions">
                                <Button
                                    href="https://www.discord.gg/devwars"
                                    target="_blank"
                                    class="outline"
                                >
                                    Join Discord
                                </Button>
                                <Button href="https://www.twitch.tv/devwars/videos" target="_blank" class="primary">
                                    Past Recordings
                                </Button>
                            </div>
                        </div>
                    </HomeCard>
                </Column>

                <Column :lg="6">
                    <Recap v-if="game" :game="game" />
                </Column>
            </Row>
        </Container>
    </div>
</template>

<script>
import NowShowing from './NowShowing';
import NextShowing from './NextShowing';
import Recap from '@/components/game/Recap';
import HomeCard from '@/components/HomeCard';

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
.support-us {
    h3 {
        margin-bottom: 10px;
    }

    .actions {
        margin-top: 30px;

        .Button:last-of-type {
            margin-left: 10px;
        }
    }

    /deep/ .content {
        padding-top: 15px;
        align-items: center;
    }
}
.no-showing {
    h3 {
        margin: 30px 0 10px;
    }

    .Button {
        margin-top: 30px;
    }
}
</style>
