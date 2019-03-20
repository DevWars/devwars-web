<template>
    <MailMeta subject="You Are Selected To Compete">
        <mj-section>
            <mj-column>
                <mj-text
                    font-weight="bold"
                    align="center"
                    font-size="24px"
                    color="#fff"
                    font-family="helvetica"
                >You are selected to play in DevWars.</mj-text>
                <mj-text
                    align="center"
                    line-height="1.3"
                    font-size="16px"
                    color="#fff"
                    font-family="helvetica"
                >Congratulations! You are officially selected to play in our upcoming
                game this weekend. Below are the details of your upcoming game.</mj-text>
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
                    font-size="16px"
                    line-height="1.3"
                    color="#fff"
                    font-family="helvetica"
                >
                    Please show up 15 minutes early to allow for setup time and be logged into our
                    <a
                        href="https://www.discord.gg/devwars"
                        style="color: #00c9ff;"
                    >Discord</a> lobby voice channel. One of our moderators will 
                    be there to greet you and prepare you for the game.
                    <br>
                    <br>Be sure to read our
                    <a
                        href="https://www.devwars.tv/docs"
                        style="color: #00c9ff;"
                    >documentation</a> to get caught up before you play.
                </mj-text>
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
import MailMeta from '../../../components/mail/MailMeta';

export default {
    name: 'GameSelected',
    components: { MailMeta },
    layout: 'mail',
};
</script>
