<template>
    <div class="CompetitorRegistration">
        <PageBanner title="Compete in DevWars" type="competitor"/>

        <div class="footer-offset">
            <div class="container">
                <Card class="plain dark" title="About You">
                    <div class="row">
                        <div class="col-sm-6">
                            <Input
                                v-model="competitor.name.firstName"
                                label="First Name"
                                class="group"
                                required
                            />
                        </div>
                        <div class="col-sm-6">
                            <Input
                                v-model="competitor.name.lastName"
                                label="Last Name"
                                class="group"
                                required
                            />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3">
                            <Select
                                v-model="competitor.address.country"
                                label="Select Country"
                                class="group"
                                required
                            >
                                <option v-for="country in countries" :key="country">{{ country }}</option>
                            </Select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="dob row">
                                <div class="col-sm-4">
                                    <label>Date of birth</label>
                                </div>
                                <div class="col-sm-2">
                                    <Input
                                        v-model="day"
                                        label="DD"
                                        class="group"
                                        maxlength="2"
                                        required
                                    />
                                </div>
                                <div class="col-sm-2">
                                    <Input
                                        v-model="month"
                                        label="MM"
                                        class="group"
                                        maxlength="2"
                                        required
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <Input
                                        v-model="year"
                                        label="YYYY"
                                        class="group"
                                        maxlength="4"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <Input v-model="competitor.company" label="Company" class="group"/>
                        </div>
                    </div>
                </Card>

                <Card class="plain dark" title="Skill Assessment">
                    <LanguageSkills :profile="profile"/>
                </Card>

                <Card class="plain dark" title="Requirements">
                    <div>
                        <ConnectToDiscord/>
                    </div>

                    <p>A microphone is required to play in DevWars to communicate with your team during a game.</p>
                    <Checkbox
                        label="I have a microphone"
                        name="has-microphone"
                        class="group"
                        required
                    />
                </Card>

                <div class="actions">
                    <Button class="primary lg" @click="submit">Register to Compete</Button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import moment from 'moment';
import * as countryList from 'country-list';
import { mapActions } from 'vuex';

import PageBanner from '~/components/layout/PageBanner';
import Card from '~/components/Card';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';
import Checkbox from '~/components/form/Checkbox';
import ConnectToDiscord from '~/components/user/ConnectToDiscord';
import LanguageSkills from '~/components/game/LanguageSkills';
import userHasProvider from '../../utils/linkedAccounts';

export default {
    name: 'CompetitorRegistration',

    components: { PageBanner, Card, Input, ConnectToDiscord, LanguageSkills, Select, Checkbox },

    middleware: ['auth', 'no-competitors'],

    data: () => {
        return {
            month: '',
            day: '',
            year: '',
            languages: [{ name: 'html', skill: 0 }, { name: 'css', skill: 0 }, { name: 'js', skill: 0 }],
            competitor: {
                name: {},
                address: {},
                ratings: {},
            },
            countries: Object.keys(countryList().getNameList()).map((it) => it[0].toUpperCase() + it.slice(1)),
        };
    },

    computed: {
        user() {
            return this.$store.state.user.user;
        },

        links() {
            return this.$store.state.user.linkedAccounts;
        },

        profile() {
            return this.$store.state.user.profile;
        },

        ...mapActions({
            error: 'toast/error',
        }),
    },

    async asyncData({ query, $axios }) {
        if (!query.schedule) return;
        const res = await $axios.get(`/schedules/${query.schedule}`);

        return { schedule: res.data };
    },

    methods: {
        async submit() {
            const hasDiscord = userHasProvider(this.links, 'DISCORD');

            if (!hasDiscord) {
                return this.error('You must connect your discord before moving forward with your registration.');
            }

            const date = moment.utc(`${this.month} ${this.day} ${this.year}`, 'MM DD YYYY').startOf('day');

            this.languages.forEach((language) => {
                this.competitor.ratings[language] = language.skill + 1;
            });

            this.competitor.dob = date.unix() * 1000;

            try {
                // await Http.for(`user/${this.user.id}/competitor`).save(
                //     this.competitor
                // );

                // await this.$axios.

                if (this.schedule) {
                    await this.$store.dispatch('game/apply', this.schedule);
                }

                this.$store.dispatch('toast/success', `Congratulations! You are now a competitor!`);
            } catch (e) {
                this.$store.dispatch('toast/errors', e);
            }
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.CompetitorRegistration {
    .Card /deep/ {
        .inner {
            padding: 25px 30px 35px;
        }

        .title {
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
}
</style>
