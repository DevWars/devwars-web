<template>
    <div class="GamesViewPage">
        <div class="main">
            <div class="team blue">
                <GameEditor
                    v-for="(template, language) in game.templates"
                    :key="language"
                    :template="template"
                    :language="language"
                    :player="findPlayerByLanguage(language)"
                />
            </div>
            <div class="team red">
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

<style lang="scss" scoped>
@import 'utils.scss';

.GamesViewPage {
    height: calc(100vh - #{$header-height});
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: $bg-color-4;

    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .team {
        display: flex;
        height: 50%;

        &.blue .GameEditor /deep/ .header {
            color: $brand-primary;
        }

        &.red .GameEditor /deep/ .header {
            color: $brand-secondary;
        }

        &:last-child {
            border-top: 3px solid $divider-color;
        }
    }

    .GameEditor {
        &:not(:first-child) {
            border-left: 3px solid $divider-color;
        }
    }
}
</style>
