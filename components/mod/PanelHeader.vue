<template>
    <div class="PanelHeader">
        <div class="main">
            <h1 class="title" v-if="title">{{ title }}</h1>
            <h2 class="subtitle" v-if="subtitle">{{ subtitle }}</h2>
        </div>

        <div class="actions">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: [ 'title', 'subtitle' ]
}
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
}
</style>
