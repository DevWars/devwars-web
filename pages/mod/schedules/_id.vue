<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <a href="/mod/schedules" class="btn btn-outline-gray">Back</a>
            <button class="btn btn-primary" disabled>Save</button>
            <button class="btn btn-secondary" disabled>Delete</button>
        </PanelHeader>

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
                        <SquareToggle :active="objective.isBonus" name="bonus"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import moment from 'moment';
import PanelHeader from '~/components/mod/PanelHeader';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';
import SquareToggle from '~/components/SquareToggle';

export default {
    name: 'DashboardSchedule',
    components: { PanelHeader, Input, Select, SquareToggle },
    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;

            return schedules.find(
                (schedule) => schedule.id === Number(this.$route.params.id)
            );
        },
        startDate() {
            return moment(this.schedule.startTime).format('MMMM D, YYYY');
        },
        startTime() {
            return moment(this.schedule.startTime).format('HH:mm');
        },
    },
    async fetch({ store }) {
        await store.dispatch('game/schedules');
    },
};
</script>
