<template>
    <div class="ResetPassword header-offset">
        <div class="container">
            <form v-show="!done">
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
                        <button
                            v-async-click="[reset]"
                            type="button"
                            :disabled="confirmed !== password"
                            class="btn btn-outline-white btn-block"
                            tabindex="3"
                        >Reset Password</button>
                    </div>
                </DevwarsCard>
            </form>

            <div v-show="done">
                <DevwarsCard title="Success!" desc="Your password has successfully been updated.">
                    <div slot="actions">
                        <a href="/login" class="btn btn-outline-white btn-block">Login</a>
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
    data: () => {
        return {
            done: false,
            password: '',
            confirmed: '',
        };
    },
    async asyncData({ params }) {
        return { key: params.key };
    },
    methods: {
        reset() {
            const { key } = this.$route.query;

            this.$store.dispatch('user/resetByKey', {
                key,
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
