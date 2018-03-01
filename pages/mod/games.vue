<template>
    <div>
        <div class="modpanel__header">
            <h1 class="modpanel__header-title">Games</h1>
            <div class="modpanel__header-actions">
                <div class="modpanel__header-search">
                    <input class="form-control labeless" type="text"
                           placeholder="Search for Game">
                </div>
                <button @click="createGame" class="btn btn-primary btn-icon btn-sm">
                    <i class="fa fa-plus"></i>
                    <span>Add Game</span>
                </button>
            </div>
        </div>

        <div class="modpanel__sort">
            <div class="modpanel__sort-main">
                <span>Showing All</span>
                <div class="select-container">
                    <select class="form-control">
                        <option value="Infinity">Show All</option>
                    </select>
                </div>
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
                    <th ng-click="$ctrl.sort('theme')">Theme</th>
                    <th ng-click="$ctrl.sort('gameMode')">Gamemode</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="game in all" :key="game.id">
                    <td data-type="Date">{{ game.timestamp | moment('MM/DD/YYYY') }}</td>
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

            <div class="modpanel-table__pagination">
                <a href="#" class="btn-link btn-icon">
                    <i class="fa fa-caret-left"></i>
                    <span>Prev</span>
                </a>
                <a href="#" class="btn-link btn-icon btn-icon-reverse">
                    <span>Next</span>
                    <i class="fa fa-caret-right"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import CreateGameModal from '~/components/modal/CreateGameModal';

    @Component({
        components: {}
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
