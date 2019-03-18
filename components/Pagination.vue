<template>
    <div class="Pagination">
        <button
            @click="$emit('previous')"
            class="btn btn-gray btn-sm"
            :class="{disabled: !canGoPrevious}"
        >Prev</button>
        <strong class="page">PAGE {{ page + 1 }}</strong>
        <button
            @click="$emit('next')"
            class="btn btn-gray btn-sm"
            :class="{disabled: !canGoNext}"
        >Next</button>
    </div>
</template>


<script>
export default {
    name: 'Pagination',
    props: ['page', 'perPage', 'count'],
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
@import '../assets/styles/utils';

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
