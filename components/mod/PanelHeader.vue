<template>
    <div class="PanelHeader">
        <div class="main">
            <h1 v-if="title" class="title">{{ title }}</h1>
            <h2 v-if="subtitle" class="subtitle">{{ subtitle }}</h2>
        </div>
        <div class="actions">
            <div v-if="showSearch" class="search">
                <Icon name="search" />
                <Input
                    class="labeless"
                    :placeholder="'Search for ' + title"
                    @input="(e) => $emit('input', e)"
                />
            </div>
            <slot />
        </div>
    </div>
</template>

<script>
import Input from '@/components/form/Input';

export default {
    name: 'PanelHeader',
    components: { Input },
    props: {
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
        model: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.PanelHeader {
    @extend %flex-justify;
    padding: 30px;

    .title {
        font-size: 30px;
        color: #fff;
    }

    .subtitle {
        margin-top: 5px;
    }

    .actions {
        display: flex;

        & > *:not(:last-child) {
            margin-right: 15px;
        }
    }

    .search {
        display: flex;
        align-items: center;

        .Icon {
            padding-right: 10px;
            color: $text-color-muted;
        }

        input {
            width: 300px;
        }
    }
}
</style>
