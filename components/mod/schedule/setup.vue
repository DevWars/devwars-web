<template>
    <Card v-if="currentSchedule != null" class="dark plain">
        <div class="container">
            <Card class="dark">
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
                    placeholder="The title of the name, e.g Battleships!"
                    label="Theme"
                    class="group"
                />
            </Card>

            <Card class="dark">
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

            <Card class="dark">
                <h3>
                    Templates
                    <Button
                        class="muted sm link"
                        @click="insertCommonTemplatesIntoTemplateFields"
                    >
                        Common
                    </Button>
                </h3>
                <div class="template-container">
                    <Textarea
                        v-model="currentSchedule.templates.html"
                        placeholder="<html>Hi!</html>"
                        label="Template HTML"
                    />
                    <Textarea
                        v-model="currentSchedule.templates.css"
                        placeholder="body { background: white; }"
                        label="Template CSS"
                    />
                    <Textarea
                        v-model="currentSchedule.templates.js"
                        placeholder="console.log('hi!')"
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
import Textarea from '@/components/form/Textarea';
import Select from '@/components/form/Select';
import SquareToggle from '@/components/SquareToggle';

export default {
    name: 'DashboardScheduleSetup',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Textarea, Select, SquareToggle },

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
        defaultSchedule: {
            objectives: {},
            templates: { html: '', css: '', js: '' },
        },
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
        /**
         * Updates the given language template with the updated template value.
         * @param {string} value The updated template value for the given language
         * @param {string} language The language being assigned the given template.
         */
        updateScheduleTemplate(value, language) {
            this.currentSchedule.templates[language] = value;
            this.triggerScheduleRefresh();
        },

        /**
         * Updates the given objectives bonus state by setting the given value.
         * @param {string} value The updated bonus state value for the given objective.
         * @param {string} objectiveId The id of the objective being updated.
         */
        objectiveUpdate(value, objectiveId) {
            this.currentSchedule.objectives[objectiveId].isBonus = value;
            this.triggerScheduleRefresh();
        },

        /**
         * Creates a new objective for the current schedule, applying the next
         * id with no description and no bonus state.
         */
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

        /**
         * Removes a given objective by the given id from the schedule.
         * @param {string} objectiveId The id of the objective being removed.
         */
        objectiveDelete(objectiveId) {
            delete this.currentSchedule.objectives[objectiveId];
            this.triggerScheduleRefresh();
        },

        /**
         * Inserts some common default templates into the schedule for a common
         * game setup.
         * @html => Core html to load the css styles and main js script
         * @css => Simple css to remove 'DevWars' style background from the
         * preview.
         * @js => Working sample js to perform action on page load.
         *
         * The html has to be escaped otherwise it closes off the actual VueJS
         * template and thus would not build. I know its ugly.
         */
        insertCommonTemplatesIntoTemplateFields() {
            this.schedule.templates = {
                html:
                    '<!doctype html>\r\n<html lang="en">\r\n    <head>\r\n        <meta charset="utf-8">\r\n        <meta name="viewport" content="width=device-width, initial-scale=1">\r\n' +
                    '        <link rel="stylesheet" href="game.css">\r\n    <\/head>\r\n\r\n    <body>\r\n        <script src="game.js"><\/script>\r\n    <\/body>\r\n<\/html>',
                css: 'body { background: white; }',
                js: 'window.addEventListener("load", () => { /** Loaded */ });',
            };

            this.triggerScheduleRefresh();
        },

        /**
         * Emits a event to the parent control to update the current schedule with
         * the newly updated schedule. This ensures that the parent passes down the
         * updated schedule to update the UI.
         */
        triggerScheduleRefresh() {
            this.$emit('update-schedule', this.currentSchedule);
        },
    },
};
</script>

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
