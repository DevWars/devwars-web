<template>
    <div>
        <div style="height: 400px;">
            <img
                ref="cropper"
                @load="imageLoad"
                :src="data"
            >
        </div>

        <div class="modal-dialog__actions">
            <button @click="submit" class="btn btn-black">Crop Image</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Cropper from 'cropperjs';

    import 'cropperjs/dist/cropper.css'

    export default {
        name: "CropperModal",
        props: [
            "data",
            "resolve"
        ],
        methods: {
           options() {
                return {
                    aspectRatio: 1,
                    viewMode: 2
                }
            },
            imageLoad(e) {
                this.cropper = new Cropper(e.target, this.options());
            },
            async submit() {
                let data = await new Promise((resolve) => {
                    this.cropper.getCroppedCanvas().toBlob((res) => {
                        resolve(res);
                    }, "image/jpeg");
                });

                this.close(data);
            } 
        }
    }
</script>
