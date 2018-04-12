<template>
    <div class="card card--home">
        <div class="card__inner">
            <div class="live-now">
                <h2 class="live-now__title card__title">Live Now</h2>
            </div>

            <div class="card--home__contents">
                <div class="now-showing">
                    <div class="embed-video">
                        <iframe src="https://player.twitch.tv/?channel=devwars" frameborder="0" allowfullscreen="true" scrolling="no" theme="dark" autoplay="true" muted="true"></iframe>
                    </div>
                </div>
                <div class="card--home__actions">
                    <a href="https://www.twitch.tv/devwars" class="btn btn-twitch" target="_blank">Watch on Twitch</a>
                    <RegistrationButton :game="game" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import RegistrationButton from "./RegistrationButton";

    @Component({
        components: {RegistrationButton}
    })
    export default class extends Vue {
        @State(state => state.game.active) game;
    }
</script>
