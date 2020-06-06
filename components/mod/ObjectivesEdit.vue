<template>
    <Card class="ObjectivesEdit dark plain">
        <h3>Objectives</h3>

        <div
            v-for="objective in objectives"
            :key="objective.id"
            class="objective"
        >
            <Input
                v-model="objective.description"
                :label="`Objective ${objective.id}`"
                maxlength="110"
            />
            <SquareToggle
                :active="objective.isBonus"
                name="bonus"
                @change="objectiveIsBonusUpdate($event, objective.id)"
            />
            <Button
                class="link muted"
                @click="objectiveDelete(objective.id)"
            >
                DELETE
            </Button>
        </div>
        <Button class="outline" @click="objectiveAdd">
            Add Objective
        </Button>
    </Card>
</template>

<script>
import { max } from 'lodash';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import SquareToggle from '@/components/SquareToggle';

export default {
    name: 'ObjectivesEdit',

    components: { Card, Input, SquareToggle },

    props: {
        objectives: {
            type: Object,
            required: true,
        },
    },

    watch: {
        objectives(newObjectives) {
            this.objectives = newObjectives;
        },
    },

    methods: {
        /**
         * Updates the given objectives bonus state by setting the given value.
         * @param {string} value The updated bonus state value for the given objective.
         * @param {string} objectiveId The id of the objective being updated.
         */
        objectiveIsBonusUpdate(value, objectiveId) {
            this.objectives[objectiveId].isBonus = value;
            this.refresh();
        },

        /**
         * Creates a new objective for the current schedule/game, applying the next
         * id with no description and no bonus state.
         */
        objectiveAdd() {
            let currentMax = max(Object.keys(this.objectives)) || 0;
            currentMax = Number(currentMax) + 1;

            this.objectives[currentMax] = {
                id: currentMax,
                description: '',
                isBonus: false,
            };

            this.refresh();
        },

        /**
         * Removes a given objective by the given id from the schedule/game.
         * @param {string} objectiveId The id of the objective being removed.
         */
        objectiveDelete(objectiveId) {
            delete this.objectives[objectiveId];
            this.refresh();
        },

        /**
         * Emits a event to the parent control to update the current schedule/game
         * with the newly updated schedule/game. This ensures that the parent passes down
         * the updated schedule/game to update the UI.
         */
        refresh() {
            this.$emit('updateObjectives', this.objectives);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.ObjectivesEdit {
    h3 {
        margin-bottom: 20px;
    }

    .objective {
        display: flex;
        margin-bottom: 15px;

        & > :not(.Input) {
            @extend %align-baseline-to-input-with-labels;
        }

        .Input {
            margin-right: 15px;
        }

        .Button:hover {
            color: $danger-color !important;
        }
    }
}
</style>
