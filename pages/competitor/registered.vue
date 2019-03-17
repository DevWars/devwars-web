<template>
    <div>
        <PageBanner title="Compete in DevWars" type="competitor" />

        <div class="footer-offset">
            <div class="container">
                <div class="mod-card">
                    <h3 class="modpanel__title">You are already registered as a Competitor</h3>
                    <p>Want to compete in an upcoming game?</p>
                    <div class="mt-30">
                        <a href="/schedule" class="btn btn-primary mr-15">View schedule</a>
                        <a href="/" class="btn btn-outline-primary">Back to home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    import * as countryList from 'country-list';
    import Http from "../../services/Http";
    import PageBanner from '~/components/layout/PageBanner';
    import Input from "~/components/form/Input";

    export default {
        name: "CompetitorRegistration",
        components: { PageBanner, Input },
        middleware: 'auth'
    }
</script>
