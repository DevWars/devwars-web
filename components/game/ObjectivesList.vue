<template>
    <SubScore
        v-if="currentTeams != null"
        class="ObjectivesList"
        title="Objectives"
        :blue-score="currentTeams[0].completedObjectives"
        :red-score="currentTeams[1].completedObjectives"
    >
        <ul class="objectives">
            <li
                v-for="objective in game.objectives"
                :key="objective.id"
                class="objective"
                :class="{ bonus: objective.isBonus }"
            >
                <div
                    class="box blue"
                    :class="{ active: currentTeams[0].objectives[objective.id] === 'complete' }"
                    @click="$emit('blueObjective', objective)"
                />
                <span>{{ objective.description }}</span>
                <div
                    class="box red"
                    :class="{ active: currentTeams[1].objectives[objective.id] === 'complete' }"
                    @click="$emit('redObjective', objective)"
                />
            </li>
        </ul>
    </SubScore>
</template>

<script>
import SubScore from '@/components/game/SubScore';
import { teams } from '@/utils/mixins';

export default {
    name: 'ObjectivesList',

    components: { SubScore },

    mixins: [teams],

    props: {
        game: { type: Object, required: true },
        players: { type: Array, required: true },
    },

    computed: {
        currentTeams() {
            return this.teams(this.game, this.players);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.ObjectivesList {
    .objectives {
        @extend %list-unstyled;
    }

    .objective {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: $s-space;
        text-align: center;

        span {
            margin: 0 $grid-gutter-width;
        }

        &.bonus {
            color: $bonus-color;
        }
    }

    .box {
        width: 30px;
        height: 30px;
        border: 5px solid #23252c;

        &.blue.active {
            background-color: $brand-primary;
        }

        &.red.active {
            background-color: $brand-secondary;
        }
    }

    .objective.bonus .box.active {
        background-color: $bonus-color;
    }
}
</style>
