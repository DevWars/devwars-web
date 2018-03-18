<template>
    <div>
        <input type="file" style="display: none;" ref="chooser" @change="change">
        <slot :update="slotClicked"></slot>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component({})
    export default class FileChooser extends Vue {
        slotClicked() {
            this.$refs.chooser.click();
        }

        change() {
            let reader = new FileReader;
            let file = this.$refs.chooser.files[0];

            reader.addEventListener('load', event => {
                if (reader.result) {
                    this.$emit('change', reader.result);
                }
            });

            reader.readAsDataURL(file);
        }

    }
</script>
