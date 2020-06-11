<template>
    <div v-if="currentGame != null" class="GameDetails">
        <Card class="plain dark">
            <Row>
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
                            placeholder="Game title (e.g Battleships)"
                            label="Theme"
                            class="group"
                        />
                    </Card>
                </Column>

                <Column :lg="4" :md="6">
                    <ObjectivesEdit
                        :objectives="currentGame.objectives"
                        @updateObjectives="triggerUpdateObjectives"
                    />
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
    </div>
</template>

<script>
import { defaults } from 'lodash';
import { names } from '../../../utils/auth';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import ObjectivesEdit from '@/components/mod/ObjectivesEdit';
import { teams } from '@/utils/mixins';

export default {
    name: 'GameDetails',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Select, ObjectivesEdit },

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
        triggerUpdateObjectives(objectives) {
            this.currentGame.objectives = Object.assign({}, objectives);
            this.$emit('update-game', this.currentGame);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.GameDetails {
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
}
</style>
