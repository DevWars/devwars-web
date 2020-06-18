<template>
    <div class="CompetitorRegistration">
        <PageBanner title="Compete in DevWars" type="competitor" />

        <div class="footer-offset">
            <Container>
                <Card class="plain dark" title="About You">
                    <Row>
                        <Column :sm="6">
                            <Input
                                v-model="tmp.profile.firstName"
                                label="First Name"
                                class="group"
                                required
                            />
                        </Column>
                        <Column :sm="6">
                            <Input
                                v-model="tmp.profile.lastName"
                                label="Last Name"
                                class="group"
                                required
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column :md="3">
                            <Select v-model="tmp.profile.sex" label="Sex">
                                <option
                                    v-for="(sex, index) in sexes"
                                    :key="sex"
                                    :value="index"
                                >
                                    {{ sex }}
                                </option>
                            </Select>
                        </Column>
                        <Column :sm="3">
                            <Select
                                v-model="tmp.profile.country"
                                label="Select Country"
                                class="group"
                                required
                            >
                                <option
                                    v-for="country in countries"
                                    :key="country"
                                >
                                    {{ country }}
                                </option>
                            </Select>
                        </Column>
                    </Row>

                    <Row>
                        <Column :sm="6">
                            <Input
                                v-model="tmp.profile.company"
                                label="Company"
                                class="group"
                            />
                        </Column>
                    </Row>
                </Card>

                <Card class="plain dark" title="Skill Assessment">
                    <LanguageSkills
                        :profile="tmp.profile"
                        @change="(e) => change('profile.skills', e.values)"
                    />
                </Card>

                <Card class="plain dark" title="Requirements">
                    <div>
                        <ConnectToDiscord />
                    </div>

                    <p>
                        A microphone is required to play in DevWars to
                        communicate with your team during a game.
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
import { getNameList } from 'country-list';
import { mapActions } from 'vuex';

import PageBanner from '@/components/layout/PageBanner';
import Card from '@/components/Card';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import LanguageSkills from '@/components/game/LanguageSkills';
import ConnectToDiscord from '@/components/user/ConnectToDiscord';
import Checkbox from '@/components/form/Checkbox';
import { names } from '@/utils/auth';

export default {
    name: 'CompetitorRegistration',

    components: {
        PageBanner,
        Checkbox,
        Select,
        Card,
        Input,
        ConnectToDiscord,
        LanguageSkills,
    },
    middleware: ['no-competitors'],
    meta: {
        auth: names.USER,
    },

    data: () => {
        return {
            hasMic: false,
            tmp: {
                profile: {},
                skills: {},
            },
            countries: Object.keys(getNameList()).map(
                (it) => it[0].toUpperCase() + it.slice(1),
            ),
            sexes: ['Male', 'Female', 'Other'],
        };
    },

    computed: {
        getDiscord() {
            return this.$store.getters['user/getDiscord'];
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

    mounted() {
        this.tmp.profile = this.profile;
    },

    methods: {
        async submit() {
            if (!this.discord) {
                return this.$store.dispatch(
                    'toast/error',
                    'You must connect your Discord account',
                );
            }

            if (!this.hasMic) {
                return this.$store.dispatch(
                    'toast/error',
                    'Microphone required to compete',
                );
            }

            const finalProfile = { ...this.profile, ...this.tmp.profile };
            const finalSkills = { ...this.profile.skills, ...this.tmp.skills };

            try {
                const userProfile = { ...finalProfile, skills: finalSkills };

                await this.$api.users.updateUsersProfile(
                    this.user.id,
                    userProfile,
                );

                if (this.schedule) {
                    await this.$store.dispatch('game/apply', this.schedule);
                }

                this.$store.dispatch(
                    'toast/success',
                    'Congratulations! You are now a competitor!',
                );
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        change(key, val) {
            const dest = key.split('.');
            if (dest.length !== 2) {
                return;
            }
            this.tmp[dest[0]][dest[1]] = val;
        },
    },
};
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
