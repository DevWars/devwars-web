<template>
    <Card class="plain dark">
        <div class="container">
            <h3>Game</h3>
            <Select v-model="game.mode" label="Game mode" class="group">
                <option value="Classic">Classic</option>
                <option value="Zen Garden">Zen Garden</option>
                <option value="Blitz">Blitz</option>
            </Select>

            <Input v-model="game.title" label="Theme" class="group"/>

            <h3>Objectives</h3>
            <div v-for="objective in game.objectives" :key="objective.id" class="objective">
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

            <h3>Media</h3>
            <Input v-model="game.videoUrl" label="YouTube URL" class="group"/>

            <!-- <h3>Votes</h3>
            <Row>
                <Column v-for="team in teams" :key="team.id" :sm="6">
                    <div v-for="vote in team.votes" :key="vote.id">
                        <Input
                            :value="vote"
                            :label="`
                                ${Object.keys(team.votes).find(key => team.votes[key] === vote)}
                                -${team.name | capitalize} Votes
                            `"
                            class="group"
                            @change="updated => team.votes[vote] = updated"
                        />
                    </div>
                </Column>
            </Row>-->

            <!--
            <h3>Files</h3>
            <Row>
                <Column :sm="6">
                    <Input type="file" label="Blue Files" class="group"/>
                </Column>
                <Column :sm="6">
                    <Input type="file" label="Red Files" class="group"/>
                </Column>
            </Row>-->
        </div>
    </Card>
</template>


<script>
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import SquareToggle from '../../../components/SquareToggle';
import { teams } from '@/utils/mixins';
import { names } from '../../../utils/auth';

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
            const games = this.$store.state.game.game;
            return Array(games).find((game) => game.id === Number(this.$route.query.game));
        },
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

