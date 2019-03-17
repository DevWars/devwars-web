<template>
    <div class="modal__actions">
        <button
            v-async-click="[end, team]"
            v-for="team in game.teams"
            class="btn btn-link"
        >{{ team.name | capitalize }}
        </button>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Http from '../../services/Http';

    export default {
        name: "EndGameModal",
        props: [
            "game",
            "resolve"
        ],
        methods: {
            async end(team) {
                await Http.for(`game/${this.game.id}/ended`).post({ winner: team.id });

                this.close(team);
            } 
        }
    }
</script>
