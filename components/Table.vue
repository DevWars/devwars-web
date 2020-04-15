<template>
    <div class="Table">
        <table>
            <thead>
                <slot name="head" />
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Table',
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Table {
    overflow: auto;
    background-color: $bg-color-2;

    table {
        min-width: 700px;
    }

    tbody {
        border-top: 1px solid $divider-color;

        td:last-of-type {
            text-align: right;
        }
    }

    tr {
        &.added {
            background-color: $bg-color-4;
            opacity: 0.3;
            pointer-events: none;
        }
    }

    th {
        font-family: $alt-font-face;
        font-size: 15px;
        padding: 20px 20px 20px 0;
        text-transform: uppercase;
        white-space: nowrap;
        text-align: left;
        color: $text-color-secondary;
        cursor: pointer;
    }

    td {
        border-bottom: 1px solid $divider-color;
        min-width: 40px;
        padding: 20px 0;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    th,
    td {
        &:first-child {
            padding-left: 30px;
            font-weight: $font-weight-bold;
        }

        &:last-child {
            padding-right: 30px;
        }
    }
}
</style>
