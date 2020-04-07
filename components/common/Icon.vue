<template>
    <v-icon class="Icon" :name="name" @click="$emit('click')" />
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

export default {
    name: 'Icon',

    components: {
        'v-icon': Icon,
    },

    props: {
        name: { type: String, required: true },
    },
};
</script>

<style lang="scss" scoped>
.Icon {
    width: auto;
    height: 1em;

    // Font scaling for Safari
    max-width: 100%;
    max-height: 100%;
}
</style>
