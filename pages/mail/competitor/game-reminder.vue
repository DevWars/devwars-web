<template>
    <MailMeta subject="Upcoming Game Reminder">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >Reminder for your upcoming game.</mj-text>
                <mj-text
                    align="center"
                    line-height="1.3"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >You had entered to play in our upcoming game this weekend. If you are selected to play, we will send you an email confirmation.</mj-text>
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
                >CONVERT TO MY TIMEZONE</mj-button>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text
                    align="center"
                    font-size="22px"
                    padding-bottom="0"
                    color="#f1c40f"
                    font-family="helvetica"
                >**DISCLAIMER**</mj-text>
                <mj-text
                    align="center"
                    font-size="16px"
                    line-height="1.3"
                    color="#f1c40f"
                    font-family="helvetica"
                >If you were not selected to play, please leave yourself available to be selected in case a player does not show up to the game.</mj-text>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text
                    align="center"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >Don't think you could make it?</mj-text>
                <mj-button
                    background-color="#e74c3c"
                    border-radius="40px"
                    font-family="helvetica"
                    font-size="14px"
                    font-weight="bold"
                >RESIGN FROM COMPETITION</mj-button>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>


<script>
import Http from '../../../services/Http';
import MailMeta from '../../../components/mail/MailMeta';

export default {
    name: 'gameReminder',
    components: { MailMeta },
    layout: 'mail',
};
</script>
