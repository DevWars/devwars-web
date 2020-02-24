<template>
    <div class="ListingFilters">
        <div class="main">
            <Select>
                <option value="Infinity" selected>
                    Show All
                </option>
            </Select>
        </div>

        <div class="actions">
            <Button class="link fal fa-cog" />
        </div>
    </div>
</template>

<script>
import Select from '@/components/form/Select';

export default {
    name: 'ListingFilters',
    components: { Select },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

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
