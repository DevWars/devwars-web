<template>
    <div>
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
            default: () => {},
        },
        reject: {
            default: () => {},
        },
        title: {
            default: '',
        },
        description: {
            description: '',
        },
        cancelText: {
            default: 'Cancel',
        },
        confirmText: {
            default: 'Okay',
        },
    },
};
</script>
