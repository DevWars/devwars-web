<template>
    <div class="modal">
        <h1 v-if="title">{{ title }}</h1>
        <p>{{ description }}</p>

        <ButtonGroup class="modal__actions">
            <!-- <Button class="link muted" @click="close(false)">{{ cancelText }}</Button> -->
            <Button class="primary" @click="close(true)">{{ confirmText }}</Button>
        </ButtonGroup>
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
