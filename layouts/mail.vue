<template>
    <mjml>
        <mj-body>
            <mj-container background-color="#14161F">
                <Header/>

                <nuxt/>

                <Footer/>
            </mj-container>
        </mj-body>
    </mjml>
</template>


<script>
import Header from '../components/mail/Header';
import Footer from '../components/mail/Footer';

export default {
    name: 'Mail',
    components: { Footer, Header },
};
</script>
