<template>
    <div>
        <PageBanner title="Banner" />

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
    import Vue from 'vue';
    import Http from "../../services/Http";

    import PageBanner from '~/components/layout/PageBanner';
    import BlogCard from '~/components/blog/BlogCard';
    
    export default {
        name: "Blog",
        components: { PageBanner, BlogCard },
        async asyncData() {
            return {posts: await Http.for('blog').get('all')}
        }
    }
</script>
