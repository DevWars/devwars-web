<template>
    <form v-if="user" class="NotificationsPage" @submit.prevent="savePermissions">
        <Row>
            <Column :md="8">
                <h3>Notifications</h3>

                <div class="group">
                    <Checkbox
                        name="email-news"
                        label="News Emails"
                        class="sm"
                        :checked="news"
                        @input="updateForm({ values: $event, key: 'news' })"
                    />
                    <span>Learn about new DevWars features or announcements.</span>
                </div>

                <div class="group">
                    <Checkbox
                        name="email-schedule"
                        label="Game Schedule Emails"
                        class="sm"
                        :checked="schedules"
                        @input="updateForm({ values: $event, key: 'schedules' })"
                    />
                    <span>Get notifications for upcoming games.</span>
                </div>

                <div class="group">
                    <Checkbox
                        name="email-game-applications"
                        label="Application Reminder Emails"
                        class="sm"
                        :checked="gameApplications"
                        @input="updateForm({ values: $event, key: 'gameApplications' })"
                    />
                    <span>Get reminders about games you applied for.</span>
                </div>

                <div class="group">
                    <Checkbox
                        name="email-linked-accounts"
                        label="Linked Account Emails"
                        class="sm"
                        :checked="linkedAccounts"
                        @input="updateForm({ values: $event, key: 'linkedAccounts' })"
                    />
                    <span>Get notified about changes or updates to your linked accounts.</span>
                </div>
            </Column>
        </Row>

        <Button type="submit" class="primary">Save</Button>
    </form>
</template>

<script>
import { mapState } from 'vuex';
import Checkbox from '@/components/form/Checkbox';

export default {
    name: 'NotificationsPage',

    components: { Checkbox },

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

<style lang="scss" scoped>
@import 'utils.scss';

.NotificationsPage {
    .group {
        margin-bottom: 30px;

        span {
            display: block;
            margin-top: 5px;
            color: $text-color-secondary;
        }
    }
}
</style>
