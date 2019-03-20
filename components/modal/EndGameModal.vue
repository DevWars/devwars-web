<template>
    <div class="modal__actions">
        <button
            v-for="team in game.teams"
            :key="team"
            v-async-click="[end, team]"
            class="btn btn-link"
        >{{ team.name | capitalize }}</button>
    </div>
</template>


<script>
import Http from '../../services/Http';

export default {
    name: 'EndGameModal',
    props: {
        'resolve': {
            type: Function,
            required: true,
        },
        'game': {
            type: Object,
            required: true,
        },
    },
    methods: {
        async end(team) {
            await Http.for(`game/${this.game.id}/ended`).post({
                winner: team.id,
            });

            this.close(team);
        },
    },
};
</script>
