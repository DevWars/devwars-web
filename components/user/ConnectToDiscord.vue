<template>
    <a v-if="!hasDiscord" :href="discordUrl" class="btn btn-discord btn-icon">
        <i class="fab fa-discord"></i>
        <span>Connect Discord</span>
    </a>
    <a v-else  class="btn btn-outline-success btn-icon" @click="removeProvider('DISCORD')">
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
            discordUrl: `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.clientID}&redirect_uri=${
                process.env.apiUrl
            }/oauth/discord&response_type=code&scope=identify`,
        };
    },
    computed: {
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
        this.refresh();
    },
    methods: {
        ...mapActions('user', {
            removeProvider: 'disconnectLinkedAccount',
            refresh: 'linkedAccounts',
        }),
    },
};
</script>
