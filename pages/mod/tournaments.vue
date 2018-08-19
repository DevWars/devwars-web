<template>
    <div>
        <div class="modpanel__header">
            <h1 class="modpanel__header-title">Tournaments</h1>
            <div class="modpanel__header-actions">
                <div class="modpanel__header-search">
                    <Input class="labeless" placeholder="Search for Tournament" />
                </div>
                <button class="btn btn-primary btn-icon btn-sm">
                    <i class="fa fa-plus"></i>
                    <span>Add Tournament</span>
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
                    <th>Date</th>
                    <th>Status</th>
                    <th>Tournament Name</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-type="Date">11/04/2018</td>
                    <td data-type="Status">
                        <span class="mod-status preparing">&nbsp;</span>
                    </td>
                    <td data-type="Tournament Name">DigitalOcean Tournament</td>
                    <td class="modpanel-table__actions" data-type="Edit">
                        <nuxt-link to="" class="btn-link btn-icon-reverse">
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

    import Input from '~/components/form/Input';

    @Component({
        components: { Input }
    })

    export default class DashboardTournaments extends Vue {

    }
</script>
