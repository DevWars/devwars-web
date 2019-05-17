<template>
    <div class="Register header-offset">
        <div class="container">
            <form v-async-submit="[submit]">
                <DevwarsCard title="Register">
                    <Input v-model="email" label="Email" class="group" required/>

                    <Input
                        v-model="username"
                        label="Username"
                        class="group"
                        minlength="4"
                        maxlength="32"
                        required
                    />

                    <Input
                        v-model="password"
                        label="Password"
                        class="group"
                        type="password"
                        required
                    />

                    <div slot="actions">
                        <Button type="submit" class="outline block">REGISTER</Button>
                        <Button href="/login" class="link muted">Already have an account?</Button>
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
    name: 'Register',
    components: { DevwarsCard, Input },
    layout: 'header',
    meta: {
        noAuth: true,
    },
    data: () => {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async submit() {
            await this.$store.dispatch('user/register', {
                username: this.username,
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Register {
    padding-top: $l-space;
}
</style>
