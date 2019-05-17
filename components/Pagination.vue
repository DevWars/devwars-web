<template>
    <div class="Pagination">
        <Button class="muted sm" :class="{disabled: !canGoPrevious}" @click="$emit('previous')">Prev</Button>
        <strong class="page">PAGE {{ page + 1 }}</strong>
        <Button class="muted sm" :class="{disabled: !canGoNext}" @click="$emit('next')">Next</Button>
    </div>
</template>


<script>
export default {
    name: 'Pagination',

    props: {
        page: {
            type: Number,
            default: 0,
        },
        perPage: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
    },

    computed: {
        canGoPrevious() {
            return this.page > 0;
        },

        canGoNext() {
            const totalPages = Math.ceil(this.count / this.perPage);
            return this.page < totalPages - 1;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;

    .page {
        padding: 0 30px;
    }
}
</style>
