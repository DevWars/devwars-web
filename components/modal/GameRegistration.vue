<template>
    <div v-if="!user.competitor">
        <!-- NOT PRE-REGISTERED -->
        <h1>Become a competitor</h1>
        <p>
            In order to compete in live DevWars games, you must first complete the <b>competitor registration form</b>.
        </p>
        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <nuxt-link :to="'/competitor/register?game=' + game.id " @click="close(false)" class="btn btn-primary">
                Begin Registration
            </nuxt-link>
        </div>
    </div>

    <div v-else-if="user.competitor">
        <!-- REGISTERED -->
        <h1>Entry confirmation</h1>
        <p>
            You are entering to play on <b>{{ game.timestamp | moment('fullDate') }}</b> at <b>{{ game.timestamp |
            moment('HH:mm')}} (UTC)</b>. Are you sure?
        </p>

        <p class="font-size-sm">*Entering to compete does not guarantee you will play in a live game. You will be
            notified 24-48 hours before the show if you are selected to play. If you are not selected, you may still be
            eligible to play if you are available anda selected contestant is unable to play.</p>

        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <button class="btn btn-primary" v-async-click="[enter]">Enter</button>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';
    import Http from "../../services/Http";

    @Component
    export default class GameRegistration extends Vue {
        @Prop() resolve;
        @Prop() game;

        @State(state => state.user.user) user;

        async enter() {
            await Http.for('game/application').save(this.game);

            this.close(true);
        }
    }
</script>
