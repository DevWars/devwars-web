<template>
    <form v-async-submit="[addRegistrant]">
        <div class="search">
            <Input v-model="username" placeholder="Username"/>
        </div>

        <ButtonGroup class="modal__actions">
            <!-- <Button class="muted link" @click="close(false)">Cancel</Button> -->
            <Button class="primary">Add</Button>
        </ButtonGroup>
    </form>
</template>


<script>
import Input from '../form/Input';

export default {
    name: 'AddRegistrantModal',
    components: { Input },
    props: {
        game: {
            type: Object,
            required: true,
        },
        resolve: {
            type: Function,
            required: true,
        },
        reject: {
            type: Function,
            required: true,
        },
    },
    data: () => {
        return {
            username: '',
        };
    },
    methods: {
        async addRegistrant() {
            try {
                await this.$axios.$post(`/applications/game/${this.game.id}/username/${this.username}`);
            } catch (e) {
                console.error(e);
            }

            this.close(true);
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.search {
    /* position: relative;

    &__list {
        @extend %material;
        width: 100%;
        max-height: 150px;
        border: 1px solid $divider-color;
        position: absolute;
        top: calc(100% - 1px);
        z-index: $zindex-popover;
        overflow-y: auto;
    }

    &__item {
        padding: $xxs-space $xs-space;
        background-color: #fff;
        cursor: pointer;

        &:hover {
            background-color: $link-color;
            color: #fff;
        }
    } */
}
</style>
