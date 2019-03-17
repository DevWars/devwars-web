<template>
    <MailMeta subject="Welcome to DevWars - Please Confirm Email">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >
                    Welcome!
                </mj-text>
                <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">
                    Thanks for signing up on DevWars. To start hacking, please verify your email address by clicking the
                    link below.
                </mj-text>
            </mj-column>
        </mj-section>

        <mj-section padding-top="0">
            <mj-column>
                <mj-button
                    :href="url"
                    background-color="#7289da"
                    border-radius="40px"
                    font-family="helvetica"
                    font-size="18px"
                    font-weight="bold"
                >
                    CONFIRM EMAIL
                </mj-button>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>

<script>
    import Vue from 'vue';

    import Http from '../../services/Http';
    import MailMeta from '../../components/mail/MailMeta';

    export default {
        name: "Welcome",
        components: { MailMeta },
        layout: 'mail',
        async asyncData({ query }) {
            return { url: query.url };
        }
    }
</script>
