<template>
    <form v-async-submit="[save]">
        <div class="row">
            <div class="col-sm-8">
                <h3 class="modpanel__subtitle">Profile</h3>
                <div class="form-group">
                    <Input v-model="profile.username"/>
                    <label>Username</label>
                </div>
                <div class="form-group">
                    <Input v-model="profile.location"/>
                    <label>Location</label>
                </div>
                <div class="form-group">
                    <textarea
                        v-model="profile.about"
                        rows="4"
                        class="form-control"
                        placeholder="Tell us a little bit about yourself"
                    ></textarea>
                </div>
                <div class="form-group">
                    <Input v-model="profile.websiteUrl"/>
                    <label>URL</label>
                </div>

                <h3 class="modpanel__subtitle mb-0">Job</h3>
                <div class="form-group">
                    <div class="form-check">
                        <input
                            v-model="profile.forHire"
                            id="for-hire"
                            type="checkbox"
                            class="checkbox"
                        >
                        <label for="for-hire">Available for hire</label>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <h3 class="modpanel__subtitle">Avatar</h3>
                <div class="form-group">
                    <Avatar :user="user" class="xl"></Avatar>
                </div>

                <FileChooser @change="crop">
                    <button
                        slot-scope="{update}"
                        @click="update"
                        type="button"
                        class="btn btn-outline-gray"
                    >
                        Upload new
                        avatar
                    </button>
                </FileChooser>
            </div>
        </div>

        <button class="btn btn-primary" type="submit">Save</button>
    </form>
</template>


<script>
import Avatar from '~/components/user/Avatar';
import FileChooser from '~/components/FileChooser';
import CropperModal from '~/components/modal/CropperModal';
import Input from '~/components/form/Input';

export default {
    name: 'Profile',
    components: { Avatar, FileChooser, Input },
    data: () => {
        return {
            profile: {},
        };
    },
    watch: {
        updateProfileFromUser: {
            immediate: true,
            handler() {
                Object.assign(this.profile, this.user.profile);

                this.profile.username = this.user.username;
            },
        },
    },
    methods: {
        async crop(result) {
            let [cropped] = await this.$open(CropperModal, { data: result });

            this.$store.dispatch('user/avatar', cropped);
        },
        async save() {
            await this.$store.dispatch('user/settings', this.profile);
        },
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
};
</script>
