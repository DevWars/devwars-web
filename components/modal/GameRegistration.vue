<template>
    <div v-if="!isCompetitor">
        <!-- NOT PRE-REGISTERED -->
        <h1>Become a competitor</h1>
        <p>
            In order to compete in live DevWars games, you must first complete the
            <b>competitor registration form</b>.
        </p>
        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <a
                :href="'/competitor/register?schedule=' + schedule.id "
                class="btn btn-primary"
                @click="close(false)"
            >Begin Registration</a>
        </div>
    </div>

    <div v-else>
        <!-- REGISTERED -->
        <h1>Entry confirmation</h1>
        <p>
            You are entering to play on
            <b>{{ schedule.startTime | moment('fullDate') }}</b> at
            <b>
                {{ schedule.startTime |
                moment('HH:mm')}} (UTC)
            </b>. Are you sure?
        </p>

        <p class="font-size-sm">
            *Entering to compete does not guarantee you will play in a live game. You will be
            notified 24-48 hours before the show if you are selected to play. If you are not selected, you may still be
            eligible to play if you are available and a selected contestant is unable to play.
        </p>

        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Nevermind</button>
            <button class="btn btn-primary" @click="enter(schedule)">Enter</button>
        </div>
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
        schedule: {
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
        async enter(schedule) {
            await this.$store.dispatch('game/apply', schedule);

            this.close(true);
        },
    },
};
</script>
