<template>
    <MailMeta subject="Register For Upcoming DevWars Game">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >Compete in next week's game.</mj-text>
                <mj-text
                    align="center"
                    font-size="16px"
                    line-height="1.3"
                    color="#fff"
                    font-family="helvetica"
                >We noticed you didn't enter for our upcoming game. This is your chance to sign up to play. Here are the details for next weeks game:</mj-text>
            </mj-column>
        </mj-section>

        <mj-section padding="0">
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >{{ DATE }}</mj-text>
                <mj-text
                    align="center"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >DevWars Competition</mj-text>
                <mj-button
                    background-color="#00c9ff"
                    border-radius="40px"
                    font-family="helvetica"
                    font-size="14px"
                    font-weight="bold"
                >REGISTER FOR ENTRY</mj-button>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text
                    align="center"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >Don't know when that is in your timezone?</mj-text>
                <mj-button
                    background-color="gray"
                    border-radius="40px"
                    font-family="helvetica"
                    font-size="14px"
                    font-weight="bold"
                >CONVERT TO MY TIMEZONE</mj-button>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>


<script>
import Http from '../../../services/Http';
import MailMeta from '../../../components/mail/MailMeta';

export default {
    name: 'UpcomingGame',
    components: { MailMeta },
    layout: 'mail',
};
</script>
