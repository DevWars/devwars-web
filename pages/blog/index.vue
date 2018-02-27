<template>
    <div>
        <div class="ribbon ribbon-transparent"></div>
        <div class="container">
            <div class="row-lift">
                <div class="heading">
                    <h1>Blog</h1>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="blog-list">
                <div class="col-md-4" v-for="post in posts" :key="post.id">
                    <nuxt-link :to="'/blog/' + post.slug " class="blog-list__item">
                        <div class="blog-list__cover"
                             :style="{backgroundImage: 'url(' + (post.image_url) + ')'}"></div>
                        <div class="blog-list__main">
                            <h2 class="blog-list__title">{{ post.title }}</h2>
                            <div class="blog-list__meta">
                                By <span class="blog-list__author">{{ post.user.username }}</span> &bullet; Feb 2, 2018
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../../services/Http";

    @Component
    export default class Blog extends Vue {
        async asyncData() {
            return {posts: await Http.for('blog').get('all')}
        }
    }
</script>
