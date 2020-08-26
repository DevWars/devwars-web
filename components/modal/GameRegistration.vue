<template>
    <div v-if="!isCompetitor">
        <!-- NOT PRE-REGISTERED -->
        <h1>Become a competitor</h1>
        <p>
            In order to compete in live DevWars games, you must first complete
            the
            <b>competitor registration form</b>.
        </p>
        <ButtonGroup class="modal__actions">
            <Button class="outline muted" @click="close">
                Nevermind
            </Button>
            <Button
                :href="'/competitor/register?game=' + game.id"
                class="primary"
                @click="close"
            >
                Begin Registration
            </Button>
        </ButtonGroup>
    </div>

    <div v-else>
        <!-- REGISTERED -->
        <h1>Entry confirmation</h1>
        <p>
            You are entering to play on
            <b>{{ game.startTime | moment('fullDate') }}</b> at
            <b> {{ game.startTime | moment('HH:mm') }} (UTC) </b>. Are you sure?
        </p>

        <p class="font-size-sm">
            *Entering to compete does not guarantee you will play in a live
            game. You will be notified 24-48 hours before the show if you are
            selected to play. If you are not selected, you may still be eligible
            to play if you are available and a selected contestant is unable to
            play.
        </p>

        <ButtonGroup class="modal__actions">
            <Button class="outline muted" @click="close">Nevermind</Button>
            <Button class="primary" @click="enter(game, user)">Enter</Button>
        </ButtonGroup>
    </div>
</template>

<script>
export default {
    name: 'GameRegistration',

    props: {
        resolve: {
            type: Function,
            required: true,
        },
        game: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isCompetitor() {
            return this.$store.getters['user/isCompetitor'];
        },
    },

    methods: {
        async enter(game, user) {
            await this.$store.dispatch('game/apply', {
                game: game.id,
                user: user.id,
            });

            this.close(true);
        },
    },
};
</script>
