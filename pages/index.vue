<template>
    <div>
        <div class="hero">
            <div class="row">
                <div class="hero__inner">
                    <h1 class="hero__title">
                        A live
                        <strong>game show</strong> for developers
                    </h1>
                    <h2 class="hero__subtitle">Every other Saturday @ 5:00 PM (UTC)</h2>
                    <a
                        href="https://twitch.tv/devwars"
                        target="_blank"
                        class="btn btn-primary hero__btn"
                    >
                        Watch on
                        Twitch
                    </a>
                    <a href="/games" class="btn btn-link color-white hero__btn">View Past Games</a>
                </div>
            </div>
        </div>

        <Highlights :latest="latest"/>

        <div class="home-shows home-section">
            <div class="container">
                <h2 class="home-section__title">Upcoming Shows</h2>
                <ScheduleBlock :count="2"/>

                <div class="home-section__actions">
                    <a href="/schedule" class="btn btn-outline-white">View Full Schedule</a>
                </div>
            </div>
        </div>

        <div
            class="home-display"
            :style="{backgroundImage: 'url(' + require('~/assets/img/become-contestant-bg.jpg') + ')'}"
        >
            <div class="container">
                <div class="home-display__content">
                    <h3 class="home-display__title">Think you
                        <br>got what
                        <br>it takes?
                    </h3>
                    <nuxt-link
                        to="/competitor/register"
                        class="btn btn-outline-white btn-lg"
                    >Become a competitor</nuxt-link>
                </div>
            </div>
        </div>

        <div
            class="home-display reverse"
            :style="{backgroundImage: 'url(' + require('~/assets/img/devwars-docs-bg.jpg') + ')'}"
        >
            <div class="container">
                <div class="home-display__content">
                    <h3 class="home-display__title">Get familiar
                        <br>with DevWars
                        <br>knowledge base.
                    </h3>
                    <nuxt-link to="docs" class="btn btn-outline-white btn-lg">View Documentation</nuxt-link>
                </div>
            </div>
        </div>

        <div class="home-section">
            <div class="container">
                <h2 class="home-section__title">Honorable Mentions</h2>
                <p class="home-section__desc">
                    We are peaking the interests of well-known developers and
                    organizations
                </p>

                <div class="home-quotes row">
                    <div class="col-md-4">
                        <div class="quote-card card">
                            <div class="card__inner">
                                <img
                                    class="quote-card__avatar"
                                    src="~assets/img/companies/scotchio-square.jpg"
                                >
                                <p
                                    class="quote-card__desc"
                                >Need something to watch on a Saturday? Watch 2 teams of 3 battle it out in DevWars!</p>
                                <h6 class="quote-card__name">Scotch.io</h6>
                                <a
                                    href="https://twitter.com/scotch_io/"
                                    class="quote-card__username"
                                    target="_blank"
                                    rel="nofollow"
                                >@scotch_io</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="quote-card card">
                            <div class="card__inner">
                                <img
                                    class="quote-card__avatar"
                                    src="~assets/img/companies/devtips-square.png"
                                >
                                <p
                                    class="quote-card__desc"
                                >Have you guys seen @devwarstv ? Pretty novel stuff happening over there: devwars.tv</p>
                                <h6 class="quote-card__name">DevTips</h6>
                                <a
                                    href="https://twitter.com/DevTipsShow/"
                                    class="quote-card__username"
                                    target="_blank"
                                    rel="nofollow"
                                >@devtips</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-section">
            <div class="container">
                <h2 class="home-section__title">Our Supporters</h2>
                <p
                    class="home-section__desc"
                >A list of our awesome partners, supporters and past sponsors.</p>
                <div class="supporter-logos">
                    <a
                        href="https://www.twitch.tv/"
                        class="supporter-logos__item"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            class="supporter-logos__logo"
                            src="~assets/img/companies/twitch-white.png"
                        >
                    </a>
                    <a
                        href="https://www.discord.gg/"
                        class="supporter-logos__item"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            class="supporter-logos__logo"
                            src="~assets/img/companies/discord-white.png"
                        >
                    </a>
                    <a
                        href="https://www.microsoft.com/"
                        class="supporter-logos__item"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            class="supporter-logos__logo"
                            src="~assets/img/companies/microsoft-white.png"
                        >
                    </a>
                    <a
                        href="https://hiringsolved.com/blog/game-recruiting-game-gameshow/"
                        class="supporter-logos__item"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            class="supporter-logos__logo"
                            src="~assets/img/companies/hiringsolved-white.png"
                        >
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Http from '../services/Http';
import Highlights from '~/components/game/Highlights';
import ScheduleBlock from '~/components/game/ScheduleBlock';

export default {
    name: 'Index',
    components: {
        Highlights,
        ScheduleBlock,
    },
    async asyncData() {
        return {
            latest: await Http.for('schedules').get('latest'),
        };
    },
};
</script>


<style lang="scss" scoped>
@import '../assets/styles/utils';

$home-card-margin: $l-space;

.hero {
    height: 500px;
    background-image: url('~assets/img/hero-bg.jpg');
    background-size: cover;
    text-align: center;
    position: relative;

    @include breakpoint(sm) {
        height: auto;
    }

    &__inner {
        @extend %absolute-center-y;
        width: 100%;
        z-index: 1;
        margin-top: -($home-card-margin / 2);
        padding: 0 $grid-gutter-width;
        left: 0;

        @include breakpoint(sm) {
            @include clear-position;
            padding: $l-space $grid-gutter-width ($l-space + $home-card-margin);
            transform: none;
            margin-top: 0;
        }

        @include breakpoint(xs) {
            padding-top: $ms-space;
            padding-bottom: ($ms-space + $home-card-margin);
        }
    }

    &__title,
    &__subtitle {
        font-weight: 400;
        text-transform: none;
    }

    &__title {
        font-size: 42px;
        margin-bottom: $xs-space;

        @include breakpoint(sm) {
            font-size: $h1-font-size;
        }
    }

    &__subtitle {
        font-size: 24px;
        margin-bottom: $m-space;
        color: $text-color-secondary;
    }

    &__btn {
        margin: 0 $xs-space;

        @include breakpoint(sm) {
            width: auto;
            max-width: none;
        }
    }
}

.home-highlights {
    padding-bottom: $m-space;
    margin-top: -$home-card-margin;
    background-color: $bg-color-3;
}

.home-section {
    padding: $m-space 0;
    background-color: $bg-color-4;
    text-align: center;

    &__title {
        margin-bottom: $m-space;
        text-transform: uppercase;
    }

    &__desc {
        margin-bottom: $m-space;
        margin-top: -$grid-gutter-width;
        color: $text-color-secondary;
    }

    &__actions {
        margin-top: $grid-gutter-width;
    }

    & + & {
        border-top: $border-size solid $divider-color;
    }
}

.home-display {
    @extend %clear;
    padding: $ms-space 0;
    background-size: cover;
    background-position: top;

    &__title {
        max-width: 800px;
        margin-bottom: $grid-gutter-width;
        font-weight: $font-weight-bold;
        font-size: $display4-size;
        line-height: 1.2;
    }

    &.reverse &__content {
        float: right;
        text-align: right;
    }
}

.supporter-logos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @include breakpoint(sm) {
        flex-wrap: wrap;
    }

    &__item {
        padding: $grid-gutter-width;

        @include breakpoint(sm) {
            width: 50%;
        }

        @include breakpoint(xs) {
            padding: $grid-gutter-part;
        }
    }

    &__logo {
        max-height: 40px;
        opacity: 0.3;

        &:hover {
            opacity: 0.45;
        }
    }
}

.home-quotes {
    display: flex;
    justify-content: center;

    @include breakpoint(sm) {
        display: block;
    }
}

.quote-card {
    margin-top: $grid-gutter-width;

    &__avatar {
        width: 73px;
        height: 73px;
        border-radius: 50%;
        margin-top: -(73px / 2);
    }

    &__desc {
        margin-top: $grid-gutter-part;
    }

    &__name {
        margin-top: $grid-gutter-part;
        font-size: $h5-font-size;
    }
}
</style>
