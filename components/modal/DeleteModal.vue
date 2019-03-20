<template>
    <div class="modal">
        <h1 class="modal__title">{{ title }}</h1>
        <p v-if="description" class="modal__desc">{{ description }}</p>

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
            type: String,
            default: 'Warning',
        },
        cancel: {
            type: String,
            default: 'Cancel',
        },
        confirm: {
            type: String,
            default: 'Delete',
        },
        description: {
            type: String,
            default: '',
        },
        resolve: {
            type: Function,
            required: true,
        },
        reject: {
            type: Function,
            required: true,
        },
    },
};
</script>
