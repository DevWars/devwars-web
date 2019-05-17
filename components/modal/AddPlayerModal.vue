<template>
    <form v-async-submit="[addPlayer]">
        <Select v-model="team" label="Select Team" class="group" required>
            <option v-for="team in game.teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </Select>
        <Select v-model="language" label="Select Language" class="group" required>
            <option>HTML</option>
            <option>CSS</option>
            <option>JS</option>
        </Select>

        <ButtonGroup class="modal__actions">
            <Button class="muted link" @click.prevent="close(false)">Cancel</Button>
            <Button class="primary">Add Player</Button>
        </ButtonGroup>
    </form>
</template>


<script>
import Select from '@/components/form/Select';

export default {
    name: 'AddPlayerModal',

    components: { Select },

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

            const res = await this.$axios.post(`/games/${this.game.id}/player`, {
                player,
                team,
                language: this.language,
            });

            this.$store.commit('game/game', res.data);

            this.close(true);
        },
    },
};
</script>
