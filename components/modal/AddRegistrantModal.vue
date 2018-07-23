<template>
    <form v-async-submit="[addRegistrant]">
        <div class="form-group">
            <div class="search-input">
                <Input placeholder="Username" v-model="username" />
            </div>
        </div>
        <div class="modal__actions">
            <button class="btn btn-outline-gray">Cancel</button>
            <button class="btn btn-primary">Add</button>
        </div>
    </form>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';
    import Http from "../../services/Http";
    import Input from "../form/Input";
    import Avatar from "../user/Avatar";

    @Component({
        components: { Input, Avatar }
    })

    export default class AddRegistrantModal extends Vue {
        @Prop() game;

        username = '';

        async addRegistrant() {
            await this.$axios.$post(`/user/${this.username}/game-application/${this.game.id}`);
        }
    }
</script>
