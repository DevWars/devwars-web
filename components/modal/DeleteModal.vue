<template>
    <div class="modal">
        <h1 class="modal__title">{{ title }}</h1>
        <p class="modal__desc" v-if="description">{{ description }}</p>

        <div class="modal__actions">
            <button class="btn btn-link" @click="$emit('close')">{{ cancel }}</button>
            <button class="btn btn-danger" @click="close(true)">{{ confirm }}</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'DeleteModal',
    props: {
        title: {
            default: 'Warning',
        },
        cancel: {
            default: 'Cancel',
        },
        confirm: {
            default: 'Delete',
        },
        description: {},
        resolve: {},
        reject: {},
    },
};
</script>
