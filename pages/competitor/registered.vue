<template>
    <div>
        <div class="ribbon"></div>
        <div class="container">
            <div class="row-lift">
                <div class="heading">
                    <h1>Compete in DevWars</h1>
                </div>
            </div>
        </div>

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
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import moment from 'moment';

    import * as countryList from 'country-list';
    import Http from "../../services/Http";
    import Input from "~/components/form/Input";

    @Component({
        components: { Input },
        middleware: 'auth'
    })
    export default class CompetitorRegistration extends Vue {

    }
</script>
