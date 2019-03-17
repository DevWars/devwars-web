<template>
    <mj-wrapper>
        <mj-raw>
            <div v-bind="$props" />
        </mj-raw>
        <slot name="default" />
    </mj-wrapper>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "MailMeta",
        props: [
            "subject"
        ]
    }
</script>
