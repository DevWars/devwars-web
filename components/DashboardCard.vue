<template>
    <Card class="DashboardCard bezeless dark">
        <div v-if="title" class="header">
            <Icon :name="icon" />
            <h5>{{ title }}</h5>
        </div>

        <div class="content">
            <slot />
        </div>
    </Card>
</template>

<script>
import Card from './Card';

export default {
    name: 'DashboardCard',
    components: { Card },
    props: {
        title: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.DashboardCard {
    .header {
        display: flex;
        align-items: center;
        background-color: lighten($bg-color-2, 4%);
        padding: $xs-space $grid-gutter-width;
        font-size: 0;

        .Icon {
            padding-right: $xs-space;
        }

        h5 {
            text-transform: uppercase;
        }
    }

    &.scrollable .content {
        max-height: 300px;
        overflow-y: auto;
    }
}
</style>
