<template>
    <div>
        <PanelHeader title="Games" showSearch>
            <button @click="createGame" class="btn btn-primary btn-icon btn-sm">
                <i class="fa fa-plus"></i>
                <span>Add Game</span>
            </button>
        </PanelHeader>

        <ListingFilters />

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="game in all" :key="game.id">
                <td>{{ game.timestamp | moment('MM/DD/YYYY') }}</td>
                <td>
                    <span :class="['mod-status', name_from_status(game.status).toLowerCase()]">{{ name_from_status(game.status) }}</span>
                </td>
                <td>{{ game.theme }}</td>
                <td>{{ game.name }}</td>
                <td>
                    <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="btn-link">Edit</nuxt-link>
                </td>
            </tr>
        </Table>

        <Pagination />
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import CreateGameModal from '~/components/modal/CreateGameModal';
    import PanelHeader from '~/components/mod/PanelHeader';
    import ListingFilters from '~/components/mod/ListingFilters';
    import Table from '~/components/Table';
    import Input from '~/components/form/Input';
    import Pagination from '~/components/Pagination';

    import {name_from_status} from '../../utils/game-status';

    @Component({
        components: { PanelHeader, ListingFilters, Table, Input, Pagination },
        methods: {name_from_status},
    })

    export default class DashboardGames extends Vue {
        @State(state => state.game.all) all;

        createGame() {
            this.$open(CreateGameModal, {});
        }

        async fetch({store}) {
            await store.dispatch('game/all');
        }
    }
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.mod-status {
    font-weight: $font-weight-bold;

    &.scheduled {
        color: $info-color;
    }

    &.preparing {
        color: $warning-color;
    }

    &.live {
        color: $danger-color;
    }

    &.active,
    &.complete {
        color: $success-color;
    }

    &.ended {
        color: $text-color-muted;
    }
}
</style>
