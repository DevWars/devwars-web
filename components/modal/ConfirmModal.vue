<template>
    <div class="modal">
        <h1 v-if="title">{{ title }}</h1>
        <p>{{ description }}</p>

        <div class="modal__actions">
            <button class="btn btn-link" @click="close(false)">{{ cancelText }}</button>
            <button class="btn btn-primary" @click="close(true)">{{ confirmText }}</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ConfirmModal',
    props: {
        resolve: {
            type: Function,
            required: true,
        },
        reject: {
            type: Function,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: 'Cancel',
        },
        confirmText: {
            type: String,
            default: 'Okay',
        },
    },
};
</script>
