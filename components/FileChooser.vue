<template>
    <div>
        <input type="file" style="display: none;" ref="chooser" @change="change">
        <slot :update="slotClicked"></slot>
    </div>
</template>


<script>
export default {
    name: 'FileChooser',
    methods: {
        slotClicked() {
            this.$refs.chooser.click();
        },
        change() {
            let reader = new FileReader();
            let file = this.$refs.chooser.files[0];

            reader.addEventListener('load', (event) => {
                if (reader.result) {
                    this.$emit('change', reader.result);
                }
            });

            reader.readAsDataURL(file);
        },
    },
};
</script>
