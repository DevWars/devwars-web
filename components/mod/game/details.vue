<template>
    <Card class="plain dark">
        <Row v-if="currentGame != null">
            <Column :lg="4" :md="6">
                <Card class="dark plain">
                    <h3>Game</h3>
                    <Select
                        v-model="currentGame.mode"
                        label="Game mode"
                        class="group"
                    >
                        <option value="Classic">Classic</option>
                        <option value="Zen Garden">Zen Garden</option>
                        <option value="Blitz">Blitz</option>
                    </Select>
                    <Input
                        v-model="currentGame.title"
                        placeholder="The title of the name, e.g Battleships!"
                        label="Theme"
                        class="group"
                    />
                </Card>
            </Column>

            <Column :lg="4" :md="6">
                <Card class="dark plain">
                    <h3>Objectives</h3>
                    <div
                        v-for="objective in currentGame.objectives"
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
            </Column>

            <Column :lg="4" :md="6">
                <Card class="dark plain media">
                    <h3>Media</h3>
                    <Input
                        v-model="currentGame.videoUrl"
                        label="YouTube URL"
                        class="group"
                    />
                </Card>
            </Column>
        </Row>
    </Card>
</template>

<script>
import { defaults } from 'lodash';

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

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        date: '',
        time: '',
        currentGame: {},
        defaultGame: {},
    }),

    watch: {
        game() {
            this.currentGame = defaults(this.game, this.defaultGame);
        },
    },

    beforeMount() {
        this.currentGame = defaults(this.game, this.defaultGame);
    },

    methods: {
        objectiveIsBonusUpdate(isBonus, objectiveId) {
            if (
                this.currentGame != null &&
                this.currentGame.objectives[objectiveId] != null
            ) {
                this.currentGame.objectives[objectiveId].isBonus = isBonus;
                this.$emit('update-game', this.currentGame);
            }
        },

        objectiveAdd() {
            let id = 1;
            Object.keys(this.currentGame.objectives).map((obj) => {
                id = this.currentGame.objectives[obj].id;
            });

            this.currentGame.objectives[id + 1] = {
                id: id + 1,
                description: '',
                isBonus: false,
            };

            this.$emit('update-game', this.currentGame);
        },

        objectiveDelete(objectiveId) {
            delete this.currentGame.objectives[objectiveId];
            this.$emit('update-game', this.currentGame);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

h3 {
    margin-bottom: 20px;
}

.Row {
    .Column {
        &:not(:last-child) {
            padding: 0 $grid-gutter-width;
            border-right: 1px solid $divider-color;
        }
    }

    .Card {
        box-shadow: none;
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

    .Button:hover {
        color: $danger-color !important;
    }
}
</style>
