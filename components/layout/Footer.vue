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
                        <nuxt-link to="/">
                            Home
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/schedule">
                            Schedule
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/games">
                            Games
                        </nuxt-link>
                    </li>
                    <!-- <li>
                        <nuxt-link to="/leaderboards">Leaderboards</nuxt-link>
                    </li>-->
                </ul>
                <ul>
                    <li>RESOURCES</li>
                    <li>
                        <nuxt-link to="/docs">
                            Documentation
                        </nuxt-link>
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
                        <nuxt-link to="/contact">
                            Contact
                        </nuxt-link>
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
                <ul class="socials">
                    <li>
                        <a href="http://www.twitch.tv/devwars" target="_blank">
                            <i class="fab fa-twitch" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.discord.gg/devwars"
                            target="_blank"
                        >
                            <i class="fab fa-discord" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.youtube.com/c/DevWars"
                            target="_blank"
                        >
                            <i class="fab fa-youtube" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="http://www.reddit.com/r/devwars"
                            target="_blank"
                        >
                            <i class="fab fa-reddit" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.facebook.com/DevWars"
                            target="_blank"
                        >
                            <i class="fab fa-facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/devwarstv" target="_blank">
                            <i class="fab fa-twitter" />
                        </a>
                    </li>
                </ul>

                <div class="legal">
                    <span>Copyright &copy; 2018 DevWars, LLC</span>
                    <span>All rights reserved</span>
                </div>
            </div>
        </Container>
    </div>
</template>

<script>
export default {
    name: 'ComponentFooter',
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.footer {
    background-color: $bg-color-4;
}

.newsletter {
    padding: $m-space 0;
    border-top: $border-size-sm solid $brand-secondary;
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
            border-bottom: 1px solid $brand-secondary;
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
    @extend %list-unstyled;
    text-align: center;
    font-size: 0;

    li {
        display: inline-block;
    }

    a {
        display: inline-block;
        padding: $grid-gutter-width;
        font-size: $h4-font-size;
        color: $text-color-muted;
        transition: color 0.2s ease-in-out;

        @include breakpoint(xs) {
            padding: $xs-space;
        }

        // Variations
        @mixin social($icon, $color) {
            &:hover .fa-#{$icon} {
                color: $color;
            }
        }

        @include social(facebook, $facebook-color);
        @include social(twitter, $twitter-color);
        @include social(reddit, $reddit-color);
        @include social(twitch, $twitch-color);
        @include social(discord, $discord-color);
        @include social(youtube, $youtube-color);
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
