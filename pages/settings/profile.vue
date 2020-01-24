<template>
  <form v-if="user && profile" @submit.prevent="save">
    <Row>
      <Column :md="8">
        <h3>Profile</h3>
        <Row>
          <Column :md="6">
            <Input
              v-model="firstName"
              label="First Name"
              class="group"
              @input="updateForm({ values: $event, key: 'firstName' })"
            />
          </Column>
          <Column :md="6">
            <Input
              v-model="lastName"
              label="Last Name"
              class="group"
              @input="updateForm({ values: $event, key: 'lastName' })"
            />
          </Column>
        </Row>

        <Input
          v-model="addressOne"
          label="Address 1"
          class="group"
          @input="updateForm({ values: $event, key: 'addressOne' })"
        />

        <Input
          v-model="addressTwo"
          label="Address 2"
          class="group"
          @input="updateForm({ values: $event, key: 'addressTwo' })"
        />

        <Row>
          <Column :md="5">
            <Input
              v-model="city"
              label="City"
              class="group"
              @input="updateForm({ values: $event, key: 'city' })"
            />
          </Column>
          <Column :md="2">
            <Input
              v-model="state"
              label="State"
              class="group"
              @input="updateForm({ values: $event, key: 'state' })"
            />
          </Column>
          <Column :md="2">
            <Input
              v-model="zip"
              label="Zip or Postal"
              class="group"
              @input="updateForm({ values: $event, key: 'zip' })"
            />
          </Column>
          <Column :md="3">
            <Select
              v-model="country"
              label="Select Country"
              class="group"
              @input="updateForm({ values: $event, key: 'country' })"
            >
              <option v-for="country in countries" :key="country">
                {{ country }}
              </option>
            </Select>
          </Column>
        </Row>

        <Row>
          <Column :md="8">
            <Input
              v-model="dob"
              label="Date of Birth"
              class="group"
              @input="updateForm({ values: $event, key: 'dob' })"
            />
          </Column>

          <Column :md="4">
            <Select
              v-model="sex"
              label="Sex"
              @input="updateForm({ values: Number($event), key: 'sex' })"
            >
              <option v-for="(sex, index) in sexes" :key="index" :value="index">
                {{ sex }}
              </option>
            </Select>
          </Column>
        </Row>

        <Textarea
          v-model="about"
          rows="4"
          label="About you"
          class="group"
          placeholder="Tell us a little bit about yourself"
          @input="updateForm({ values: $event, key: 'about' })"
        />

        <Input
          v-model="websiteUrl"
          label="URL"
          class="group"
          @input="updateForm({ values: $event, key: 'websiteUrl' })"
        />

        <h3>Work</h3>
        <Input
          v-model="company"
          label="Company"
          class="group"
          @input="updateForm({ values: $event, key: 'company' })"
        />

        <Checkbox
          name="for-hire"
          label="Available for hire"
          class="group"
          :checked="forHire"
          @input="updateForm({ values: $event, key: 'forHire' })"
        />

        <LanguageSkills :profile="profile" @change="updateForm" />
      </Column>
      <Column :md="4">
        <h3>Avatar</h3>

        <Avatar v-if="user" :user="user" class="xl" />

        <FileChooser @change="crop">
          <template #default="{update}">
            <Button type="button" class="outline muted" @click="update">
              Upload new avatar
            </Button>
          </template>
        </FileChooser>
      </Column>
    </Row>

    <Button type="submit" class="primary">
      Save
    </Button>
  </form>
</template>

<script>
import { getNameList } from 'country-list'
import { mapState } from 'vuex'

import Avatar from '@/components/user/Avatar'
import FileChooser from '@/components/FileChooser'
import CropperModal from '@/components/modal/CropperModal'
import Input from '@/components/form/Input'
import Textarea from '@/components/form/Textarea'
import Select from '@/components/form/Select'
import Checkbox from '@/components/form/Checkbox'
import LanguageSkills from '@/components/game/LanguageSkills.vue'

export default {
  name: 'Profile',

  components: {
    Avatar,
    FileChooser,
    Input,
    Textarea,
    Select,
    Checkbox,
    LanguageSkills
  },

  data: () => {
    return {
      countries: Object.keys(getNameList()).map(
        (it) => it[0].toUpperCase() + it.slice(1)
      ),
      sexes: ['Male', 'Female', 'Other']
    }
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
      sex: (state) => state.user.profile.sex,
      about: (state) => state.user.profile.about,
      websiteUrl: (state) => state.user.profile.websiteUrl,
      company: (state) => state.user.profile.company,
      forHire: (state) => state.user.profile.forHire
    }),

    user() {
      return this.$store.state.user.user
    },

    profile() {
      return this.$store.state.user.profile
    }
  },

  methods: {
    updateForm({ values, key }) {
      this.$store.commit('user/profileUpdate', { key, values })
    },

    async crop(result) {
      const cropped = await this.$open(CropperModal, { data: result })
      this.$store.dispatch('user/avatar', cropped)
    },

    async save() {
      await this.$store.dispatch('user/settings')
    }
  }
}
</script>
