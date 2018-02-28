<template>
    <div class="pg-auth header-offset">
        <div class="container">
            <div class="auth-form">
                <div v-show="!done">
                    <h1 class="auth-form__title">Forgot Password</h1>
                    <p class="auth-form__desc">Enter the email address below and we will send you some instructions.</p>

                    <form v-async-submit="[forgot]">
                        <div class="form-group">
                            <input v-model="email" name="email" type="text" class="form-control" tabindex="1" required>
                            <label>Email Address</label>
                        </div>
                        <div class="auth-form__actions">
                            <button type="submit" href="#" class="btn btn-outline-white btn-block" tabindex="2">Reset Password</button>
                        </div>
                    </form>
                </div>

                <div v-show="done">
                    <h1 class="auth-form__title">Password Reset</h1>
                    <p class="auth-form__desc">Please check your email for instructions on how to reset your password.</p>
                    <div class="auth-form__actions">
                        <a href="/forgot-password" class="auth-form__forgot">Need to try again?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component
    export default class ResetPassword extends Vue {
        done = false;
        email = '';

        async forgot() {
            await this.$store.dispatch('user/forgot', this.email);

            this.done = true;
        }
    }
</script>
