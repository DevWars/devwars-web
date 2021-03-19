<template>
    <div class="GameProjectTeam">
        <div class="teamActions">
            <div>
                <Icon
                    name="code"
                    :class="{ dimmed: viewSite }"
                    @click="viewSite = false"
                />
                <Icon
                    name="window-maximize"
                    :class="{ dimmed: !viewSite }"
                    @click="viewSite = true"
                />
            </div>

            <Icon v-if="expanded" name="compress-alt" @click="$emit('expandTeam', null)" />
            <Icon v-else name="expand-alt" @click="$emit('expandTeam', teamId)" />
        </div>

        <div class="teamEditors">
            <GameEditor
                v-for="source in teamSources"
                :key="source.id"
                :class="{ hidden: viewSite }"
                :template="source.source"
                :language="languageFromFile(source.file)"
                :player="findPlayerFromFile(source.file)"
            />
            <WebViewer
                v-if="viewSite"
                :game="game"
                :team-id="teamId"
            />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import GameEditor from '@/components/game/GameEditor';
import WebViewer from '@/components/game/WebViewer';

export default {
    name: 'GameProjectTeam',

    components: { GameEditor, WebViewer },

    props: {
        game: { type: Object, required: true },
        teamId: { type: Number, required: true },
        players: { type: Array, required: true },
        sources: { type: Array, required: true },
        expanded: { type: Boolean, default: false },
    },

    data: () => ({
        viewSite: false,
    }),

    computed: {
        teamSources() {
            const sources = this.sources.filter(source => source.team === this.teamId);

            const languageSortMap = { html: 1, css: 2, js: 3 };
            return _.sortBy(sources, (source) => languageSortMap[this.languageFromFile(source.file)]);
        },
    },

    methods: {
        languageFromFile(file) {
            return file.split('.')[1];
        },

        findPlayerFromFile(file) {
            return this.players.find(p => p.assignedLanguages[0] === this.languageFromFile(file));
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.GameProjectTeam {
    display: flex;
    flex: 1;

    &.blue .GameEditor /deep/ .header,
    &.blue .teamActions .Icon {
        color: $brand-primary;
    }

    &.red .GameEditor /deep/ .header,
    &.red .teamActions .Icon {
        color: $brand-secondary;
    }

    &:last-child {
        border-top: 3px solid $bg-color-3;
    }

    .teamActions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 3px solid $bg-color-3;
        padding: $grid-gutter-width;

        & > div {
            display: flex;
            flex-direction: column;
        }

        .Icon {
            font-size: 18px;
            color: #fff;
            cursor: pointer;

            &.dimmed {
                opacity: 0.25;
            }
        }

        .Icon + .Icon {
            margin-top: 30px;
        }
    }

    .teamEditors {
        display: flex;
        flex: 1;
    }

    .GameEditor {
        &.hidden {
            display: none;
        }

        &:not(:first-child) {
            border-left: 3px solid $bg-color-3;
        }
    }
}
</style>
