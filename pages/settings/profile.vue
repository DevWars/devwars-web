<template>
    <form v-if="profile && user" v-async-submit="[save]">
        <div class="row">
            <div class="col-sm-8">
                <h3 class="modpanel__subtitle">Profile</h3>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <Input v-model="profile.firstName"/>
                        <label>First Name</label>
                    </div>
                    <div class="col-md-6 form-group">
                        <Input v-model="profile.lastName"/>
                        <label>Last Name</label>
                    </div>
                </div>
                <div class="form-group">
                    <Input v-model="profile.addressOne"/>
                    <label>Address 1</label>
                </div>
                <div class="form-group">
                    <Input v-model="profile.addressTwo"/>
                    <label>Address 2</label>
                </div>
                <div class="row">
                    <div class="col-md-5 form-group">
                        <Input v-model="profile.city"/>
                        <label>City</label>
                    </div>
                    <div class="col-md-2 form-group">
                        <Input v-model="profile.state"/>
                        <label>State</label>
                    </div>
                    <div class="col-md-2 form-group">
                        <Input v-model="profile.zip"/>
                        <label>Zip/Postal</label>
                    </div>
                    <div class="col-sm-3 form-group">
                        <Select v-model="profile.country" label="Select Country">
                            <option v-for="country in countries" :key="country">{{ country }}</option>
                        </Select>
                    </div>
                </div>
                <div class="form-group">
                    <Input v-model="profile.dob"/>
                    <label>Date of Birth</label>
                </div>
                <div class="form-group">
                    <textarea
                        v-model="profile.about"
                        rows="4"
                        class="form-control"
                        placeholder="Tell us a little bit about yourself"
                    ></textarea>
                    <label>About</label>
                </div>
                <div class="form-group">
                    <Input v-model="profile.websiteUrl"/>
                    <label>URL</label>
                </div>

                <h3 class="modpanel__subtitle">Work</h3>
                <div class="form-group">
                    <Input v-model="profile.company"/>
                    <label>Company</label>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input
                            id="for-hire"
                            v-model="profile.forHire"
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
                    <Avatar v-if="user" :user="user" class="xl"/>
                </div>

                <FileChooser @change="crop">
                    <button
                        slot-scope="{update}"
                        type="button"
                        class="btn btn-outline-gray"
                        @click="update"
                    >Upload new avatar</button>
                </FileChooser>
            </div>
        </div>

        <button class="btn btn-primary" type="submit">Save</button>
    </form>
</template>


<script>
import * as countryList from 'country-list';
import Avatar from '~/components/user/Avatar';
import FileChooser from '~/components/FileChooser';
import CropperModal from '~/components/modal/CropperModal';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';

export default {
    name: 'Profile',
    components: { Avatar, FileChooser, Input, Select },
    data: () => {
        return {
            countries: Object.keys(countryList().getNameList()).map(
                (it) => it[0].toUpperCase() + it.slice(1)
            ),
        };
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        profile() {
            return this.$store.state.user.profile;
        },
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
            const [cropped] = await this.$open(CropperModal, { data: result });

            this.$store.dispatch('users/avatar', cropped);
        },
        async save() {
            await this.$store.dispatch('user/settings', this.profile);
        },
    },
};
</script>
