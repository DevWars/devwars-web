<template>
    <Row v-if="user">
        <Column :sm="8">
            <Input
                v-model="user.username"
                disabled
                label="Username"
                class="group"
            />

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

            <h3>Password</h3>
            <Input
                v-model="currentPassword"
                type="password"
                input-id="current-password"
                label="Current
      Password"
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
        <Column :sm="4" />
    </Row>
</template>

<script>
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
        };
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        /**
         * Triggers a change email dispatch, with the new email and the currenet users password. If the
         * details are correct and meet the server requirements, the users email will be updatd.
         *
         * Regardless of update, all fields will be emptied.
         */
        async changeEmail() {
            await this.$store.dispatch('user/email', {
                email: this.newEmail,
                password: this.emailCurrentPassword,
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
            await this.$store.dispatch('user/password', {
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
