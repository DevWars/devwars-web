<template>
    <div>
        <PanelHeader title="Tournament">
            <button @click="createTournament" class="btn btn-primary btn-icon btn-sm">
                <i class="fa fa-plus"></i>
                <span>Add Tournament</span>
            </button>
        </PanelHeader>

        <ListingFilters />

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Tournament Name</th>
                <th>&nbsp;</th>
            </tr>

            <tr>
                <td data-type="Date">11/04/2018</td>
                <td><strong class="mod-status preparing">PREPARING</strong></td>
                <td>DigitalOcean Tournament</td>
                <td><nuxt-link to="" class="btn-link">Edit</nuxt-link></td>
            </tr>
        </Table>

        <Pagination />
    </div>
</template>

<script>
    import Vue from 'vue';

    import PanelHeader from '~/components/mod/PanelHeader';
    import ListingFilters from '~/components/mod/ListingFilters';
    import Table from '~/components/Table';
    import Input from '~/components/form/Input';
    import Pagination from '~/components/Pagination';

    export default {
        name: "modTournaments",
        components: { PanelHeader, ListingFilters, Table, Input, Pagination },
        methods: {
            createTournament() {
                
            }
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
