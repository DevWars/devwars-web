<template>
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
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
        @Prop() post;
    }
</script>
