<template>
    <div class="AddRegistrantModal modal">
        <h1>Add registrant</h1>
        <form @submit.prevent="addRegistrant">
            <div class="search">
                <Icon name="search" />
                <Input
                    v-model="username"
                    placeholder="Username"
                    @input="searchByUsername"
                />

                <div v-show="searchVisible" class="search__list">
                    <div
                        v-for="user in result.data"
                        :key="user.id"
                        class="search__item"
                        @click="() => userSelected(user)"
                    >
                        <div>
                            <User :user="user" size="sm" />
                        </div>
                    </div>
                </div>
            </div>

            <ButtonGroup class="modal__actions">
                <Button class="muted link" @click="close">Cancel</Button>
                <Button type="submit" class="primary">Add</Button>
            </ButtonGroup>
        </form>
    </div>
</template>

<script>
import { debounce } from 'lodash';
import Input from '../form/Input';
import User from '@/components/user/User';

export default {
    name: 'AddRegistrantModal',

    components: { Input, User },

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
            default: () => {},
        },
    },

    data: () => ({
        userId: null,
        username: '',
        result: { data: [] },
        searchVisible: false,
        debounceSearch: null,
    }),

    mounted() {
        this.debounceSearch = debounce(async () => {
            this.result = await this.$api.search.searchForUsers({
                username: this.username,
                email: this.username,
            });
        }, 600);
    },

    methods: {
        userSelected(user) {
            this.username = user.username;
            this.userId = user.id;
            this.searchVisible = false;
        },

        searchByUsername(username) {
            if (username.trim() === '') return (this.result.data = []);
            this.searchVisible = true;

            this.debounceSearch();
        },

        async addRegistrant() {
            try {
                await this.$api.games.applyToGameAsPlayer(
                    this.game.id,
                    this.userId,
                );
                this.close(true);
            } catch (e) {
                this.$store.dispatch('toast/error', e);
                this.close(false);
            }
        },
    },
};
</script>

<style lang="scss">
@import 'utils.scss';

.v--modal-box {
    overflow: visible !important;
}

.AddRegistrantModal {
    .result {
        margin-top: 25px;
    }

    .search {
        display: flex;
        align-items: center;
        position: relative;

        .Icon {
            margin-right: $grid-gutter-width;
            color: $text-color-secondary;
        }

        &__list {
            @extend %material;
            width: 100%;
            max-height: 250px;
            position: absolute;
            top: calc(100% - 1px);
            z-index: $zindex-popover;
            overflow-y: auto;
        }

        &__item {
            @extend %flex-justify;
            padding: $xxs-space $xs-space;
            background-color: $bg-color-1;
            cursor: pointer;

            &:hover {
                background-color: lighten($bg-color-1, 10%);
                color: #fff;
            }
        }
    }
}
</style>
