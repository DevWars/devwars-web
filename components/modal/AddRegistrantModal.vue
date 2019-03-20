<template>
    <form v-async-submit="[addRegistrant]">
        <div class="form-group">
            <div class="search-input">
                <Input v-model="username" placeholder="Username"/>
            </div>
        </div>
        <div class="modal__actions">
            <button class="btn btn-outline-gray" @click="close(false)">Cancel</button>
            <button class="btn btn-primary">Add</button>
        </div>
    </form>
</template>


<script>
import Input from '../form/Input';

export default {
    name: 'AddRegistrantModal',
    components: { Input },
    props: {
        'game': {
            type: Object,
            required: true,
        }, 
        'resolve': {
            type: Function,
            required: true,
        },
        'reject': {
            type: Function,
            required: true,
        },
    },
    data: () => {
        return {
            username: '',
        }
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
