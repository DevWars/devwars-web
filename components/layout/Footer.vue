<template>
    <div class="footer">
        <div class="newsletter">
            <Container>
                <h2>
                    Receive our weekly challenge, and other DevWars updates!
                </h2>
                <Button
                    href="http://eepurl.com/bffR51"
                    target="_blank"
                    class="primary"
                >
                    Subscribe
                </Button>
            </Container>
        </div>

        <Container>
            <div class="sitemap">
                <ul>
                    <li>DEVWARS</li>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/games">Games</nuxt-link>
                    </li>
                    <!-- <li>
                        <nuxt-link to="/leaderboards">Leaderboards</nuxt-link>
                    </li>-->
                </ul>
                <ul>
                    <li>RESOURCES</li>
                    <li>
                        <nuxt-link to="/docs">Documentation</nuxt-link>
                    </li>
                    <li>
                        <a
                            href="https://www.discord.gg/devwars"
                            target="_blank"
                        >
                            Join Discord
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>COMPANY</li>
                    <li>
                        <nuxt-link to="/contact">Contact</nuxt-link>
                    </li>
                </ul>
                <ul>
                    <li>EXTRAS</li>
                    <li>
                        <a
                            href="https://www.twitchalerts.com/donate/devwars"
                            target="_blank"
                        >
                            Donate
                        </a>
                    </li>
                </ul>
            </div>

            <div class="bottom">
                <div class="socials">
                    <a v-for="(link, icon) in socials" :key="icon" :href="link" target="_blank">
                        <Icon :name="`brands/${icon}`" :class="icon" />
                    </a>
                </div>

                <div class="legal">
                    <span>
                        Copyright &copy; 2018-{{ currentYear }} DevWars, LLC
                    </span>
                    <span>All rights reserved</span>
                </div>
            </div>
        </Container>
    </div>
</template>

<script>
export default {
    name: 'ComponentFooter',

    data: () => ({
        socials: {
            twitch: 'http://www.twitch.tv/devwars',
            discord: 'https://www.discord.gg/devwars',
            youtube: 'https://www.youtube.com/c/DevWars',
            reddit: 'http://www.reddit.com/r/devwars',
            facebook: 'https://www.facebook.com/DevWars',
            twitter: 'https://twitter.com/devwarstv',
        },
    }),

    computed: {
        currentYear: () => new Date().getFullYear(),
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.footer {
    background-color: $bg-color-4;
}

.newsletter {
    padding: $m-space 0;
    border-top: $border-size solid $brand-secondary;
    background-color: $bg-color-3;
    text-align: center;

    h2 {
        margin-bottom: $m-space;
    }
}

.sitemap {
    display: flex;
    justify-content: space-between;
    padding: $m-space 0;

    @include breakpoint(xs) {
        display: block;
        text-align: center;
    }

    ul {
        @extend %list-unstyled;
        min-width: 15%;
        font-size: $font-size-base;

        @include breakpoint(sm) {
            margin-bottom: $m-space;
        }
    }

    li {
        margin-bottom: $xxs-space;

        &:first-of-type {
            border-bottom: $border-size solid $brand-secondary;
            padding-bottom: $xxs-space;
            margin-bottom: $xs-space;
            text-transform: uppercase;
        }
    }

    a {
        color: $text-color-secondary;

        &:hover {
            text-decoration: underline;
        }

        &.disabled {
            pointer-events: none;
            color: $text-color-muted;
        }
    }
}

.bottom {
    border-top: 1px solid $divider-color;
    padding-top: $s-space;
}

.socials {
    /* display: flex; */
    text-align: center;

    a {
        display: inline-block;
        padding: $grid-gutter-width;

        @include breakpoint(xs) {
            padding: $xs-space;
        }

        .Icon {
            font-size: $font-size-lg;
            color: $text-color-muted;
            transition: color 0.2s ease-in-out;

            &.facebook:hover { color: $facebook-color }
            &.twitter:hover { color: $twitter-color }
            &.reddit:hover { color: $reddit-color }
            &.twitch:hover { color: $twitch-color }
            &.discord:hover { color: $discord-color }
            &.youtube:hover { color: $youtube-color }
        }
    }
}

.legal {
    padding: 10px 0 30px;
    text-align: center;

    span {
        display: block;
        font-size: $font-size-sm;
        color: $text-color-muted;

        &:nth-child(2) {
            font-size: $font-size-xs;
        }
    }
}
</style>
