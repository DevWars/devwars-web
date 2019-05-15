<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Schedule</h3>
            <div class="form-group">
                <Input v-model="date"/>
                <label>Date</label>
            </div>
            <div class="form-group">
                <Input v-model="time"/>
                <label>Time</label>
            </div>

            <h3 class="modpanel__subtitle">Game</h3>
            <div class="form-group">
                <Select v-model="schedule.mode" :selected="schedule.mode">
                    <option value></option>
                    <option value="Classic">Classic</option>
                    <option value="Zen Garden">Zen Garden</option>
                    <option value="Blitz">Blitz</option>
                </Select>
                <label>Gamemode</label>
            </div>
            <div class="form-group">
                <Input v-model="schedule.title"/>
                <label>Theme</label>
            </div>

            <h3 class="modpanel__subtitle">Objectives</h3>
            <div
                v-for="objective in schedule.objectives"
                :key="objective.id"
                class="objective form-group"
            >
                <Input v-model="objective.description" maxlength="110"/>
                <label>Objective #{{ objective.id }} {{ objective.isBonus ? '(Bonus)' : '' }}</label>
                <SquareToggle
                    :active="objective.isBonus"
                    name="bonus"
                    @change="objectiveUpdate($event, objective.id)"
                />
                <button class="btn btn-link" @click.prevent="objectiveDelete(objective.id)">DELETE</button>
            </div>
        </form>
        <button class="btn btn-outline-white" @click="objectiveAdd">Add Objective</button>
    </div>
</template>


<script>
import moment from 'moment';

import Input from '~/components/form/Input';
import Select from '~/components/form/Select';
import SquareToggle from '~/components/SquareToggle';
import { roles } from '../../../utils/auth';

export default {
    name: 'DashboardScheduleSetup',
    meta: {
        auth: [roles.moderator, roles.admin],
    },
    components: { Input, Select, SquareToggle },
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
    async fetch({ store }) {
        await store.dispatch('game/schedules');
    },
    mounted() {
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

.objective {
    display: flex;

    .btn {
        color: $text-color-muted;

        &:hover {
            color: $danger-color;
        }
    }
}
</style>
