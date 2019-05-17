<template>
    <div v-if="user" class="row">
        <div class="col-sm-8">
            <Input v-model="user.username" label="Username" class="group"/>

            <h3 class="modpanel__subtitle">Email</h3>
            <Input
                v-model="emailCurrentPassword"
                type="password"
                label="Current Password"
                class="group"
                required
            />
            <Input v-model="newEmail" label="New Email" class="group"/>

            <Button v-async-click="[changeEmail]" class="primary">Change Email</Button>

            <h3 class="modpanel__subtitle">Password</h3>
            <Input
                v-model="currentPassword"
                type="password"
                label="Current Password"
                class="group"
                required
            />
            <Input
                v-model="newPassword"
                type="password"
                label="New Password"
                class="group"
                required
            />
            <Input
                v-model="newPasswordConfirmed"
                type="password"
                label="Confirm New Password"
                class="group"
                required
            />

            <Button
                v-async-click="[changePassword]"
                class="primary"
                :disabled="!(currentPassword && newPassword && newPassword === newPasswordConfirmed)"
            >Change Password</Button>
        </div>
        <div class="col-sm-4"></div>
    </div>
</template>


<script>
import Input from '~/components/form/Input';

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
        async changeEmail() {
            await this.$store.dispatch('user/email', {
                email: this.newEmail,
                password: this.emailCurrentPassword,
            });
        },
        async changePassword() {
            await this.$store.dispatch('user/password', {
                oldPassword: this.currentPassword,
                newPassword: this.newPassword,
            });
        },
    },
};
</script>
