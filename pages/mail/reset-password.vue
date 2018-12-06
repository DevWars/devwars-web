<template>
    <MailMeta subject="DevWars Password Reset">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >
                    Password Reset
                </mj-text>
                <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">
                    We received a password change request for your DevWars account: <strong>{{ username }}</strong>. To
                    change your password, click the link below:
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
                    RESET PASSWORD
                </mj-button>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import MailMeta from '../../components/mail/MailMeta';

    @Component({
        components: { MailMeta },
        layout: 'mail'
    })

    export default class extends Vue {
        async asyncData({ query }) {
            console.log(query);
            return { url: query.url, username: query.username };
        }
    }
</script>
