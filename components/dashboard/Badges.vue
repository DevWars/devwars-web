<template>
    <div class="dashboard-card">
        <div class="dashboard-card__header">
            <i class="dashboard-card__icon fa fa-shield"></i>
            <h4 class="dashboard-card__title">Badges</h4>
        </div>

        <div class="dashboard-badges">
            <div class="dashboard-badges__overview">
                <i class="dashboard-badges__icon fa fa-shield"></i>
                <p class="dashboard-badges__total">{{owned.length }}</p>
            </div>

            <nuxt-link to="/badges" class="btn btn-outline-white btn-sm">View Badges</nuxt-link>

            <div class="progress-header">
                <span class="progress-header__title">Badges</span>
                <span class="progress-header__meta">{{ owned.length }}/{{ badges.length }}</span>
            </div>
            <div class="progress">
                <div class="progress__bar"
                     :style="{width:  (owned.length / badges.length * 100)  + '%'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({props: ['owned']})
    export default class Badges extends Vue {
        @State(state => state.badges.badges) badges;
    }
</script>
