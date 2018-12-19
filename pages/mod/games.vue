<template>
    <div>
        <PanelHeader title="Games">
            <div class="modpanel__header-search">
                <Input class="labeless" placeholder="Search for Game" />
            </div>
            <button @click="createGame" class="btn btn-primary btn-icon btn-sm">
                <i class="fa fa-plus"></i>
                <span>Add Game</span>
            </button>
        </PanelHeader>

        <div class="modpanel__sort">
            <div class="modpanel__sort-main">
                <span>Showing All</span>
                <Select>
                    <option value="Infinity" selected>Show All</option>
                </Select>
            </div>
            <div class="modpanel__sort-actions">
                <button class="modpanel__sort-settings">
                    <i class="fa fa-gear" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <div class="modpanel-table">
            <table>
                <thead>
                <tr>
                    <th ng-click="$ctrl.sort('date')">Date</th>
                    <th ng-click="$ctrl.sort('Status')">Status</th>
                    <th ng-click="$ctrl.sort('theme')">Theme</th>
                    <th ng-click="$ctrl.sort('gameMode')">Gamemode</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="game in all" :key="game.id">
                    <td data-type="Date">{{ game.timestamp | moment('MM/DD/YYYY') }}</td>
                    <td data-type="Status">
                        <span :class="['mod-status', name_from_status(game.status).toLowerCase()]">{{ name_from_status(game.status) }}</span>
                    </td>
                    <td data-type="Theme">{{ game.theme }}</td>
                    <td data-type="Game Mode">{{ game.name }}</td>
                    <td class="modpanel-table__actions" data-type="Edit">
                        <nuxt-link :to="'/mod/game/brief?game=' + game.id" class="btn-link btn-icon-reverse">
                            <span>Edit</span>
                            <i class="fa fa-caret-down"></i>
                        </nuxt-link>
                    </td>
                </tr>
                </tbody>
            </table>

            <Pagination />
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import CreateGameModal from '~/components/modal/CreateGameModal';
    import PanelHeader from '~/components/mod/PanelHeader';
    import Select from '~/components/form/Select';
    import Input from '~/components/form/Input';
    import Pagination from '~/components/Pagination';

    import {name_from_status} from '../../utils/game-status';

    @Component({
        components: { PanelHeader, Select, Input, Pagination },
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
