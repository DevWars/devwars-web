<template>
    <div class="toast__item" :class="[toast.type]">
        <i class="toast__icon"></i>
        <p class="toast__message">
            {{ toast.message }}
        </p>
        <button class="toast__close"></button>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Toast",
        props: [
            "toast"
        ]
    }
</script>
