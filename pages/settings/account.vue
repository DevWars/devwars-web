<template>
    <div class="row">
        <div class="col-sm-8">
            <h3 class="modpanel__subtitle">Email</h3>
            <div class="form-group">
                <input v-model="emailCurrentPassword" type="password" class="form-control" required>
                <label>Current password</label>
            </div>
            <div class="form-group">
                <input v-model="newEmail" type="text" class="form-control">
                <label>New Email</label>
            </div>
            <div class="form-group">
                <button v-async-click="[changeEmail]" class="btn btn-primary">Change Email</button>
            </div>

            <h3 class="modpanel__subtitle">Password</h3>
            <div class="form-group">
                <input v-model="currentPassword" type="password" class="form-control" required>
                <label>Current password</label>
            </div>
            <div class="form-group">
                <input v-model="newPassword" type="password" class="form-control" required>
                <label>New password</label>
            </div>
            <div class="form-group">
                <input v-model="newPasswordConfirmed" type="password" class="form-control" required>
                <label>Confirm new password</label>
            </div>
            <div class="form-group">
                <button class="btn btn-primary"
                        v-async-click="[changePassword]"
                        :disabled="!(currentPassword && newPassword && newPassword === newPasswordConfirmed)">
                    Change Password
                </button>
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component
    export default class Accounts extends Vue {
        currentPassword = '';
        newPassword = '';
        newPasswordConfirmed = '';

        emailCurrentPassword = '';
        newEmail = '';


        async changeEmail() {
            await this.$store.dispatch('user/email', {email: this.newEmail, password: this.emailCurrentPassword})
        }

        async changePassword() {
            await this.$store.dispatch('user/password', {current: this.currentPassword, newPassword: this.newPassword})
        }
    }
</script>
