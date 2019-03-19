<template>
    <div class="ResetPassword header-offset">
        <div class="container">
            <form v-show="!done">
                <DevwarsCard title="Reset Password">
                    <div class="form-group">
                        <Input type="password" v-model="password" tabindex="1" required/>
                        <label>New Password</label>
                    </div>
                    <div class="form-group">
                        <Input type="password" v-model="confirmed" tabindex="2" required/>
                        <label>Confirm Password</label>
                    </div>
                    <div slot="actions">
                        <button
                            type="button"
                            :disabled="confirmed !== password"
                            v-async-click="[reset]"
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
    methods: {
        reset() {
            let key = this.$route.query.key;

            this.$store.dispatch('user/resetByKey', {
                key,
                password: this.password,
            });

            this.done = true;
        },
    },
    async asyncData({ params }) {
        return { key: params.key };
    },
};
</script>


<style lang="scss" scoped>
@import '../assets/styles/utils';

.ResetPassword {
    padding-top: $l-space;
}
</style>
