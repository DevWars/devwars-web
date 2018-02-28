<template>
    <div class="pg-auth header-offset">
        <div class="container">
            <div class="auth-form">
                <div v-show="!done">
                    <h1 class="auth-form__title">Reset Password</h1>
                    <form>
                        <div class="form-group">
                            <input type="password"
                                   v-model="password"
                                   class="form-control"
                                   tabindex="1"
                                   required>
                            <label>New Password</label>
                        </div>
                        <div class="form-group">
                            <input type="password"
                                   v-model="confirmed"
                                   class="form-control"
                                   tabindex="2"
                                   required>
                            <label>Confirm Password</label>
                        </div>
                        <div class="auth-form__actions">
                            <button type="button"
                                    :disabled="confirmed !== password"
                                    v-async-click="[reset]"
                                    class="btn btn-outline-white btn-block"
                                    tabindex="3">Reset Password
                            </button>
                        </div>
                    </form>
                </div>

                <div v-show="done">
                    <h1 class="auth-form__title">Success!</h1>
                    <p class="auth-form__desc">Your password has successfully been updated.</p>
                    <div class="auth-form__actions">
                        <a href="/login" class="btn btn-outline-white login">Login</a>
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
        password = '';
        confirmed = '';

        reset() {
            let key = this.$route.query.key;

            this.$store.dispatch('user/resetByKey', {key, password: this.password});

            this.done = true;
        }

        async asyncData({params}) {
            return {key: params.key};
        }
    }
</script>
