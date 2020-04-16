<template>
    <div class="container">
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

        <div class="logs-container">
            <Input
                :value="logs.join('\r\n')"
                textarea
                input-id="logs"
                placeholder="logs"
                input-class="logs-area"
                class="logs"
                disabled
            />
        </div>
    </div>
</template>

<script>
import { names } from '../../utils/auth';
import Input from '@/components/form/Input';
import PanelHeader from '@/components/mod/PanelHeader';

export default {
    name: 'ModLogs',

    meta: {
        auth: names.MODERATOR,
    },

    components: { PanelHeader, Input },

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

    data() {
        return { logs: [] };
    },

    computed: {},

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

.logs-container {
    width: 100%;
    position: absolute;
    top: 100px;
    bottom: 0;

    @include breakpoint(md) {
        position: inherit;
    }
}

.logs {
    width: 100%;
    height: 100%;
}

/deep/ .logs-area {
    width: 100%;
    height: 100%;

    @include breakpoint(md) {
        height: 750px;
    }
}
</style>
