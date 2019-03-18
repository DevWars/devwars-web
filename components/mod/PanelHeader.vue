<template>
    <div class="PanelHeader">
        <div class="main">
            <h1 class="title" v-if="title">{{ title }}</h1>
            <h2 class="subtitle" v-if="subtitle">{{ subtitle }}</h2>
        </div>

        <div class="actions">
            <div v-if="showSearch" class="search">
                <Input class="labeless" :placeholder="'Search for ' + title"/>
            </div>
            <slot></slot>
        </div>
    </div>
</template>


<script>
import Input from '~/components/form/Input';

export default {
    name: 'PanelHeader',
    components: { Input },
    props: {
        title: String,
        subtitle: String,
        showSearch: Boolean,
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.PanelHeader {
    @extend %flex-justify;
    padding: 30px;

    .title {
        font-size: $h2-font-size;
        color: #fff;
    }

    .subtitle {
        margin-top: 5px;
        font-size: $h5-font-size;
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

        &:before {
            @extend .fa;
            content: $fa-search;
            padding-right: 10px;
            color: $text-color-muted;
        }

        input {
            width: 300px;
        }
    }
}
</style>
