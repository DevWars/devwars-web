<template>
    <div class="Login header-offset">
        <div class="container">
            <form v-async-submit="[login]">
                <DevwarsCard title="Login">
                    <Input v-model="username" label="Email or Username" class="group" required/>

                    <Input
                        v-model="password"
                        label="Password"
                        class="group"
                        type="password"
                        required
                    />

                    <div slot="actions">
                        <button type="submit" href="#" class="btn btn-outline-white btn-block">LOGIN</button>
                        <a href="/register" class="btn btn-outline-gray btn-block">REGISTER</a>
                        <a href="/forgot-password" class="forgot">Forgot your password?</a>
                    </div>
                </DevwarsCard>
            </form>
        </div>
    </div>
</template>


<script>
import DevwarsCard from '~/components/DevwarsCard';
import Input from '~/components/form/Input';

export default {
    name: 'Login',
    components: { DevwarsCard, Input },
    layout: 'header',
    meta: {
        noAuth: true,
    },
    data: () => {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            await this.$store.dispatch('user/login', {
                username: this.username,
                password: this.password,
            });
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Login {
    padding-top: $l-space;

    .forgot {
        display: block;
        margin-top: $s-space;
        color: $text-color-muted;

        &:hover {
            color: $text-color-secondary;
        }
    }
}
</style>
