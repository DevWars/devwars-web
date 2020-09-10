<template>
    <div class="GameEditor">
        <div class="header">
            <div class="username">{{ player.user.username }}</div>
            <div class="language">{{ language }}</div>
        </div>

        <div class="main">
            <div class="mainInner">
                <div class="gutter">
                    <pre><code v-html="lineNumbers" /></pre>
                </div>

                <div class="code">
                    <pre><code :class="language" v-html="code" /></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hljs from '@/plugins/highlight';

export default {
    name: 'GameEditor',

    props: {
        template: { type: String, default: '' },
        language: { type: String, default: 'html' },
        player: { type: Object, required: true },
    },

    computed: {
        code() {
            return hljs.highlight(this.language, this.template).value;
        },

        lineNumbers() {
            let lineNumbers = '';
            const lines = this.template.split(/\r\n|\r|\n/).length;
            for (let i = 0; i < lines; i++) {
                lineNumbers += i + '\n';
            }

            return lineNumbers;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.GameEditor {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px $grid-gutter-width;

        .language {
            text-transform: uppercase;
        }
    }

    .main {
        display: flex;
        flex: 1;
        position: relative;
    }

    .mainInner {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        scrollbar-color: rgba(#fff, 0.6) $bg-color-4;
        scrollbar-width: thin;
    }

    .gutter {
        padding: 0 $grid-gutter-width;
        text-align: right;
        opacity: 0.3;
        user-select: none;
    }

    .code {
        width: 100%;
        padding-right: 30px;
    }

    code {
        padding-bottom: 30px;
        font-size: 14px;
    }
}
</style>
