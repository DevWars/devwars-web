<template>
    <form v-if="user && profile" v-async-submit="[save]">
        <div class="row">
            <div class="col-sm-8">
                <h3 class="modpanel__subtitle">Profile</h3>
                <div class="row">
                    <div class="col-md-6">
                        <Input
                            v-model="firstName"
                            label="First Name"
                            class="group"
                            @input="updateForm({values: $event, key: 'firstName'})"
                        />
                    </div>
                    <div class="col-md-6">
                        <Input
                            v-model="lastName"
                            label="Last Name"
                            class="group"
                            @input="updateForm({values: $event, key: 'lastName'})"
                        />
                    </div>
                </div>

                <Input
                    v-model="addressOne"
                    label="Address 1"
                    class="group"
                    @input="updateForm({values: $event, key: 'addressOne'})"
                />

                <Input
                    v-model="addressTwo"
                    label="Address 2"
                    class="group"
                    @input="updateForm({values: $event, key: 'addressTwo'})"
                />

                <div class="row">
                    <div class="col-md-5">
                        <Input
                            v-model="city"
                            label="City"
                            class="group"
                            @input="updateForm({values: $event, key: 'city'})"
                        />
                    </div>
                    <div class="col-md-2">
                        <Input
                            v-model="state"
                            label="State"
                            class="group"
                            @input="updateForm({values: $event, key: 'state'})"
                        />
                    </div>
                    <div class="col-md-2">
                        <Input
                            v-model="zip"
                            label="Zip or Postal"
                            class="group"
                            @input="updateForm({values: $event, key: 'zip'})"
                        />
                    </div>
                    <div class="col-sm-3">
                        <Select
                            v-model="country"
                            label="Select Country"
                            class="group"
                            @input="updateForm({values: $event, key: 'country'})"
                        >
                            <option v-for="country in countries" :key="country">{{ country }}</option>
                        </Select>
                    </div>
                </div>

                <Input
                    v-model="dob"
                    label="Date of Birth"
                    class="group"
                    @input="updateForm({values: $event, key: 'dob'})"
                />

                <Textarea
                    v-model="about"
                    rows="4"
                    label="About you"
                    class="group"
                    placeholder="Tell us a little bit about yourself"
                    @input="updateForm({values: $event.target.value, key:'about'})"
                />

                <Input
                    v-model="websiteUrl"
                    label="URL"
                    class="group"
                    @input="updateForm({values: $event, key: 'websiteUrl'})"
                />

                <h3 class="modpanel__subtitle">Work</h3>
                <Input
                    v-model="company"
                    label="Company"
                    class="group"
                    @input="updateForm({values: $event, key: 'company'})"
                />

                <div class="form-check">
                    <input
                        id="for-hire"
                        type="checkbox"
                        class="checkbox"
                        :checked="forHire"
                        @input="updateForm({values: $event.target.checked, key: 'forHire'})"
                    >
                    <label for="for-hire">Available for hire</label>
                </div>

                <LanguageSkills :profile="profile" @change="updateForm"/>
            </div>
            <div class="col-sm-4">
                <h3 class="modpanel__subtitle">Avatar</h3>

                <Avatar v-if="user" :user="user" class="xl"/>

                <FileChooser @change="crop">
                    <template #default="{update}">
                        <button
                            type="button"
                            class="btn btn-outline-gray"
                            @click="update"
                        >Upload new avatar</button>
                    </template>
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
import Textarea from '~/components/form/Textarea';
import Select from '~/components/form/Select';
import LanguageSkills from '~/components/game/LanguageSkills.vue';
import { mapState } from 'vuex';

export default {
    name: 'Profile',
    components: { Avatar, FileChooser, Input, Textarea, Select, LanguageSkills },
    data: () => {
        return {
            countries: Object.keys(countryList().getNameList()).map((it) => it[0].toUpperCase() + it.slice(1)),
        };
    },
    computed: {
        ...mapState({
            addressTwo: (state) => state.user.profile.addressTwo,
            firstName: (state) => state.user.profile.firstName,
            lastName: (state) => state.user.profile.lastName,
            addressOne: (state) => state.user.profile.addressOne,
            city: (state) => state.user.profile.city,
            state: (state) => state.user.profile.state,
            zip: (state) => state.user.profile.zip,
            country: (state) => state.user.profile.country,
            dob: (state) => state.user.profile.dob,
            about: (state) => state.user.profile.about,
            websiteUrl: (state) => state.user.profile.websiteUrl,
            company: (state) => state.user.profile.company,
            forHire: (state) => state.user.profile.forHire,
        }),
        user() {
            return this.$store.state.user.user;
        },
        profile() {
            return this.$store.state.user.profile;
        },
    },
    methods: {
        updateForm({ values, key }) {
            this.$store.commit('user/profileUpdate', { key, values });
        },
        async crop(result) {
            const [cropped] = await this.$open(CropperModal, { data: result });

            this.$store.dispatch('users/avatar', cropped);
        },
        async save() {
            await this.$store.dispatch('user/settings');
        },
    },
};
</script>
