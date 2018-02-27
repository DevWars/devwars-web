<template>
    <div class="dashboard-card">
        <div class="dashboard-card__header">
            <i class="dashboard-card__icon fa fa-bar-chart"></i>
            <h4 class="dashboard-card__title">Activity Log</h4>
        </div>

        <ul class="activity-history">
            <li class="activity-history__item" :key="activity.id" v-for="activity in paged.data">
                <div class="activity-history__date">{{ activity.created_at | moment('mediumDate') }}</div>
                <div class="activity-history__title">{{ activity.description}}</div>
                <div class="activity-history__rewards">
                    <div class="activity-history__reward" v-if="activity.bits" :class="[activity.bits > 0 ? 'win' : '']">{{ (activity.bits) }} DevBits</div>
                    <div class="activity-history__reward" v-if="activity.xp" :class="[activity.xp > 0 ? 'win' : '']">{{ (activity.xp) }} XP
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        props: ['paged']
    })
    export default class Activities extends Vue {

    }
</script>
