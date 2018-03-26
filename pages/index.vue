<template>
    <div>
        <div class="hero">
            <div class="row">
                <div class="hero__inner">
                    <h1 class="hero__title">A live <strong>game show</strong> for developers</h1>
                    <h2 class="hero__subtitle">Every other Saturday @ 5:00 PM (UTC)</h2>
                    <a href="https://twitch.tv/devwars" target="_blank" class="btn btn-primary hero__btn">Watch on
                        Twitch</a>
                    <a href="/games" class="btn btn-link color-white hero__btn">View Past Games</a>
                </div>
            </div>
        </div>

        <Highlights :latest="latest"/>

        <div class="home-shows home-section">
            <div class="container">
                <h2 class="home-section__title">Upcoming Shows</h2>
                <ScheduleBlock count="2"/>

                <div class="home-section__actions">
                    <a href="/schedule" class="btn btn-outline-white">View Full Schedule</a>
                </div>
            </div>
        </div>

        <!-- <div class="home-submissions">
            <div class="container">
                <div class="row">
                    <h2 class="home-submissions__title home-title">User Submissions</h2>
                    <div class="submission-reel">
                        <div class="submission-reel__entry">
                            <a href="#">
                                <img
                                    src="http://media.digitalcameraworld.com/wp-content/uploads/sites/123/2015/06/What_is_aspect_ratio_16-9.jpg">
                            </a>
                            <div class="submission-reel__meta">
                                <span class="submission-reel__user">
                                    <a href="#">SYNTAG</a>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-comment"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-user"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                            </div>
                        </div>
                        <div class="submission-reel__entry">
                            <a href="#">
                                <img
                                    src="http://media.digitalcameraworld.com/wp-content/uploads/sites/123/2015/06/What_is_aspect_ratio_16-9.jpg">
                            </a>
                            <div class="submission-reel__meta">
                                <span class="submission-reel__user">
                                    <a href="#">SYNTAG</a>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-comment"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-user"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                            </div>
                        </div>
                        <div class="submission-reel__entry submission-reel__entry--featured">
                            <a href="#">
                                <img
                                    src="http://media.digitalcameraworld.com/wp-content/uploads/sites/123/2015/06/What_is_aspect_ratio_16-9.jpg">
                            </a>
                            <div class="submission-reel__meta">
                                <span class="submission-reel__user">
                                    <a href="#">SYNTAG</a>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-comment"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-user"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                            </div>
                        </div>
                        <div class="submission-reel__entry">
                            <a href="#">
                                <img
                                    src="http://media.digitalcameraworld.com/wp-content/uploads/sites/123/2015/06/What_is_aspect_ratio_16-9.jpg">
                            </a>
                            <div class="submission-reel__meta">
                                <span class="submission-reel__user">
                                    <a href="#">SYNTAG</a>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-comment"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-user"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                            </div>
                        </div>
                        <div class="submission-reel__entry">
                            <a href="#">
                                <img
                                    src="http://media.digitalcameraworld.com/wp-content/uploads/sites/123/2015/06/What_is_aspect_ratio_16-9.jpg">
                            </a>
                            <div class="submission-reel__meta">
                                <span class="submission-reel__user">
                                    <a href="#">SYNTAG</a>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-comment"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                                <span class="submission-reel__stat-box">
                                    <i class="submission-reel__icon icon icon-user"></i>
                                    <span class="submission-reel__value">42</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="home-display"
             :style="{backgroundImage: 'url(' + require('~/assets/img/become-contestant-bg.jpg') + ')'}">
            <div class="container">
                <div class="home-display__content">
                    <h3 class="home-display__title">Think you<br>got what<br>it takes?</h3>
                    <nuxt-link to="/competitor/register" class="btn btn-outline-white btn-lg">Become a competitor
                    </nuxt-link>
                </div>
            </div>
        </div>

        <div class="home-display reverse"
             :style="{backgroundImage: 'url(' + require('~/assets/img/devwars-docs-bg.jpg') + ')'}">
            <div class="container">
                <div class="home-display__content">
                    <h3 class="home-display__title">Get familiar<br>with DevWars<br>knowledge base.</h3>
                    <nuxt-link to="docs" class="btn btn-outline-white btn-lg">View Documentation</nuxt-link>
                </div>
            </div>
        </div>

        <div class="home-section">
            <div class="container">
                <h2 class="home-section__title">Honorable Mentions</h2>
                <p class="home-section__desc">We are peaking the interests of well-known developers and organizations</p>

                <div class="home-quotes row">
                    <div class="col-md-4">
                        <div class="quote-card card">
                            <div class="card__inner">
                                <img class="quote-card__avatar" src="~/assets/img/companies/scotchio-square.jpg">
                                <p class="quote-card__desc">
                                    Need something to watch on a Saturday? Watch 2 teams of 3 battle it out in DevWars!
                                </p>
                                <h6 class="quote-card__name">Scotch.io</h6>
                                <a href="https://twitter.com/scotch_io/" class="quote-card__username" target="_blank" rel="nofollow">@scotch_io</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="quote-card card">
                            <div class="card__inner">
                                <img class="quote-card__avatar" src="~/assets/img/companies/devtips-square.png">
                                <p class="quote-card__desc">
                                    Have you guys seen @devwarstv ? Pretty novel stuff happening over there: devwars.tv
                                </p>
                                <h6 class="quote-card__name">DevTips</h6>
                                <a href="https://twitter.com/DevTipsShow/" class="quote-card__username" target="_blank" rel="nofollow">@devtips</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="home-section">
            <div class="container">
                <h2 class="home-section__title">Our Supporters</h2>
                <p class="home-section__desc">A list of our awesome partners, supporters and past sponsors.</p>
                <div class="supporter-logos">
                    <a href="https://www.twitch.tv/" class="supporter-logos__item" rel="nofollow" target="_blank">
                        <img class="supporter-logos__logo" src="~/assets/img/companies/twitch-white.png">
                    </a>
                    <a href="https://www.discord.gg/" class="supporter-logos__item" rel="nofollow" target="_blank">
                        <img class="supporter-logos__logo" src="~/assets/img/companies/discord-white.png">
                    </a>
                    <a href="https://www.microsoft.com/" class="supporter-logos__item" rel="nofollow" target="_blank">
                        <img class="supporter-logos__logo" src="~/assets/img/companies/microsoft-white.png">
                    </a>
                    <a href="https://hiringsolved.com/blog/game-recruiting-game-gameshow/" class="supporter-logos__item" rel="nofollow" target="_blank">
                        <img class="supporter-logos__logo" src="~/assets/img/companies/hiringsolved-white.png">
                    </a>
                </div>
            </div>
        </div>


        <div class="home-section">
            <div class="container">
                <h2 class="home-section__title">Latest Blogs</h2>
                <div class="blog-list">
                    <div class="col-md-4" v-for="post in posts" :key="post.id">
                        <BlogCard :post="post"/>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import Highlights from '~/components/game/Highlights';
    import ScheduleBlock from '~/components/game/ScheduleBlock';
    import BlogCard from '~/components/blog/BlogCard';
    import Http from "../services/Http";

    @Component({
        components: {Highlights, ScheduleBlock, BlogCard}
    })
    export default class Index extends Vue {
        @State(state => state.blog.latest) posts;

        async asyncData() {
            return {
                latest: await Http.for('game').get('latest'),
            }
        }

        async fetch({store}) {
            store.dispatch('blog/latest', 3);
        }
    }
</script>

