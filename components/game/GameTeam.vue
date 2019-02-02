<template>
    <div class="GameTeam row" :class="team">
        <div class="header">
            <h3 class="team">{{ team }}</h3>
            <span v-if="points" class="points">{{ points }}</span>
        </div>

        <div class="players">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import { Prop } from 'vue-property-decorator';
    import Player from '~/components/game/Player';

    @Component({
        components: { Player },
        props: {
            team: String,
            points: Number,
        },
    })
    export default class GameTeam extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils.scss';

.GameTeam {

    .Player {
        padding-left: 20px;
        padding-right: 20px;
    }

    .header {
        min-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: $border-size;
        border-bottom-style: solid;
        padding: 0 20px;
        text-transform: uppercase;
    }

    .players {
        padding: 10px 0;
    }

    .team {
        font-weight: $font-weight-bold;
        font-size: 24px;
    }

    .points {
        font-size: 42px;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(#fff, 0.6);
        color: #fff;
    }

    // Variations
    @mixin games-team-variant($team, $color) {
        &.#{$team} .header {
            border-color: $color;
            background: linear-gradient(
                to left,
                rgba($color, 0.3),
                transparent
            );
        }

        &.#{$team} .team {
            color: $color;
        }
    }

    @include games-team-variant(blue, $brand-primary);
    @include games-team-variant(red, $brand-secondary);
}
</style>
