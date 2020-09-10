<template>
    <div class="GamesViewPage">
        <div class="header">
            <ButtonIcon
                icon="chevron-left"
                class="link white"
                :to="`/games?game=${game.id}&season=${game.season}`"
            >
                Game Details
            </ButtonIcon>

            <div class="score">
                <span class="blue">0</span>
                <span class="vs">VS</span>
                <span class="red">0</span>
            </div>

            <div class="headerActions">
                <Button class="link white">Objectives</Button>
            </div>
        </div>

        <div class="main">
            <div class="team blue">
                <div class="teamActions">
                    <div>
                        <Icon name="code" />
                        <Icon name="window-maximize" class="dimmed" />
                    </div>
                    <Icon name="expand-alt" />
                </div>
                <div class="teamEditors">
                    <GameEditor
                        v-for="(template, language) in game.templates"
                        :key="language"
                        :template="template"
                        :language="language"
                        :player="findPlayerByLanguage(language)"
                    />
                </div>
            </div>
            <div class="team red">
                <div class="teamActions">
                    <div>
                        <Icon name="code" />
                        <Icon name="window-maximize" class="dimmed" />
                    </div>
                    <Icon name="expand-alt" />
                </div>
                <div class="teamEditors">
                    <GameEditor
                        v-for="(template, language) in game.templates"
                        :key="language"
                        :template="template"
                        :language="language"
                        :player="findPlayerByLanguage(language)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GameEditor from '@/components/game/GameEditor';

export default {
    name: 'GamesViewPage',

    components: { GameEditor },

    async asyncData({ params, error, app: { $api } }) {
        try {
            const game = await $api.games.getGame(params.id);
            const players = await $api.games.getAllAssignedPlayersToGame(params.id);

            return { game, players };
        } catch (e) {
            error({
                statusCode: e.status,
                description: e.error,
                message: e.message,
            });
        }
    },

    methods: {
        findPlayerByLanguage(language) {
            return this.players.find(p => p.assignedLanguages[0] === language);
        },
    },
};
</script>

<style lang="scss">
    #__layout > div {
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .footer {
        display: none;
    }
</style>

<style lang="scss" scoped>
@import 'utils.scss';

.GamesViewPage {
    background-color: $bg-color-4;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
        background: $bg-color-3;
        position: relative;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 28px;
        pointer-events: none;

        .vs {
            margin: 0 10px;
            font-size: $font-size-base;
        }

        .blue {
            color: $brand-primary;
        }

        .red {
            color: $brand-secondary;
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .team {
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
    }

    .teamActions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        border-left: 3px solid $bg-color-3;
    }
}
</style>
