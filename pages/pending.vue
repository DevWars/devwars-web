<template>
    <div>
        <PageBanner title="Welcome to DevWars!" />

        <div class="footer-offset align-center">
            <div class="container">
                <div class="mod-card">
                    <h3 class="modpanel__subtitle">Verify your email address</h3>
                    <p class="form-group">Confirm your email by clicking the verification link we sent to your inbox.
                        Don't forget to <u>check your spam folder</u>.</p>
                    <div>
                        <button v-async-click="[resend]" class="btn btn-outline-gray">Resend Email</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import Http from "../services/Http";
    import PageBanner from '~/components/layout/PageBanner';

    export default {
        nam: "Pending",
        components: { PageBanner },
        methods: {
            async resend() {
                await Http.for('auth/re-verify').save();
                return this.$store.dispatch('toast/success', `We have sent off another email, please wait patiently.`);
            }
        }
    }
</script>
