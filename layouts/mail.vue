<template>
    <mjml>
        <mj-body>
            <mj-container background-color="#14161F">
                <Header />

                <nuxt />

                <Footer />
            </mj-container>
        </mj-body>
    </mjml>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Header from '../components/mail/Header';
    import Footer from '../components/mail/Footer';

    @Component({
        components: { Footer, Header }
    })
    export default class extends Vue {

    }
</script>
