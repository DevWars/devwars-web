<template>
    <Card class="plain dark">
        <div class="container">
            <h3>Schedule</h3>
            <Input v-model="date" label="Date" class="group"/>
            <Input v-model="time" label="Time" class="group"/>

            <h3>Game</h3>
            <Select v-model="schedule.mode" label="Game mode" class="group">
                <option value="Classic">Classic</option>
                <option value="Zen Garden">Zen Garden</option>
                <option value="Blitz">Blitz</option>
            </Select>
            <Input v-model="schedule.title" label="Theme" class="group"/>

            <h3>Objectives</h3>
            <div v-for="objective in schedule.objectives" :key="objective.id" class="objective">
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
                <Button class="link muted" @click.prevent="objectiveDelete(objective.id)">DELETE</Button>
            </div>
            <Button class="outline" @click="objectiveAdd">Add Objective</Button>
        </div>
    </Card>
</template>


<script>
import moment from 'moment';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import SquareToggle from '@/components/SquareToggle';
import { names } from '../../../utils/auth';

export default {
    name: 'DashboardScheduleSetup',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Select, SquareToggle },

    async fetch({ store }) {
        await store.dispatch('game/schedules');
    },

    data: () => ({
        date: '',
        time: '',
    }),

    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;
            return schedules.find((schedule) => schedule.id === Number(this.$route.query.schedule));
        },

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

    beforeMount() {
        this.date = moment(this.schedule.startTime).format('MM/DD/YYYY');
        this.time = moment(this.schedule.startTime).format('HH:mm');
    },

    methods: {
        objectiveUpdate(value, objectiveId) {
            this.$store.commit('game/updateScheduleObjective', {
                value,
                objectiveId,
                scheduleId: this.schedule.id,
            });
        },

        objectiveAdd() {
            let id = 1;
            Object.keys(this.schedule.objectives).map((obj) => {
                id = this.schedule.objectives[obj].id;
            });
            this.$store.commit('game/addScheduleObjective', {
                scheduleId: this.schedule.id,
                objective: {
                    id: id + 1,
                    description: '',
                    isBonus: false,
                },
            });
        },

        objectiveDelete(objectiveId) {
            this.$store.commit('game/deleteScheduleObjective', {
                scheduleId: this.schedule.id,
                objectiveId,
            });
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.container {
    max-width: 500px;
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
