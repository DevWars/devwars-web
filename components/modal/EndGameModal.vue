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
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';
    import Http from '../../services/Http';

    @Component({
        components: {}
    })
    export default class EndGameModal extends Vue {
        @Prop() game;

        @Prop() resolve;

        async end(team) {
            await Http.for(`game/${this.game.id}/ended`).post({ winner: team.id });

            this.close(team);
        }
    }
</script>
