<template>
    <div>
        <PageBanner title="Schedule">
            <select v-model="filter" class="select--clear">
                <option value="" selected="selected">Filter by</option>
                <option>Classic</option>
                <option>Zen Garden</option>
                <option>Blitz</option>
            </select>
        </PageBanner>

        <div class="footer-offset">
            <div class="container">
                <ScheduleBlock :filter="filter"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';

    import PageBanner from '~/components/layout/PageBanner';
    import ScheduleBlock from '~/components/game/ScheduleBlock';

    export default {
        name: "Schedule",
        components: { PageBanner, ScheduleBlock },
        data: () => {
            return {
                filter: ''
            }
        }        
    }
</script>
