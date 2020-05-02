<template>
    <div v-if="user">
        <Row class="row">
            <Column :sm="8">
                <h3>Username</h3>
                <p v-if="!canUpdateUsername" class="update-username-text">
                    Username change available on
                    {{ updateUsernameAtDateTime }}
                </p>
                <Input
                    :value="newUsername"
                    :disabled="!canUpdateUsername"
                    placeholder="Username"
                    :label="usernameLabel"
                    class="group"
                    input-id="user-username"
                    @input="onUsernameInput"
                />

                <Button
                    class="primary"
                    :disabled="!isUsernameValid || !canUpdateUsername"
                    :async-click="changeUsername"
                >
                    Change Username
                </Button>
            </Column>
        </Row>

        <Row class="row">
            <Column :sm="8">
                <h3>Email</h3>
                <Input
                    v-model="emailCurrentPassword"
                    type="password"
                    input-id="email-current-password"
                    label="Current Password"
                    class="group"
                    required
                />
                <Input
                    v-model="user.email"
                    disabled
                    type="email"
                    label="Current Email"
                    class="group"
                />
                <Input
                    v-model="newEmail"
                    type="email"
                    label="New Email"
                    class="group"
                />

                <Button
                    class="primary"
                    :disabled="!(newEmail && emailCurrentPassword)"
                    :async-click="changeEmail"
                >
                    Change Email
                </Button>
            </Column>
        </Row>
        <Row class="row">
            <Column :sm="8">
                <h3>Password</h3>
                <Input
                    v-model="currentPassword"
                    type="password"
                    input-id="current-password"
                    label="Current Password"
                    class="group"
                    required
                />
                <Input
                    v-model="newPassword"
                    type="password"
                    input-id="new-password"
                    label="New Password"
                    class="group"
                    required
                />
                <Input
                    v-model="newPasswordConfirmed"
                    type="password"
                    input-id="confirm-new-password"
                    label="Confirm New Password"
                    class="group"
                    required
                />

                <Button
                    class="primary"
                    :disabled="
                        !(
                            currentPassword &&
                            newPassword &&
                            newPassword === newPasswordConfirmed
                        )
                    "
                    :async-click="changePassword"
                >
                    Change Password
                </Button>
            </Column>
        </Row>
    </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import Input from '@/components/form/Input';

export default {
    name: 'Accounts',

    components: { Input },
    data: () => {
        return {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmed: '',
            emailCurrentPassword: '',
            newEmail: '',
            newUsername: '',
        };
    },

    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),

        isUsernameValid() {
            const usernameRegexRequirement = /^[a-zA-Z0-9.-][A-z0-9.-_]{2,23}[a-zA-Z0-9.-]$/;
            const result = usernameRegexRequirement.test(this.newUsername);

            return result;
        },

        usernameLabel() {
            const { lastUsernameUpdateAt } = this.user;

            if (lastUsernameUpdateAt == null) return '';
            return `last updated: ${moment(lastUsernameUpdateAt)
                .utc()
                .format('LLLL')}`;
        },

        /**
         * Returns a displayable date time that can be used to notify the user
         * when they are able to next update there username.
         */
        updateUsernameAtDateTime() {
            const { lastUsernameUpdateAt } = this.user;

            if (lastUsernameUpdateAt == null) return null;

            return moment(lastUsernameUpdateAt)
                .add(7, 'days')
                .utc()
                .format('LLLL');
        },

        /**
         * Users are only ever able to update there username the first time for
         * free but all other times can only occur after 7 days from the last
         * time they changed there username.
         *
         * This policy is not applied to staff.
         */
        canUpdateUsername() {
            const { lastUsernameUpdateAt } = this.user;

            const dueDate = moment(lastUsernameUpdateAt)
                .add(7, 'days')
                .utc()
                .toDate();

            return (
                this.isStaff ||
                lastUsernameUpdateAt == null ||
                dueDate < new Date()
            );
        },

        isStaff() {
            if (this.user == null) return false;
            return this.user.role === 'ADMIN' || this.user.role === 'MODERATOR';
        },
    },

    watch: {
        user(newValue) {
            if (newValue != null) this.newUsername = newValue.username;
        },
    },

    mounted() {
        if (this.user != null && this.user.username != null)
            this.newUsername = this.user.username;
    },

    methods: {
        onUsernameInput(value) {
            this.newUsername = value;
        },

        /**
         * Triggers a change username dispatch, with the new username. If the
         * details are correct and meet the server requirements, the users
         * username will be updated.
         */
        async changeUsername() {
            await this.$store.dispatch('user/updateUsername', {
                username: this.newUsername,
            });
        },

        /**
         * Triggers a change email dispatch, with the new email and the current
         * users password. If the details are correct and meet the server
         * requirements, the users email will be updated.
         *
         * Regardless of update, all fields will be emptied.
         */
        async changeEmail() {
            await this.$store.dispatch('user/updateEmail', {
                password: this.emailCurrentPassword,
                email: this.newEmail,
            });

            this.emailCurrentPassword = '';
            this.newEmail = '';
        },

        /**
         * Changes the users password, based on the current password (old) and new password. If the
         * server accepts the changes, the current users password will be updated.
         *
         * Regardless of update, all fields will be emptied.
         */
        async changePassword() {
            await this.$store.dispatch('user/updatePassword', {
                oldPassword: this.currentPassword,
                newPassword: this.newPassword,
            });

            this.newPasswordConfirmed = '';
            this.currentPassword = '';
            this.newPassword = '';
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.row {
    margin-bottom: 25px;
}

.update-username-text {
    padding-bottom: 10px;
    color: $danger-color;
}
</style>
