<template>
    <form v-async-submit="[addPlayer]">
        <div class="form-group">
            <div class="select-container">
                <select v-model="team" class="form-control" required>
                    <option value>Select Team</option>
                    <option
                        v-for="team in game.teams"
                        :key="team.id"
                        :value="team.id"
                    >{{ team.name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="select-container">
                <select v-model="language" class="form-control" required>
                    <option value>Select Language</option>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>JS</option>
                </select>
            </div>
        </div>
        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click.prevent="close(false)">Cancel</button>
            <button class="btn btn-primary">Add Player</button>
        </div>
    </form>
</template>


<script>
export default {
    name: 'AddPlayerModal',
    props: {
        game: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
        resolve: {
            type: Function,
            required: true,
        },
    },
    data: () => {
        return {
            team: 0,
            language: '',
        };
    },
    methods: {
        async addPlayer() {
            this.language = this.language.toLowerCase();

            const player = {
                id: this.user.id,
                username: this.user.username,
                language: this.language,
                team: this.team,
            };

            const team = {
                id: this.team,
                name: this.team === 0 ? 'blue' : 'red',
                players: this.game.players,
            };

            const res = await this.$axios.post(
                `/games/${this.game.id}/player`,
                {
                    player,
                    team,
                    language: this.language,
                }
            );

            this.$store.commit('game/game', res.data);

            this.close(true);
        },
    },
};
</script>
