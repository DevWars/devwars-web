<template>
    <div class="Register header-offset">
        <div class="container">
            <form v-async-submit="[submit]">
                <DevwarsCard title="Register">
                    <div class="form-group">
                        <Input v-model="email" required/>
                        <label>Email</label>
                    </div>
                    <div class="form-group">
                        <Input v-model="username" minlength="4" maxlength="32" required/>
                        <label>Username</label>
                    </div>
                    <div class="form-group">
                        <Input v-model="password" type="password" required/>
                        <label>Password</label>
                    </div>
                    <div slot="actions">
                        <button
                            type="submit"
                            href="#"
                            class="btn btn-outline-white btn-block"
                        >REGISTER</button>
                        <a href="/login" class="forgot">Already have an account?</a>
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
