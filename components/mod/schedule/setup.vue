<template>
    <Card class="dark">
        <div class="container">
            <Card class="plain dark">
                <h3>Schedule</h3>
                <Input v-model="date" label="Date" class="group" />
                <Input v-model="time" label="Time" class="group" />

                <h3>Game</h3>
                <Select v-model="schedule.mode" label="Game mode" class="group">
                    <option value="Classic">
                        Classic
                    </option>
                    <option value="Zen Garden">
                        Zen Garden
                    </option>
                    <option value="Blitz">
                        Blitz
                    </option>
                </Select>
                <Input v-model="schedule.title" label="Theme" class="group" />
            </Card>

            <Card class="dark plain">
                <h3>Objectives</h3>
                <div
                    v-for="objective in schedule.objectives"
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
                        @change="objectiveUpdate($event, objective.id)"
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

            <Card class="dark plain">
                <h3>Templates</h3>
                <Input
                    v-model="schedule.templates.html"
                    label="Template HTML"
                />
                <Input v-model="schedule.templates.html" label="Template CSS" />
                <Input v-model="schedule.templates.html" label="Template JS" />
            </Card>
        </div>
    </Card>
</template>

<script>
import moment from 'moment';
import { max } from 'lodash';

import { names } from '../../../utils/auth';

import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import SquareToggle from '@/components/SquareToggle';

export default {
    name: 'DashboardScheduleSetup',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Select, SquareToggle },

    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },

    // date and time are setup before mount.
    data: () => ({ activeSchedule: null }),

    computed: {
        startTime() {
            const timestamp = `${this.date} ${this.time}`;
            return moment.utc(timestamp);
        },
    },

    watch: {
        startTime() {
            this.schedule.startTime = this.startTime;
        },
    },

    mounted() {
        // update the internal property so we don't get bi-directional issues.
        this.activeSchedule = this.schedule;
    },

    beforeMount() {
        this.date = moment(this.schedule.startTime).format('MM/DD/YYYY');
        this.time = moment(this.schedule.startTime).format('HH:mm');
    },

    methods: {
        updateScheduleTemplate(value, language) {
            this.schedule.templates[language] = value;
            this.triggerScheduleRefresh();
        },

        objectiveUpdate(value, objectiveId) {
            this.schedule.objective[objectiveId] = value;
            this.triggerScheduleRefresh();
        },

        objectiveAdd() {
            let currentMax = max(Object.keys(this.schedule.objectives)) || 0;
            currentMax = Number(currentMax) + 1;

            this.schedule.objectives[currentMax] = {
                id: currentMax,
                description: '',
                isBonus: false,
            };

            this.triggerScheduleRefresh();
        },

        objectiveDelete(objectiveId) {
            delete this.schedule.objectives[objectiveId];
            this.triggerScheduleRefresh();
        },

        triggerScheduleRefresh() {
            this.$emit('update-schedule', this.schedule);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px;

    .Card {
        margin: 5px;
        max-width: 500px;
        min-width: 300px;
        min-height: 450px;
    }
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

    .Button {
        &:hover {
            color: $danger-color;
        }
    }
}
</style>
