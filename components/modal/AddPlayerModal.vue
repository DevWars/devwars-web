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
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';
    import Http from "../../services/Http";

    @Component({
        components: {}
    })
    export default class AddPlayerModal extends Vue {
        team = 0;
        language = '';

        @Prop() game;
        @Prop() user;

        @Prop() resolve;

        async save() {
            let player = await Http.for('player').post({}, {
                team: this.team,
                user: this.user.id,
                language: this.language
            });

            Object.values(this.game.teams).find(it => it.id === this.team).players.push(player);

            this.close(true);
        }
    }
</script>
