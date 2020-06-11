<template>
    <div class="LogsPage">
        <PanelHeader title="Logs">
            <ButtonIcon
                icon="exclamation-triangle"
                class="danger sm"
                @click="loadErrorLogs"
            >
                Error Logs
            </ButtonIcon>
            <ButtonIcon
                icon="clipboard"
                class="primary sm"
                @click="loadAllLogs"
            >
                All Logs
            </ButtonIcon>
        </PanelHeader>

        <Textarea id="test" :value="logs.join('\r\n')" disabled />
    </div>
</template>

<script>
import { names } from '../../utils/auth';
import Textarea from '@/components/form/Textarea';
import PanelHeader from '@/components/mod/PanelHeader';

export default {
    name: 'ModLogs',

    meta: {
        auth: names.MODERATOR,
    },

    components: { PanelHeader, Textarea },

    async asyncData({ query, error, $axios }) {
        try {
            const { data } = await $axios.get('/health/logs/error');
            return { logs: data.logs.reverse() };
        } catch (e) {
            error({
                statusCode: e.response.status,
                description: e.response.data.error,
                message: e.response.statusText,
            });
        }
    },

    data: () => ({
        logs: [],
    }),

    methods: {
        async loadAllLogs() {
            try {
                const { data } = await this.$axios.get('/health/logs');
                this.logs = data.logs.reverse();
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        async loadErrorLogs() {
            try {
                const { data } = await this.$axios.get('/health/logs/error');
                this.logs = data.logs.reverse();
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.LogsPage {
    display: flex;
    flex-direction: column;
    height: 100%;

    .Textarea {
        height: 100%;
        padding-left: $grid-gutter-width * 2;

        /deep/ textarea {
            height: 100%;
            border-bottom: none;
        }
    }
}
</style>
