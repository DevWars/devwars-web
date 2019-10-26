<template>
    <div class="ForgotPassword header-offset">
        <Container>
            <form v-show="!done">
                <DevwarsCard
                    title="Forgot Password"
                    desc="Enter the email address below and we will send you some instructions."
                >
                    <Input
                        v-model="email"
                        label="Email or Username"
                        class="group"
                        tabindex="1"
                        required
                    />

                    <div slot="actions">
                        <Button
                            type="submit"
                            class="outline block"
                            tabindex="2"
                            @click="forgot"
                        >Reset Password</Button>
                    </div>
                </DevwarsCard>
            </form>

            <div v-show="done">
                <DevwarsCard
                    title="Password Reset"
                    desc="Please check your email for instructions on how to reset your password."
                >
                    <div slot="actions">
                        <Button
                            href="/forgot-password"
                            class="outline muted block"
                        >Need to try again?</Button>
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
@import 'utils.scss';

.ForgotPassword {
    padding-top: $l-space;
}
</style>
