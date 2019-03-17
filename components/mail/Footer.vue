<template>
    <mj-wrapper>
        <mj-section padding="0 0 20" background-color="#0B0C11">
            <mj-column>
                <mj-text align="center" color="#8f8f8f" font-size="13">
                    <p>
                        &copy; 2018 All Rights Reserved.
                    </p>
                    <a href="#" style="color: #8f8f8f">Unsubscribe</a>
                </mj-text>
            </mj-column>
        </mj-section>

        <mj-section background-color="#0B0C11">
            <mj-column width="100%">
                <mj-social
                    mode="horizontal"
                    text-mode="false"
                    facebook-href="https://www.facebook.com/DevWars/"
                    twitter-href="https://www.twitter.com/devwarstv"
                    google-href="https://plus.google.com/112749022510452176816"
                    display="facebook twitter google"
                />
            </mj-column>
            <mj-column width="100%">
                <mj-text align="center" color="#8f8f8f" text-transform="uppercase">
                    &copy; <a style="text-decoration: none; color: inherit;" href="#">DEVWARS.TV</a> - 2018
                </mj-text>
            </mj-column>
        </mj-section>
    </mj-wrapper>
</template>

<script>
export default {
    name: "MailFooter"
}
</script>

