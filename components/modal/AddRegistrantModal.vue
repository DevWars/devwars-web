<template>
    <form v-async-submit="[addRegistrant]">
        <div class="form-group">
            <div class="search-input">
                <Input placeholder="Username" v-model="username"/>
            </div>
        </div>
        <div class="modal__actions">
            <button @click="close(false)" class="btn btn-outline-gray">Cancel</button>
            <button class="btn btn-primary">Add</button>
        </div>
    </form>
</template>


<script>
import Http from '../../services/Http';
import Input from '../form/Input';
import Avatar from '../user/Avatar';

export default {
    name: 'AddRegistrantModal',
    components: { Input, Avatar },
    props: ['game', 'resolve', 'reject'],
    data: () => {
        username: '';
    },
    methods: {
        async addRegistrant() {
            try {
                await this.$axios.$post(
                    `/game/${this.game.id}/applications/${this.username}`
                );
            } catch (e) {
                console.error(e);
            }

            this.close(true);
        },
    },
};
</script>
