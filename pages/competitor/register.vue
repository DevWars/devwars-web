<template>
  <div class="CompetitorRegistration">
    <PageBanner title="Compete in DevWars" type="competitor" />

    <div class="footer-offset">
      <Container>
        <Card class="plain dark" title="About You">
          <Row>
            <Column :sm="6">
              <Input
                v-model="profile.firstName"
                label="First Name"
                class="group"
                required
                @input="(e) => change('profile.firstName', e)"
              />
            </Column>
            <Column :sm="6">
              <Input
                v-model="profile.lastName"
                label="Last Name"
                class="group"
                required
                @input="(e) => change('profile.lastName', e)"
              />
            </Column>
          </Row>

          <Row>
            <Column :sm="6">
              <!-- <Row class="dob">
                                <Column :sm="4">
                                    <label>Date of birth</label>
                                </Column>
                                <Column :sm="2">
                                    <Input
                                        v-model="day"
                                        label="DD"
                                        class="group"
                                        maxlength="2"
                                        required
                                        @input="e => day = e"
                                    />
                                </Column>
                                <Column :sm="2">
                                    <Input
                                        v-model="month"
                                        label="MM"
                                        class="group"
                                        maxlength="2"
                                        min="01"
                                        max="12"
                                        required
                                        @input="e => month = e"
                                    />
                                </Column>
                                <Column :sm="4">
                                    <Input
                                        v-model="year"
                                        label="YYYY"
                                        class="group"
                                        maxlength="4"
                                        required
                                        @input="e => year = e"
                                    />
                                </Column>
                            </Row>-->
            </Column>
            <Column :md="3">
              <Select
                v-model="sex"
                label="Sex"
                @change="(e) => change('profile.sex', e)"
              >
                <option v-for="(sex, index) in sexes" :key="sex" :value="index">
                  {{ sex }}
                </option>
              </Select>
            </Column>
            <Column :sm="3">
              <Select
                v-model="profile.country"
                label="Select Country"
                class="group"
                required
                @change="(e) => change('profile.country', e)"
              >
                <option v-for="country in countries" :key="country">
                  {{ country }}
                </option>
              </Select>
            </Column>
          </Row>

          <Row>
            <Column :sm="6">
              <Input
                v-model="profile.company"
                label="Company"
                class="group"
                @input="(e) => change('profile.company', e)"
              />
            </Column>
          </Row>
        </Card>

        <Card class="plain dark" title="Skill Assessment">
          <LanguageSkills
            :profile="profile"
            @change="(e) => change('profile.skills', e.values)"
          />
        </Card>

        <Card class="plain dark" title="Requirements">
          <div>
            <ConnectToDiscord />
          </div>

          <p>
            A microphone is required to play in DevWars to communicate with your
            team during a game.
          </p>
          <Checkbox
            label="I have a microphone"
            name="has-microphone"
            class="group"
            required
            @input="(e) => (hasMic = e)"
          />
        </Card>

        <div class="actions">
          <Button class="primary lg" @click="submit">
            Register to Compete
          </Button>
        </div>
      </Container>
    </div>
  </div>
</template>

<script>
// import moment from 'moment';
import { getNameList } from 'country-list'
import { mapActions } from 'vuex'

import PageBanner from '@/components/layout/PageBanner'
import Card from '@/components/Card'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import LanguageSkills from '@/components/game/LanguageSkills'
import ConnectToDiscord from '@/components/user/ConnectToDiscord'
import Checkbox from '@/components/form/Checkbox'
import { names } from '@/utils/auth'

export default {
  name: 'CompetitorRegistration',

  components: {
    PageBanner,
    Checkbox,
    Select,
    Card,
    Input,
    ConnectToDiscord,
    LanguageSkills
  },
  middleware: ['no-competitors'],
  meta: {
    auth: names.USER
  },

  data: () => {
    return {
      hasMic: false,
      tmp: {
        profile: {},
        skills: {}
      },
      countries: Object.keys(getNameList()).map(
        (it) => it[0].toUpperCase() + it.slice(1)
      ),
      sexes: ['Male', 'Female', 'Other']
    }
  },

  computed: {
    getDiscord() {
      return this.$store.getters['user/getDiscord']
    },

    links() {
      return this.$store.state.user.linkedAccounts
    },

    // day: {
    //     get() {
    //         return new Date(this.profile.dob).getUTCDate();
    //     },
    //     set(val) {
    //         this.tmp.dob = {
    //             day: val,
    //             month: this.month,
    //             year: this.year,
    //         };
    //     },
    // },

    // month: {
    //     get() {
    //         return new Date(this.profile.dob).getUTCMonth();
    //     },
    //     set(val) {
    //         this.tmp.dob = {
    //             day: this.day,
    //             month: val,
    //             year: this.year,
    //         };
    //     },
    // },

    // year: {
    //     get() {
    //         return new Date(this.profile.dob).getUTCFullYear();
    //     },
    //     set(val) {
    //         this.tmp.dob = {
    //             day: this.day,
    //             month: this.month,
    //             year: val,
    //         };
    //     },
    // },

    profile() {
      return this.$store.state.user.profile
    },

    ...mapActions({
      error: 'toast/error'
    })
  },

  // async asyncData({ query, $axios }) {
  //     if (!query.schedule) return;
  //     const res = await $axios.get(`/schedules/${query.schedule}`);

  //     return { schedule: res.data };
  // },

  methods: {
    async submit() {
      if (!this.discord) {
        return this.$store.dispatch(
          'toast/error',
          'You must connect your Discord account'
        )
      }

      if (!this.hasMic) {
        return this.$store.dispatch(
          'toast/error',
          'Microphone required to compete'
        )
      }

      const finalProfile = {
        ...this.profile,
        ...this.tmp.profile
      }
      const finalSkills = {
        ...this.profile.skills,
        ...this.tmp.skills
      }
      // let date = this.profile.dob;
      // if (this.tmp.dob) {
      //     const { year, month, day } = this.tmp.dob;
      //     // const finalDob = new Date(Date.UTC(year, month - 1, day));
      //     // TODO: we should discuss about it here i am not sure i format well the date
      //     date = moment.utc(`${month} ${day} ${year}`, 'MM DD YYYY');
      //     // date = date.unit() * 1000;
      // }

      try {
        const userProfile = {
          ...finalProfile,
          skills: finalSkills
          // dob: date,
        }
        await this.$axios.patch(`/user/${this.user.id}/profile`, userProfile)

        if (this.schedule) {
          await this.$store.dispatch('game/apply', this.schedule)
        }

        this.$store.dispatch(
          'toast/success',
          'Congratulations! You are now a competitor!'
        )
      } catch (e) {
        this.$store.dispatch('toast/error', e.response.data)
      }
    },

    change(key, val) {
      const dest = key.split('.')
      if (dest.length !== 2) {
        return
      }
      this.tmp[dest[0]][dest[1]] = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.CompetitorRegistration {
  .Card {
    padding: 25px 30px 35px;

    /deep/ .title {
      display: inline-block;
      border-bottom: 1px solid $brand-secondary;
      margin-bottom: 30px;

      &:first-of-type {
        margin-top: 0;
      }
    }
  }

  .dob label {
    @extend %align-baseline-to-input-with-labels;
  }

  .actions {
    text-align: center;
    margin-top: $m-space;
  }

  .ConnectToDiscord {
    margin-bottom: 30px;
  }
}
</style>
