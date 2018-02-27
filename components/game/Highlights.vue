<template>
    <div class="home-highlights">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <Recap :game="latest"/>
                </div>
                <div class="col-lg-6">
                    <div class="card card--home">
                        <div class="card__inner">
                            <h2 class="card__title">From The Blog</h2>
                            <div class="card--home__contents home-blog">
                                <ul class="home-blog__blogs">
                                    <li class="home-blog__blog" v-for="post in altered" :key="post.id">
                                        <div class="home-blog__thumb">
                                            <img :src="post.image_url" :alt="post.title">
                                        </div>
                                        <div class="home-blog__text">
                                            <h3 class="home-blog__title">{{ post.title }}</h3>
                                            <span class="home-blog__meta">{{ post.created_at | moment('mediumDate') }} by {{ post.user.username }}</span>
                                            <p class="home-blog__desc"> {{ post.text }}</p>
                                        </div>
                                    </li>
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

    import {Prop} from 'vue-property-decorator';

    import Recap from '~/components/game/Recap';

    @Component({
        components: {Recap}
    })
    export default class Highlights extends Vue {
        @Prop() latest;
        @Prop() posts;

        get altered() {
            if(process.server) return this.posts;

            return this.posts.map(post => {
                let el = document.createElement('div');
                el.innerHTML = post.text;
                let text = el.innerText;
                el.innerHTML = text;
                text = el.innerText;

                let cutoff = 100;

                text = text.substring(0, cutoff) + '...';

                return {
                    user: post.user,
                    text
                };
            })
        }
    }
</script>

