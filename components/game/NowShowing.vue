<template>
    <div class="card card--home">
        <h2 class="card__title">Now Showing</h2>

        <div class="card--home__contents">
            <h4>DevWars is live now</h4>
            <a href="https://twitch.tv/devwars" class="btn btn-twitch btn-icon">
                <i class="fa fa-twitch"></i>
                <span>Watch on Twitch</span>
            </a>
            <h4>Want to play in this game?</h4>
            <div class="card--home__actions">
                <RegistrationButton :game="game" />
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
