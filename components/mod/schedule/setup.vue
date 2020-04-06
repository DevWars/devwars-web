<template>
    <Card v-if="currentSchedule != null" class="dark">
        <div class="container">
            <Card class="plain dark">
                <h3>Schedule</h3>
                <div class="input-container">
                    <Input
                        v-model="date"
                        type="date"
                        label="Date"
                        class="group"
                    />
                    <Input
                        v-model="time"
                        type="time"
                        label="Time"
                        class="group"
                    />
                </div>
                <h3>Game</h3>
                <Select
                    v-model="currentSchedule.mode"
                    label="Game mode"
                    class="group"
                >
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
                <Input
                    v-model="currentSchedule.title"
                    label="Theme"
                    class="group"
                />
            </Card>

            <Card class="dark plain">
                <h3>Objectives</h3>
                <div
                    v-for="objective in currentSchedule.objectives"
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
                <div class="template-container">
                    <Input
                        v-model="currentSchedule.templates.html"
                        label="Template HTML"
                        input-class="language"
                        input-id="lang-html"
                        :is-area="true"
                    />
                    <Input
                        v-model="currentSchedule.templates.css"
                        :is-area="true"
                        input-class="language"
                        input-id="lang-css"
                        label="Template CSS"
                    />
                    <Input
                        v-model="currentSchedule.templates.js"
                        :is-area="true"
                        input-class="language"
                        input-id="lang-js"
                        label="Template JS"
                    />
                </div>
            </Card>
        </div>
    </Card>
</template>

<script>
import moment from 'moment';
import { max, defaults } from 'lodash';

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
    data: () => ({
        time: '',
        date: '',
        currentSchedule: { objectives: {}, templates: {} },
        defaultSchedule: { objectives: {}, templates: {} },
    }),

    computed: {
        startTime() {
            const timestamp = `${this.date} ${this.time}`;
            return moment.utc(timestamp);
        },
    },

    watch: {
        startTime() {
            this.currentSchedule.startTime = this.startTime;
        },
        schedule() {
            this.currentSchedule = defaults(
                this.schedule,
                this.defaultSchedule,
            );
        },
    },

    beforeMount() {
        this.currentSchedule = defaults(this.schedule, this.defaultSchedule);
        const { startTime } = this.currentSchedule;

        this.date = moment(startTime)
            .utc()
            .format('YYYY-MM-DD');

        this.time = moment(startTime)
            .utc()
            .format('HH:mm');
    },

    methods: {
        updateScheduleTemplate(value, language) {
            this.currentSchedule.templates[language] = value;
            this.triggerScheduleRefresh();
        },

        objectiveUpdate(value, objectiveId) {
            this.currentSchedule.objectives[objectiveId].isBonus = value;
            this.triggerScheduleRefresh();
        },

        objectiveAdd() {
            const { objectives } = this.currentSchedule;

            let currentMax = max(Object.keys(objectives)) || 0;
            currentMax = Number(currentMax) + 1;

            this.currentSchedule.objectives[currentMax] = {
                id: currentMax,
                description: '',
                isBonus: false,
            };

            this.triggerScheduleRefresh();
        },

        objectiveDelete(objectiveId) {
            delete this.currentSchedule.objectives[objectiveId];
            this.triggerScheduleRefresh();
        },

        triggerScheduleRefresh() {
            this.$emit('update-schedule', this.currentSchedule);
        },
    },
};
</script>

<style lang="scss">
.language {
    max-width: 260px;
    min-height: 90px;
    resize: none;
}
</style>

<style lang="scss" scoped>
@import 'utils.scss';

h3 {
    margin-bottom: 20px;
}

.template-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 20px;
}

.input-container {
    display: flex;
}

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
