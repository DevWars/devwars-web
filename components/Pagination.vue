<template>
    <div class="Pagination">
        <button
            class="btn btn-gray btn-sm"
            :class="{disabled: !canGoPrevious}"
            @click="$emit('previous')"
        >Prev</button>
        <strong class="page">PAGE {{ page + 1 }}</strong>
        <button
            class="btn btn-gray btn-sm"
            :class="{disabled: !canGoNext}"
            @click="$emit('next')"
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
