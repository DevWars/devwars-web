<template>
    <div>
        <div class="ribbon"></div>
        <div class="container">
            <div class="row-lift">
                <div class="heading">
                    <h1>Schedule</h1>
                    <select v-model="filter" class="select--clear">
                        <option value="" selected="selected">Filter by</option>
                        <option>Classic</option>
                        <option>Zen Garden</option>
                        <option>Blitz</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="footer-offset">
            <div class="container">
                <ScheduleBlock :filter="filter"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import ScheduleBlock from '~/components/game/ScheduleBlock';

    @Component({
        components: {ScheduleBlock}
    })
    export default class Schedule extends Vue {
        filter = '';
    }
</script>
