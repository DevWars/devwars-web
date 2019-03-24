<template>
    <form v-if="user && profile" v-async-submit="[save]">
        <div class="row">
            <div class="col-sm-8">
                <h3 class="modpanel__subtitle">Profile</h3>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <Input type="text" :value="firstName" @input="updateForm({values: $event, key: 'firstName'})"/>
                        <label>First Name</label>
                    </div>
                    <div class="col-md-6 form-group">
                        <Input type="text" :value="lastName" @input="updateForm({values: $event, key: 'lastName'})"/>
                        <label>Last Name</label>
                    </div>
                </div>
                <div class="form-group">
                    <Input type="text" :value="addressOne" @input="updateForm({values: $event, key: 'addressOne'})"/>
                    <label>Address 1</label>
                </div>
                <div class="form-group">
                    <Input :value="addressTwo" @input="updateForm({values: $event, key: 'addressTwo'})"/>
                    <label>Address 2</label>
                </div>
                <div class="row">
                    <div class="col-md-5 form-group">
                        <Input :value="city" @input="updateForm({values: $event, key: 'city'})"/>
                        <label>City</label>
                    </div>
                    <div class="col-md-2 form-group">
                        <Input :value="state" @input="updateForm({values: $event, key: 'state'})"/>
                        <label>State</label>
                    </div>
                    <div class="col-md-2 form-group">
                        <Input :value="zip" @input="updateForm({values: $event, key: 'zip'})"/>
                        <label>Zip/Postal</label>
                    </div>
                    <div class="col-sm-3 form-group">
                        <Select 
                            :value="country" 
                            @input="updateForm({values: $event, key: 'country'})" 
                            label="Select Country">
                            <option v-for="country in countries" :key="country">{{ country }}</option>
                        </Select>
                    </div>
                </div>
                <div class="form-group">
                    <Input :value="dob" @input="updateForm({values: $event, key: 'dob'})"/>
                    <label>Date of Birth</label>
                </div>
                <div class="form-group">
                    <textarea
                        :value="about"
                        @input="updateForm({values: $event.target.value, key:'about'})"
                        rows="4"
                        class="form-control"
                        placeholder="Tell us a little bit about yourself"
                    ></textarea>
                    <label>About</label>
                </div>
                <div class="form-group">
                    <Input :value="websiteUrl" @input="updateForm({values: $event, key: 'websiteUrl'})"/>
                    <label>URL</label>
                </div>

                <h3 class="modpanel__subtitle">Work</h3>
                <div class="form-group">
                    <Input :value="company" @input="updateForm({values: $event, key: 'company'})"/>
                    <label>Company</label>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input
                            id="for-hire"
                            type="checkbox"
                            class="checkbox"
                            :checked="forHire" @input="updateForm({values: $event.target.checked, key: 'forHire'})"
                        >
                        <label for="for-hire">Available for hire</label>
                    </div>
                </div>
                <LanguageSkills  :profile="profile" @change="updateForm"/>
            </div>
            <div class="col-sm-4">
                <h3 class="modpanel__subtitle">Avatar</h3>
                <div class="form-group">
                    <Avatar v-if="user" :user="user" class="xl"/>
                </div>

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
import Select from '~/components/form/Select';
import LanguageSkills from '~/components/game/LanguageSkills.vue';
import { mapState } from 'vuex';

export default {
    name: 'Profile',
    components: { Avatar, FileChooser, Input, Select, LanguageSkills},
    data: () => {
        return {
            countries: Object.keys(countryList().getNameList()).map(
                (it) => it[0].toUpperCase() + it.slice(1)
            ),
        };
    },
    computed: {
        ...mapState({
            addressTwo: state => state.user.profile.addressTwo,
            firstName: state => state.user.profile.firstName,
            lastName: state => state.user.profile.lastName,
            addressOne: state => state.user.profile.addressOne,
            city: state => state.user.profile.city,
            state: state => state.user.profile.state,
            zip: state => state.user.profile.zip,
            country: state => state.user.profile.country,
            dob: state => state.user.profile.dob,
            about: state => state.user.profile.about,
            websiteUrl: state => state.user.profile.websiteUrl,
            company: state => state.user.profile.company,
            forHire: state => state.user.profile.forHire,
        }),
        user() {
            return this.$store.state.user.user;
        },
        profile() {
            return this.$store.state.user.profile;
        },
    },
    methods: {
        updateForm({values, key}) {
            this.$store.commit('user/profileUpdate', {key, values});
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
