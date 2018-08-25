<template>
    <a v-if="!hasDiscord" class="btn btn-primary" target="_blank" :href="discordUrl">Connect your Discord</a>
    <a v-else class="btn btn-secondary" v-async-click="[removeProvider, 'DISCORD']">Disconnect your discord</a>
</template>

<script>
    import Component, {State, Action} from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({})
    export default class extends Vue {
        @State(state => state.user.user) user;

        @Action('user/disconnectLinkedAccount') removeProvider;

        discordUrl = `https://discordapp.com/api/oauth2/authorize?client_id=465280450420670484&redirect_uri=http%3A%2F%2Fapi.devwars.tv/oauth/discord&response_type=code&scope=identify`;

        get hasDiscord() {
            return this.user && this.user.linked_accounts && this.user.linked_accounts.some(it => it.provider === 'DISCORD');
        }
    }
</script>
