<template>
    <mj-wrapper>
        <mj-raw>
            <div v-bind="$props"></div>
        </mj-raw>
        <slot name="default"></slot>
    </mj-wrapper>
</template>


<script>
export default {
    name: 'MailMeta',
    props: ['subject'],
};
</script>
