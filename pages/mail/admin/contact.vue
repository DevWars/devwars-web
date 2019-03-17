<template>
    <MailMeta :subject="'New Contact' + name">
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
                        <th style="padding: 0 15px;">Response</th>
                    </tr>
                    <tr>
                        <td style="padding: 0 15px 0 0;">Name</td>
                        <td style="padding: 0 15px;">{{ name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0 15px 0 0;">Email</td>
                        <td style="padding: 0 15px;">{{ email }}</td>
                    </tr>
                </mj-table>
                <mj-text align="left" font-weight="bold" font-size="16px" color="#fff" font-family="helvetica">
                    Contact Message:
                </mj-text>
                <mj-text align="left" line-height="1.3" font-size="13px" color="#fff" font-family="helvetica">{{ message }}</mj-text>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>

<script>
    import Vue from 'vue';

    import MailMeta from '../../../components/mail/MailMeta';

    export default {
        name: "Contact",
        components: { MailMeta },
        layout: 'mail',
        async asyncData({ query }) {
            const { name, email, message } = query;

            return { name, email, message };
        }
    }
</script>

