<template>
    <div>
        <div style="height: 400px;">
            <img ref="cropper"
                 @load="imageLoad"
                 :src="data">
        </div>

        <div class="modal-dialog__actions">
            <button @click="submit" class="btn btn-black">Crop Image</button>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Cropper from 'cropperjs';

    import {Prop} from 'vue-property-decorator';

    import 'cropperjs/dist/cropper.css'

    @Component({})
    export default class extends Vue {
        @Prop() data;
        @Prop() resolve;

        options() {
            return {
                aspectRatio: 16 / 9,
                viewMode: 2
            }
        }

        imageLoad(e) {
            this.cropper = new Cropper(e.target, this.options());
        }

        submit() {
            let data = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');

            this.close(data);
        }
    }
</script>
