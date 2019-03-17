<template>
    <Applications :games="[game]">
        <div slot-scope="{isApplied, enter, cancel}">
        <a v-show="!isApplied(game)" @click="enter(game)" class="btn btn-primary">
            Register for Entry
        </a>
        <a v-show="isApplied(game)" @click="cancel(game)"
           class="btn btn-outline-danger">Resign</a>
            </div>
    </Applications>
</template>

<script>
    import Vue from 'vue';

    import Applications from '~/components/game/Applications';

    export default {
        name: "RegistrationButton",
        components: {Applications},
        props: [
            "game"
        ],
    }
</script>
