<template>
    <Card class="plain dark">
        <div class="container">
            <div class="game">
                <h3>Game</h3>

                <Select v-model="game.mode" label="Game mode" class="group">
                    <option value="Classic">Classic</option>
                    <option value="Zen Garden">Zen Garden</option>
                    <option value="Blitz">Blitz</option>
                </Select>

                <Input v-model="game.title" label="Theme" class="group" />
            </div>

            <div class="objectives">
                <h3>Objectives</h3>
                <div
                    v-for="objective in game.objectives"
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
                        @click.prevent="objectiveDelete(objective.id)"
                    >
                        DELETE
                    </Button>
                </div>
                <Button class="outline" @click="objectiveAdd">
                    Add Objective
                </Button>
            </div>

            <div class="media">
                <h3>Media</h3>
                <Input
                    v-model="game.videoUrl"
                    label="YouTube URL"
                    class="group"
                />
            </div>
        </div>
    </Card>
</template>

<script>
import SquareToggle from '../../../components/SquareToggle';
import { names } from '../../../utils/auth';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import { teams } from '@/utils/mixins';

export default {
    name: 'DashboardGameDetails',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, SquareToggle, Input, Select },

    mixins: [teams],

    data: () => ({
        date: '',
        time: '',
    }),

    computed: {
        game() {
            const { game: id } = this.$route.query;
            return this.$store.getters['game/gameById'](id);
        },
    },

    methods: {
        objectiveIsBonusUpdate(isBonus, objectiveId) {
            this.$store.commit('game/updateObjectIsBonusState', {
                isBonus,
                objectiveId,
            });
        },

        objectiveUpdate(value, objectiveId) {
            this.$store.commit('game/updateScheduleObjective', {
                scheduleId: this.game.schedule,
                objectiveId,
                value,
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
    max-width: 650px;
}

.media {
    margin-top: 25px;
}

.game h3 {
    padding-bottom: 10px;
}

.objective {
    display: flex;
    margin: 15px 0 15px 0;

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
