<template>
    <div class="Login header-offset">
        <Container>
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
                        <Button type="submit" class="outline block">Login</Button>
                        <Button href="/register" class="outline muted block">Register</Button>

                        <Button
                            href="/forgot-password"
                            class="link muted block"
                        >Forgot your password?</Button>
                    </div>
                </DevwarsCard>
            </form>
        </Container>
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

    /* .forgot {
        display: block;
        margin-top: $s-space;
        color: $text-color-muted;

        &:hover {
            color: $text-color-secondary;
        }
    } */
}
</style>
