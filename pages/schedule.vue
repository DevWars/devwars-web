<template>
    <div>
        <PageBanner title="Schedule">
            <Select v-model="filter" class="clear">
                <option value selected="selected">Filter by</option>
                <option>Classic</option>
                <option>Zen Garden</option>
                <option>Blitz</option>
            </Select>
        </PageBanner>

        <div class="footer-offset">
            <Container>
                <ScheduleBlock :filter="filter"/>
            </Container>
        </div>
    </div>
</template>


<script>
import PageBanner from '~/components/layout/PageBanner';
import Select from '~/components/form/Select';
import ScheduleBlock from '~/components/game/ScheduleBlock';

export default {
    name: 'Schedule',

    components: { Select, PageBanner, ScheduleBlock },

    data: () => {
        return {
            filter: '',
        };
    },
};
</script>

