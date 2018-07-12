<template>
    <MailMeta subject="New Contact - NAME_OF_PERSON">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >
                    New Contact Enquiry
                </mj-text>
            </mj-column>
        </mj-section>

        <mj-section padding="0">
            <mj-column>
                <mj-table>
                    <tr style="border-bottom: 1px solid #ccc; text-align:left; padding:15px 0;">
                        <th style="padding: 0 15px 0 0;">Field</th>
                        <th style="padding: 0 15px;">Reponse</th>
                    </tr>
                    <tr>
                        <td style="padding: 0 15px 0 0;">Name</td>
                        <td style="padding: 0 15px;">NAMEOFPERSON</td>
                    </tr>
                    <tr>
                        <td style="padding: 0 15px 0 0;">Email</td>
                        <td style="padding: 0 15px;">PERSONSEMAIL</td>
                    </tr>
                </mj-table>
                <mj-text align="left" font-weight="bold" font-size="16px" color="#fff" font-family="helvetica">
                    Contact Message:
                </mj-text>
                <mj-text align="left" line-height="1.3" font-size="13px" color="#fff" font-family="helvetica">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque magni quibusdam numquam in nesciunt enim vero rerum nisi excepturi id maxime error cupiditate ullam quis provident perspiciatis, facere aspernatur dolore?
                </mj-text>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Http from '../../../services/Http';
    import MailMeta from '../../../components/mail/MailMeta';

    @Component({
        components: { MailMeta },
        layout: 'mail'
    })

    export default class extends Vue {
        async asyncData({ query }) {
            const game = await Http.for('game').byID(query.game);

            return { game };
        }
    }
</script>

