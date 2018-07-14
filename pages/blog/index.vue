<template>
    <div>
        <div class="ribbon"></div>
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
                    <BlogCard :post="post"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../../services/Http";

    import BlogCard from '~/components/blog/BlogCard';

    @Component({
        components: {BlogCard}
    })
    export default class Blog extends Vue {
        async asyncData() {
            return {posts: await Http.for('blog').get('all')}
        }
    }
</script>
