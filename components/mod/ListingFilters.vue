<template>
    <div class="ListingFilters">
        <div class="main">
            <span>Showing All</span>
            <Select>
                <option value="Infinity" selected>Show All</option>
            </Select>
        </div>

        <div class="actions">
            <button class="fal fa-cog"></button>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import Select from '~/components/form/Select';

    @Component({
        components: { Select },
    })
    export default class ListingFilters extends Vue {

    }
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.ListingFilters {
    @extend %flex-justify;
    padding: 5px 30px;
    background: $bg-color-1;

    .main {
        display: flex;
        align-items: center;

        *:not(:first-child) {
            margin-left: 30px;
        }
    }

    .actions {
        font-size: $h4-font-size;

        button {
            padding: 10px;
        }
    }
}
</style>
