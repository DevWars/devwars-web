<template>
    <div>
        <PanelHeader title="Tournament">
            <ButtonIcon icon="fa fa-plus" class="primary sm">Add Tournament</ButtonIcon>
        </PanelHeader>

        <ListingFilters/>

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Tournament Name</th>
                <th>&nbsp;</th>
            </tr>

            <tr>
                <td data-type="Date">11/04/2018</td>
                <td>
                    <strong class="mod-status preparing">PREPARING</strong>
                </td>
                <td>DigitalOcean Tournament</td>
                <td>
                    <Button class="link">Edit</Button>
                </td>
            </tr>
        </Table>

        <Pagination/>
    </div>
</template>


<script>
import PanelHeader from '~/components/mod/PanelHeader';
import ListingFilters from '~/components/mod/ListingFilters';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import { names } from '../../utils/auth';

export default {
    name: 'ModTournaments',
    meta: {
        auth: names.MODERATOR,
    },
    components: { PanelHeader, ListingFilters, Table, Pagination },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

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
