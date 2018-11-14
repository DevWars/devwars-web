<template>
    <div>
        <PageBanner title="Settings" />

        <div class="footer-offset">
            <div class="container">
                <div class="row">
                    <nav class="nav-tabs">
                        <nuxt-link to="profile" class="nav-tabs__item">Profile</nuxt-link>
                        <nuxt-link to="account" class="nav-tabs__item">Account</nuxt-link>
                        <nuxt-link to="connections" class="nav-tabs__item">Connections</nuxt-link>
                    </nav>

                    <div class="mod-card">
                        <nuxt/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import PageBanner from '~/components/layout/PageBanner';

    @Component({
        components: { PageBanner }
    })
    export default class Settings extends Vue {
    }
</script>
