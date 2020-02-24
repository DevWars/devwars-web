<template>
    <div class="ResetPassword header-offset">
        <Container>
            <form v-show="!done" @submit.prevent="reset">
                <DevwarsCard title="Reset Password">
                    <Input
                        v-model="password"
                        type="password"
                        label="New Password"
                        class="group"
                        tabindex="1"
                        required
                    />

                    <Input
                        v-model="confirmed"
                        type="password"
                        label="Confirm Password"
                        class="group"
                        tabindex="2"
                        required
                    />

                    <div slot="actions">
                        <Button
                            type="submit"
                            :disabled="confirmed !== password"
                            class="outline block"
                            tabindex="3"
                        >
                            Reset Password
                        </Button>
                    </div>
                </DevwarsCard>
            </form>

            <div v-show="done">
                <DevwarsCard
                    title="Success!"
                    desc="Your password has successfully been updated."
                >
                    <div slot="actions">
                        <Button to="/login" class="outline block">
                            Login
                        </Button>
                    </div>
                </DevwarsCard>
            </div>
        </Container>
    </div>
</template>

<script>
import DevwarsCard from '@/components/DevwarsCard';
import Input from '@/components/form/Input';

export default {
    name: 'ResetPassword',
    components: { DevwarsCard, Input },
    asyncData({ params }) {
        return { token: params.token };
    },
    data: () => {
        return {
            done: false,
            password: '',
            confirmed: '',
        };
    },
    methods: {
        reset() {
            const { token } = this.$route.query;

            this.$store.dispatch('user/resetByToken', {
                token,
                password: this.password,
            });

            this.done = true;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.ResetPassword {
    padding-top: $l-space;
}
</style>
