<template>
    <mjml>
        <mj-body background-color="#14161F">
            <Header />

            <mj-section>
                <mj-column>
                    <mj-text font-weight="bold" align="center" font-size="24px" color="#fff" font-family="helvetica">
                        Connect
                        your Discord account
                    </mj-text>
                    <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">
                        Hello
                        fellow competitors. We recently added a new connections requirement to link your Discord to
                        compete
                        in future games.
                    </mj-text>
                    <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">
                        Since
                        Discord is an important part of DevWars, connecting your Discord will help us automate more of
                        the
                        sign up process to be faster and easier to join games.
                    </mj-text>
                </mj-column>
            </mj-section>
            <!---->
            <mj-section padding-top="0">
                <mj-column>
                    <mj-button
                        background-color="#7289da"
                        border-radius="40px"
                        font-family="helvetica"
                        font-size="18px"
                        font-weight="bold"
                    >
                        LINK MY DISCORD
                    </mj-button>
                </mj-column>
            </mj-section>

            <Footer />
        </mj-body>
    </mjml>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';
    import Footer from '../../components/mail/Footer';
    import Header from '../../components/mail/Header';

    @Component({
        layout: 'literally-nothing',
        components: { Header, Footer }
    })
    export default class extends Vue {
        random = new Date().getTime();

    }
</script>

