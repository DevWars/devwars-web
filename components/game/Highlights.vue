<template>
  <div class="home-highlights">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <!--<latest-game></latest-game>-->
        </div>
        <div class="col-lg-6">
          <div class="card card--home">
            <div class="card__inner">
              <h2 class="card__title">From The Blog</h2>
              <div class="card--home__contents home-blog">
                <ul class="home-blog__blogs">
                  <!--<li class="home-blog__blog" ng-repeat="post in home.posts">-->
                    <!--<div class="home-blog__thumb">-->
                      <!--<img ng-src="{{ post.image_url}}" alt="{{ post.title }}">-->
                    <!--</div>-->
                    <!--<div class="home-blog__text">-->
                      <!--<h3 class="home-blog__title">{{ post.title }}</h3>-->
                      <!--<span class="home-blog__meta">{{ post.timestamp | date: 'mediumDate' }} by {{ post.user.username }}</span>-->
                      <!--<p class="home-blog__desc">-->
                        <!--{{ post.text }}-->
                      <!--</p>-->
                    <!--</div>-->
                  <!--</li>-->
                </ul>
                <a href="/blog" class="btn btn-primary home-blog__btn">Read More Blogs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component
    export default class Highlights extends Vue {
    }
</script>

