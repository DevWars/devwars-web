<template>
    <MailMeta subject="Not Selected To Compete">
        <mj-section>
            <mj-column>
                <mj-text font-weight="bold" align="center" font-size="24px" color="#fff" font-family="helvetica">You weren't selected to play in DevWars.</mj-text>
                <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">No worries, you still have a chance to play by confirming that you are still able to play in the event a player cannot make it to the game.</mj-text>
            </mj-column>
        </mj-section>

        <mj-section padding="0">
            <mj-column>
                <mj-text font-weight="bold" align="center" font-size="16px" color="#fff" font-family="helvetica">{{ DATE }}</mj-text>

                <mj-text align="center" line-height="1.3" font-size="16px" color="#fff" font-family="helvetica">If we need another player, will you still be able to play?</mj-text>
                <mj-button background-color="#00c9ff" border-radius="40px" font-family="helvetica" font-size="14px" font-weight="bold">YES, I CAN STILL PLAY</mj-button>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column>
                <mj-text align="center" font-size="16px" color="#fff" font-family="helvetica">Know you can't make it?</mj-text>
                <mj-button background-color="#e74c3c" border-radius="40px" font-family="helvetica" font-size="14px" font-weight="bold">RESIGN FROM COMPETITION</mj-button>
            </mj-column>
        </mj-section>
    </MailMeta>
</template>


<script>
import Vue from 'vue';

import Http from '../../../services/Http';
import MailMeta from '../../../components/mail/MailMeta';

export default {
    name: "gameUnselected",
    components: { MailMeta },
    layout: 'mail'
}
</script>
