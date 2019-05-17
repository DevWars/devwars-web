<template>
    <div class="modal__actions">
        <Button
            v-for="team in game.teams"
            :key="team"
            v-async-click="[end, team]"
            class="link"
        >{{ team.name | capitalize }}</Button>
    </div>
</template>


<script>
// import Http from '../../services/Http';

export default {
    name: 'EndGameModal',
    props: {
        resolve: {
            type: Function,
            required: true,
        },
        game: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async end(team) {
            await this.$axios({
                method: 'post',
                url: `game/${this.game.id}/ended`,
                data: {
                    winner: team.id,
                },
            });
            // await Http.for(`game/${this.game.id}/ended`).post({
            //     winner: team.id,
            // });

            this.close(team);
        },
    },
};
</script>
