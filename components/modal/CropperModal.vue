<template>
    <div>
        <div style="height: 400px;">
            <img ref="cropper" :src="data" @load="imageLoad">
        </div>

        <div class="modal-dialog__actions">
            <button class="btn btn-black" @click="submit">Crop Image</button>
        </div>
    </div>
</template>


<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name: 'CropperModal',
    props: ['data', 'resolve'],
    methods: {
        options() {
            return {
                aspectRatio: 1,
                viewMode: 2,
            };
        },
        imageLoad(e) {
            this.cropper = new Cropper(e.target, this.options());
        },
        async submit() {
            const data = await new Promise((resolve) => {
                this.cropper.getCroppedCanvas().toBlob((res) => {
                    resolve(res);
                }, 'image/jpeg');
            });

            this.close(data);
        },
    },
};
</script>
