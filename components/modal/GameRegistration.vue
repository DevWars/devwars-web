<template>
    <div v-if="!competitor">
        <!-- NOT PRE-REGISTERED -->
        <h1>Become a competitor</h1>
        <p>
            In order to compete in live DevWars games, you must first complete the <b>competitor registration form</b>.
        </p>
        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <a :href="'/competitor/register?game=' + game.id " @click="close(false)" class="btn btn-primary">
                Begin Registration
            </a>
        </div>
    </div>

    <div v-else-if="competitor">
        <!-- REGISTERED -->
        <h1>Entry confirmation</h1>
        <p>
            You are entering to play on <b>{{ game.startTime | moment('fullDate') }}</b> at <b>{{ game.startTime |
            moment('HH:mm')}} (UTC)</b>. Are you sure?
        </p>

        <p class="font-size-sm">*Entering to compete does not guarantee you will play in a live game. You will be
            notified 24-48 hours before the show if you are selected to play. If you are not selected, you may still be
            eligible to play if you are available and a selected contestant is unable to play.</p>

        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <button class="btn btn-primary" v-async-click="[enter]">Enter</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Http from "../../services/Http";

    import { mapActions } from "vuex";

    export default {
        name: "GameRegistration",
        props: {
            resolve: {
                default: () => {}
            },
            game: {
                default: ""
            }
        },
        computed: {
            competitor() {
                return this.$store.state.user.competitor
            },
            ...mapActions({
                apply: 'game/apply'
            })
        },
        methods: {
            async enter() {
                await this.apply(this.game);

                this.close(true);
            }
        }
    }

    
</script>
