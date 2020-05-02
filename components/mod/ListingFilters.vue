<template>
    <div class="ListingFilters">
        <div class="main">
            <Select @change="(e) => $emit('change', e)">
                <option v-for="x in options" :key="x.value" :value="x.value">
                    {{ x.name }}
                </option>
            </Select>
        </div>

        <div class="actions">
            <Icon name="cog" />
        </div>
    </div>
</template>

<script>
import Select from '@/components/form/Select';

export default {
    name: 'ListingFilters',
    components: { Select },

    props: {
        options: {
            type: Array,
            required: false,
            default: () => [{ name: 'Show All', value: 1 }],
        },
    },

    data() {
        return {};
    },
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
        line-height: 1;

        .Icon {
            font-size: $font-size-lg;
        }
    }
}
</style>
