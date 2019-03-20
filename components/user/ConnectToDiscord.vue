<template>
    <a v-if="!hasDiscord" :href="discordUrl" class="btn btn-discord btn-icon" target="_blank">
        <i class="fab fa-discord"></i>
        <span>Connect Discord</span>
    </a>
    <a v-else v-async-click="[removeProvider, 'DISCORD']" class="btn btn-outline-success btn-icon">
        <i class="fa fa-check"></i>
        <span>Discord Connected</span>
    </a>
</template>


<script>
import { mapActions } from 'vuex';
import userHasProvider from '../../utils/linkedAccounts';

export default {
    name: 'ConnectToDiscord',
    data: () => {
        return {
            discordUrl: `https://discordapp.com/api/oauth2/authorize?client_id=465280450420670484&redirect_uri=http%3A%2F%2Fapi.devwars.test/oauth/discord&response_type=code&scope=identify`,
        };
    },
    computed: {
        ...mapActions('user', {
            removeProvider: 'disconnectLinkedAccount',
        }),
        user() {
            return this.$store.state.user.user;
        },
        links() {
            return this.$store.state.user.linkedAccounts;
        },
        hasDiscord() {
            return userHasProvider(this.links, 'DISCORD');
        },
    },
    mounted() {
        this.check();
    },
    beforeDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },
    methods: {
        async check() {
            await this.refreshLinks();

            this.timeout = setTimeout(this.check.bind(this), 3000);
        },
        ...mapActions('user', {
            refreshLinks: 'linkedAccounts',
        }),
    },
};
</script>
