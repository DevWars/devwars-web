<template>
    <form class="AddPlayerModal" @submit.prevent="addPlayer">
        <Select v-model="team" label="Select Team" class="group" required>
            <option value="0">
                Blue
            </option>
            <option value="1">
                Red
            </option>
        </Select>

        <Select
            v-model="language"
            label="Select Language"
            class="group"
            required
        >
            <option value="html">
                HTML
            </option>
            <option value="css">
                CSS
            </option>
            <option value="js">
                JS
            </option>
        </Select>

        <ButtonGroup class="modal__actions">
            <Button class="muted link" @click="close">
                Cancel
            </Button>
            <Button type="submit" class="primary">
                Add Player
            </Button>
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
            language: 'html',
        };
    },

    methods: {
        async addPlayer() {
            const teamId = Number(this.team);
            const player = {
                id: this.user.id,
                username: this.user.username,
                language: this.language,
                team: teamId,
            };

            try {
                await this.$api.games.addPlayerToGame(this.game.id, player);

                this.close({ player });
            } catch (e) {
                this.$store.dispatch('toast/error', e);
                this.close();
            }
        },
    },
};
</script>
