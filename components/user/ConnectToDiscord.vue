<template>
    <div class="ConnectToDiscord">
        <ButtonIcon
            v-if="!hasDiscord"
            :href="discordUrl"
            icon="brands/discord"
            class="discord"
        >
            Connect Discord
        </ButtonIcon>
        <ButtonIcon
            v-else
            class="outline danger"
            icon="brands/discord"
            @click="removeProvider('discord')"
        >
            Disconnect Discord
        </ButtonIcon>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import userHasProvider from '../../utils/linkedAccounts';

export default {
    name: 'ConnectToDiscord',

    data: () => {
        return {
            discordUrl: `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.discordClient}&redirect_uri=${process.env.apiUrl}/oauth/discord&response_type=code&scope=identify`,
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
            return userHasProvider(this.links, 'discord');
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

<style lang="scss" scoped>
.discord {
    width: 200px;
}
</style>
