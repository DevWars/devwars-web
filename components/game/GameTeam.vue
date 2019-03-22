<template>
    <div class="GameTeam" :class="team.name">
        <div class="header">
            <h3 v-if="team" class="team">{{ team.name }}</h3>
            <span v-if="winner" class="winner">Win</span>
            <span v-if="points" class="points">{{ points ? points : 0 }}</span>
        </div>

        <div class="players">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'GameTeam',
    props: {
        team: {
            type: Object,
            required: true,
        },
        points: {
            type: Number,
            required: true,
        },
        winner: {
            type: Boolean,
            required: false,
        },
    },
};
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
        margin-right: auto;
    }

    .points {
        font-size: 42px;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(#fff, 0.6);
        color: #fff;
    }

    .winner {
        padding: 0 $s-space;
        color: $success-color;
        font-weight: bold;
        font-size: 18px;
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
