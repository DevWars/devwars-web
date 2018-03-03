<template>
    <div class="pg-auth header-offset">
        <div class="container">
            <form class="auth-form" v-async-submit="[login]" >
                <h1 class="auth-form__title">Login</h1>
                <div class="form-group">
                    <input v-model="username" class="form-control" type="text" required>
                    <label>Email or Username</label>
                </div>
                <div class="form-group">
                    <input name="password" v-model="password" class="form-control" type="password" required>
                    <label>Password</label>
                </div>
                <div class="auth-form__actions">
                    <button type="submit" href="#" class="btn btn-outline-white btn-block">LOGIN</button>
                    <a href="/register" class="btn btn-outline-gray btn-block">REGISTER</a>
                    <a href="/forgot-password" class="auth-form__forgot">Forgot your password?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        layout: 'header',
        middleware: 'guest'
    })
    export default class Login extends Vue {

        username = '';
        password = '';

        async login() {
            await this.$store.dispatch('user/login', {username: this.username, password: this.password});
        }
    }
</script>
