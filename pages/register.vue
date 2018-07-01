<template>
    <div class="pg-auth header-offset">
        <div class="container">
            <form class="auth-form" v-async-submit="[submit]">
                <h1 class="auth-form__title">Register</h1>
                <div class="form-group">
                    <Input v-model="email" required />
                    <label>Email</label>
                </div>
                <div class="form-group">
                    <Input minlength="4" maxlength="32" v-model="username" required />
                    <label>Username</label>
                </div>
                <div class="form-group">
                    <Input v-model="password" type="password" required />
                    <label>Password</label>
                </div>
                <div class="auth-form__actions">
                    <button type="submit" href="#" class="btn btn-outline-white btn-block">REGISTER</button>
                    <a href="/login" class="auth-form__forgot">Already have an account?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Input from '~/components/form/Input';

    @Component({
        components: { Input },
        layout: 'header',
        middleware: 'guest'
    })

    export default class Login extends Vue {
        username = '';
        email = '';
        password = '';

        async submit() {
            await this.$store.dispatch('user/register', {username: this.username, email: this.email, password: this.password});
        }
    }
</script>
