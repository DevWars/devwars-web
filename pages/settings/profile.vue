<template>
    <form v-async-submit="[save]">
        <div class="row">
            <div class="col-sm-8">
                <h3 class="modpanel__subtitle">Profile</h3>
                <div class="form-group">
                    <Input v-model="profile.username" />
                    <label>Username</label>
                </div>
                <div class="form-group">
                    <Input v-model="profile.location" />
                    <label>Location</label>
                </div>
                <div class="form-group">
                    <textarea
                        v-model="profile.about" rows="4" class="form-control"
                        placeholder="Tell us a little bit about yourself"
                    ></textarea>
                </div>
                <div class="form-group">
                    <Input v-model="profile.url" />
                    <label>URL</label>
                </div>

                <h3 class="modpanel__subtitle mb-0">Job</h3>
                <div class="form-group">
                    <div class="form-check">
                        <input v-model="profile.for_hire" id="for-hire" type="checkbox" class="checkbox">
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
                    <button slot-scope="{update}" @click="update" type="button" class="btn btn-outline-gray">Upload new
                        avatar
                    </button>
                </FileChooser>
            </div>
        </div>

        <div class="form-group">
            <ConnectToDiscord />
        </div>

        <button class="btn btn-primary" type="submit">Save</button>
    </form>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import Avatar from '~/components/user/Avatar';
    import FileChooser from '~/components/FileChooser';
    import CropperModal from '~/components/modal/CropperModal';
    import Input from '~/components/form/Input';
    import ConnectToDiscord from '../../components/user/ConnectToDiscord';

    @Component({
        components: { ConnectToDiscord, Avatar, FileChooser, Input }
    })

    export default class SettingsProfile extends Vue {
        profile = {};

        @State(state => state.user.user) user;

        async crop(result) {
            let [cropped] = await this.$open(CropperModal, { data: result });

            this.$store.dispatch('user/avatar', cropped);
        }

        mounted() {
            this.profile = Object.assign({}, this.user, this.user.information);
        }

        async save() {
            await this.$store.dispatch('user/settings', this.profile);
        }
    }
</script>
