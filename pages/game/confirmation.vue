<template>
    <div>
        <PageBanner title="You've been entered!" type="competitor" />

        <div class="footer-offset">
            <div class="container">
                <div class="card">
                    <div class="card__inner">
                        <div class="form-group">
                            <h2>What's next?</h2>
                            <p>You will receive an email confirmation if you have been selected to play. Only 6 players will be selected, one for each position.</p>
                        </div>

                        <div class="form-group">
                            <h2>How to prepare</h2>
                            <p class="form-group">
                                There are a lot of things you should probably catch up on before game day. Below is our DevWars Documentation covering everything you need to know.
                            </p>
                            <a href="/docs" class="btn btn-primary">View Documentation</a>
                        </div>

                        <p>Have any questions? <a href="/contact">Contact Us</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import PageBanner from '~/components/layout/PageBanner';

    @Component({
        components: { PageBanner }
    })
    export default class GameConfirmation extends Vue {
    }
</script>
