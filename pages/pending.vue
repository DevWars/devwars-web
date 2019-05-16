<template>
    <div>
        <PageBanner title="Welcome to DevWars!"/>

        <div class="footer-offset align-center">
            <div class="container">
                <Card class="plain dark">
                    <h3 class="modpanel__subtitle">Verify your email address</h3>
                    <p class="form-group">
                        Confirm your email by clicking the verification link we sent to your inbox.
                        Don't forget to
                        <u>check your spam folder</u>.
                    </p>
                    <div>
                        <button class="btn btn-outline-gray" @click="resend">Resend Email</button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>


<script>
import Http from '../services/Http';
import Card from '~/components/Card';
import PageBanner from '~/components/layout/PageBanner';
import { roles } from '../utils/auth';

export default {
    name: 'Pending',

    meta: {
        auth: [roles.pending],
        redirectIfNot: "/",
    },
    
    components: { Card, PageBanner },

    methods: {
        async resend() {
            await Http.for('auth/re-verify').save();
            return this.$store.dispatch('toast/success', `We have sent off another email, please wait patiently.`);
        },
    },
};
</script>
