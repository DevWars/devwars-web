<template>
    <a v-if="!hasDiscord" :href="discordUrl" class="btn btn-discord btn-icon" target="_blank">
        <i class="fab fa-discord"></i>
        <span>Connect Discord</span>
    </a>
    <a v-else class="btn btn-outline-success btn-icon" v-async-click="[removeProvider, 'DISCORD']">
        <i class="fa fa-check"></i>
        <span>Discord Connected</span>
    </a>
</template>

<script>
    import Component, { State, Action } from 'nuxt-class-component';
    import Vue from 'vue';
    import { user_has_provider } from '../../utils/linked-accounts';

    @Component({})
    export default class extends Vue {
        @State(state => state.user.user) user;
        @State(state => state.user.linkedAccounts) links;

        @Action('user/disconnectLinkedAccount') removeProvider;
        @Action('user/linkedAccounts') refreshLinks;

        discordUrl = `https://discordapp.com/api/oauth2/authorize?client_id=465280450420670484&redirect_uri=http%3A%2F%2Fapi.devwars.test/oauth/discord&response_type=code&scope=identify`;

        mounted() {
            this.check();
        }

        beforeDestroy() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }

        async check() {
            await this.refreshLinks();

            this.timeout = setTimeout(this.check.bind(this), 3000);
        }

        get hasDiscord() {
            return user_has_provider(this.links, 'DISCORD');
        }
    }
</script>
