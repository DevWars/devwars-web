<template>
    <form v-async-submit="[save]">
        <div class="form-group">
            <div class="select-container">
                <select v-model="team" class="form-control" required>
                    <option value="">Select Team</option>
                    <option :value="team.id" v-for="team in game.teams" :key="team.id">{{ team.name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="select-container">
                <select v-model="language" class="form-control" required>
                    <option value="">Select Language</option>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>JS</option>
                </select>
            </div>
        </div>
        <div class="modal__actions">
            <button class="btn btn-outline-gray">Cancel</button>
            <button class="btn btn-primary">Save</button>
        </div>
    </form>
</template>

<script>
    import Vue from 'vue';

    import Http from "../../services/Http";

    export default {
        name: "AddPlayerModal",
        props: [
            "game",
            "user",
            "resolve"
        ],
        data: () => {
            return {
                team: 0,
                language: ''
            }
        },
        methods: {
            async save() {
                let player = await Http.for(`game/team/${this.team}/players`).post({}, {
                    user: this.user.id,
                    language: this.language
                });

                Object.values(this.game.teams).find(it => it.id === this.team).players.push(player);

                this.close(true);
            }
        }
    }
</script>
