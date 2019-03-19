<template>
    <div class="ForgotPassword header-offset">
        <div class="container">
            <form v-show="!done" v-async-submit="[forgot]">
                <DevwarsCard
                    title="Forgot Password"
                    desc="Enter the email address below and we will send you some instructions."
                >
                    <div class="form-group">
                        <Input v-model="email" name="email" tabindex="1" required/>
                        <label>Email or Username</label>
                    </div>
                    <div slot="actions">
                        <button
                            type="submit"
                            href="#"
                            class="btn btn-outline-white btn-block"
                            tabindex="2"
                        >Reset Password</button>
                    </div>
                </DevwarsCard>
            </form>

            <div v-show="done">
                <DevwarsCard
                    title="Password Reset"
                    desc="Please check your email for instructions on how to reset your password."
                >
                    <div slot="actions">
                        <a
                            href="/forgot-password"
                            class="btn btn-outline-gray btn-block"
                        >Need to try again?</a>
                    </div>
                </DevwarsCard>
            </div>
        </div>
    </div>
</template>


<script>
import DevwarsCard from '~/components/DevwarsCard';
import Input from '~/components/form/Input';

export default {
    name: 'ResetPassword',
    components: { DevwarsCard, Input },
    data() {
        return {
            done: false,
            email: '',
        };
    },
    methods: {
        async forgot() {
            const done = await this.$store.dispatch('user/forgot', this.email);

            this.done = done;
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../assets/styles/utils';

.ForgotPassword {
    padding-top: $l-space;
}
</style>
