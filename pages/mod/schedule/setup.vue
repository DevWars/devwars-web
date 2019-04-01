<template>
    <div class="mod-card">
        <form class="mod-form">
            <h3 class="modpanel__subtitle">Schedule</h3>
            <div class="form-group">
                <Input v-model="schedule.startTime"/>
                <label>Date</label>
            </div>
            <h3 class="modpanel__subtitle">Game</h3>
            <div class="form-group">
                <Select v-model="schedule.mode">
                    <option value></option>
                    <option>Classic</option>
                    <option>Zen Garden</option>
                    <option>Blitz</option>
                </Select>
                <label>Game mode</label>
            </div>
            <div class="form-group">
                <Input v-model="schedule.title"/>
                <label>Theme</label>
            </div>

            <h3 class="modpanel__subtitle">Objectives</h3>
            <div
                v-for="objective in schedule.objectives"
                :key="objective.id"
                class="mod-objectives form-group"
            >
                <div class="mod-objectives__input">
                    <Input v-model="objective.description" maxlength="110"/>
                    <label>Objective #{{ objective.id }} {{ objective.isBonus ? '(Bonus)' : '' }}</label>
                    <SquareToggle  :active="objective.isBonus"
                         name="bonus" @change="objectiveUpdate($event, objective.id)"/>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
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
    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;

            return schedules.find(
                (schedule) => schedule.id === Number(this.$route.query.schedule)
            );
        },
    },
    async fetch({ store }) {
        await store.dispatch('game/schedules');
    },
    methods: {
        objectiveUpdate(value, objectiveId) {
            this.$store.dispatch('game/updateScheduleObjective', {
                value,
                objectiveId,
                scheduleId: this.schedule.id,
            });
        },
    },
};
</script>
