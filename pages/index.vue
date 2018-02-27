<template>
  <div>
    <div class="hero">
      <div class="row">
        <div class="hero__inner">
          <h1 class="hero__title">A live <strong>gameshow</strong> for developers</h1>
          <h2 class="hero__subtitle">Every Saturday @ 5:30 PM (UTC)</h2>
          <a href="https://twitch.tv/devwars" target="_blank" class="btn btn-primary hero__btn">Watch on Twitch</a>
          <nuxt-link :to="'/games'" class="btn btn-link color-white hero__btn">View Past Games</nuxt-link>
        </div>
      </div>
    </div>

    <Highlights :latest="latest" :posts="posts"/>

    <div class="home-shows home-section">
      <div class="container">
        <h2 class="home-section__title">Upcoming Shows</h2>
        <ScheduleBlock :games="upcomingGames" count="2"/>

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

    <div class="home-display" :style="{backgroundImage: 'url(' + require('~/assets/img/become-contestant-bg.jpg') + ')'}">
      <div class="container">
        <div class="home-display__content">
          <h3 class="home-display__title">Think you<br>got what<br>it takes?</h3>
          <button ui-sref="competitorRegistration" class="btn btn-outline-white btn-lg">Become a competitor</button>
        </div>
      </div>
    </div>

    <div class="home-display reverse" :style="{backgroundImage: 'url(' + require('~/assets/img/devwars-docs-bg.jpg') + ')'}">
      <div class="container">
        <div class="home-display__content">
          <h3 class="home-display__title">Get familiar<br>with DevWars<br>knowledge base.</h3>
          <a ui-sref="docs" class="btn btn-outline-white btn-lg">View Documentation</a>
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
    import Http from "../services/Http";

    @Component({
      components: {Highlights, ScheduleBlock}
    })
    export default class Index extends Vue {
        @State(state => state.game.upcoming) upcomingGames;

        async asyncData() {
            return {
                latest: await Http.for('game').get('latest'),
                posts: await Http.for('blog').get('latest', {count: 2})
            }
        }
    }
</script>

