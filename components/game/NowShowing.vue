<template>
    <HomeCard title="Live Now">
        <div slot="heading" class="live-now">
            <h2 class="live-now__title">Live Now</h2>
        </div>

        <div class="now-showing">
            <div class="embed-video">
                <iframe
                    :src="twitchUrl"
                    frameborder="0"
                    allowfullscreen="true"
                    scrolling="no"
                    theme="dark"
                    autoplay="true"
                    muted="true"
                />
            </div>
        </div>

        <ButtonGroup class="buttons">
            <Button
                href="https://www.twitch.tv/devwars"
                target="_blank"
                class="twitch"
            >
                Watch on Twitch
            </Button>
            <RegistrationButtons :game="game" />
        </ButtonGroup>
    </HomeCard>
</template>

<script>
import RegistrationButtons from './RegistrationButtons';
import HomeCard from '@/components/HomeCard';

export default {
    name: 'NowShowing',
    components: { HomeCard, RegistrationButtons },

    computed: {
        twitchUrl() {
            return `https://player.twitch.tv/?channel=devwars&parent=${this.extractHostname(
                process.env.baseUrl,
            )}`;
        },
        game() {
            return this.$store.state.game.active;
        },
    },

    methods: {
        extractHostname(url) {
            const hostname = url.includes('//')
                ? url.split('/')[2]
                : url.split('/')[0];

            return hostname.split(':')[0].split('?')[0];
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.now-showing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
}

.embed-video {
    @include aspect-ratio(16, 9);
    width: 100%;
    max-width: 350px;
    margin: 0 auto;

    @include breakpoint(xs) {
        width: 95%;
        max-width: inherit;
    }

    iframe {
        @extend .aspect;
    }
}

.ButtonGroup {
    display: flex;

    .Button {
        margin-right: 10px;
    }
}

/deep/ .Card .title {
    display: flex;
    align-items: center;

    &:before {
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: $xs-space;
        background-color: red;
    }
}

.buttons {
    margin-top: 10px;
}
</style>
