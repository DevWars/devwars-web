<template>
    <div class="row">
        <div class="col-sm-8">
            <h3 class="modpanel__subtitle">Email</h3>
            <div class="form-group">
                <Input v-model="emailCurrentPassword" type="password" required/>
                <label>Current password</label>
            </div>
            <div class="form-group">
                <Input v-model="newEmail"/>
                <label>New Email</label>
            </div>
            <div class="form-group">
                <button v-async-click="[changeEmail]" class="btn btn-primary">Change Email</button>
            </div>

            <h3 class="modpanel__subtitle">Password</h3>
            <div class="form-group">
                <Input v-model="currentPassword" type="password" required/>
                <label>Current password</label>
            </div>
            <div class="form-group">
                <Input v-model="newPassword" type="password" required/>
                <label>New password</label>
            </div>
            <div class="form-group">
                <Input v-model="newPasswordConfirmed" type="password" required/>
                <label>Confirm new password</label>
            </div>
            <div class="form-group">
                <button
                    v-async-click="[changePassword]"
                    class="btn btn-primary"
                    :disabled="!(currentPassword && newPassword && newPassword === newPasswordConfirmed)"
                >Change Password</button>
            </div>
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
