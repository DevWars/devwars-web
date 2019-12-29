<template>
    <form v-if="user" @submit.prevent="savePermissions">
        <Row>
            <Column :md="8">
                <h3>Email Permissions</h3>

                <Checkbox
                    name="email-news"
                    label="Allow News Emails."
                    class="group"
                    :checked="news"
                    @input="updateForm({ values: $event, key: 'news' })"
                />

                <Checkbox
                    name="email-game-applications"
                    label="Allow Game Application Emails."
                    class="group"
                    :checked="gameApplications"
                    @input="updateForm({ values: $event, key: 'gameApplications' })"
                />

                <Checkbox
                    name="email-schedule"
                    label="Allow Game Schedules Emails."
                    class="group"
                    :checked="schedules"
                    @input="updateForm({ values: $event, key: 'schedules' })"
                />

                <Checkbox
                    name="email-linked-accounts"
                    label="Allow Linked Account Emails."
                    class="group"
                    :checked="linkedAccounts"
                    @input="updateForm({ values: $event, key: 'linkedAccounts' })"
                />
            </Column>
        </Row>

        <Button type="submit" class="primary">Save</Button>
    </form>
</template>

<script>
import { mapState } from 'vuex';
import Checkbox from '@/components/form/Checkbox';

export default {
    name: 'Profile',

    components: { Checkbox },

    data: () => {
        return {};
    },

    computed: {
        ...mapState({
            news: (state) => state.user.emailPermissions.news,
            gameApplications: (state) => state.user.emailPermissions.gameApplications,
            schedules: (state) => state.user.emailPermissions.schedules,
            linkedAccounts: (state) => state.user.emailPermissions.linkedAccounts,
        }),

        emailPermissions() {
            return this.$store.state.user.emailPermissions;
        },

        user() {
            return this.$store.state.user.user;
        },

        profile() {
            return this.$store.state.user.profile;
        },
    },

    beforeMount() {
        this.getEmailPermissions();
    },

    methods: {
        updateForm({ values, key }) {
            this.$store.commit('user/emailPermissionsUpdate', { key, values });
        },

        async getEmailPermissions() {
            await this.$store.dispatch('user/getEmailPermissions');
        },

        async savePermissions() {
            await this.$store.dispatch('user/updateEmailPermissions');
        },
    },
};
</script>
