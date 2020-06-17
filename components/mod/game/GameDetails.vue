<template>
    <div v-if="currentGame != null" class="GameDetails">
        <Card class="plain dark">
            <Row>
                <Column :lg="4" :md="6">
                    <Card class="dark plain">
                        <h3>Game</h3>
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
                    <h3>
                        Templates
                        <Button
                            class="muted sm link"
                            @click="insertCommonTemplatesIntoTemplateFields"
                        >
                            Common
                        </Button>
                    </h3>
                    <Card class="dark plain template-container">
                        <Textarea
                            v-model="currentGame.templates.html"
                            placeholder="<html>Hi!</html>"
                            label="Template HTML"
                            input-class="language"
                            input-id="lang-html"
                            textarea
                        />
                        <Textarea
                            v-model="currentGame.templates.css"
                            placeholder="body { background: white; }"
                            input-class="language"
                            input-id="lang-css"
                            label="Template CSS"
                            textarea
                        />
                        <Textarea
                            v-model="currentGame.templates.js"
                            placeholder="console.log('hi!')"
                            input-class="language"
                            input-id="lang-js"
                            label="Template JS"
                            textarea
                        />
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
    </div>
</template>

<script>
import moment from 'moment';
import { defaults } from 'lodash';
import { names } from '../../../utils/auth';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Select from '@/components/form/Select';
import ObjectivesEdit from '@/components/mod/ObjectivesEdit';

export default {
    name: 'GameDetails',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Textarea, Select, ObjectivesEdit },

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        date: '',
        time: '',
        currentGame: {
            templates: {},
        },
        defaultGame: {
            templates: {},
        },
    }),

    computed: {
        startTime() {
            const timestamp = `${this.date} ${this.time}`;
            return moment.utc(timestamp);
        },
    },

    watch: {
        game(newGame) {
            this.currentGame = defaults(newGame, this.defaultGame);
        },
        startTime() {
            this.currentGame.startTime = this.startTime;
        },
    },

    beforeMount() {
        this.currentGame = defaults(this.game, this.defaultGame);
        const { startTime } = this.currentGame;

        this.date = moment(startTime)
            .utc()
            .format('YYYY-MM-DD');
        this.time = moment(startTime)
            .utc()
            .format('HH:mm');
    },

    methods: {
        /**
         * Inserts some common default templates into the schedule for a common
         * game setup.
         * @html => Core html to load the css styles and main js script
         * @css => Simple css to remove 'DevWars' style background from the preview.
         * @js => Working sample js to perform action on page load.
         *
         * The html has to be escaped otherwise it closes off the actual VueJS
         * template and thus would not build. I know its ugly.
         */
        insertCommonTemplatesIntoTemplateFields() {
            this.currentGame.templates = {
                html:
                    '<!doctype html>\r\n<html lang="en">\r\n    <head>\r\n        <meta charset="utf-8">\r\n        <meta name="viewport" content="width=device-width, initial-scale=1">\r\n' +
                    '        <link rel="stylesheet" href="game.css">\r\n    <\/head>\r\n\r\n    <body>\r\n        <script src="game.js"><\/script>\r\n    <\/body>\r\n<\/html>',
                css: 'body { background: white; }',
                js: 'window.addEventListener("load", () => { /** Loaded */ });',
            };

            this.$emit('update-game', this.currentGame);
        },

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
