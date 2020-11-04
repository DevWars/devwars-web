<template>
    <div class="BadgePage">
        <PageBanner title="Badges" />

        <Container class="footer-offset">
            <Row>
                <Column v-for="badge in badges" :key="badge.id" :lg="3" :md="4" :sm="6">
                    <BadgeCard :badge="badge" :user-badges="userBadges" />
                </Column>
            </Row>
        </Container>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { names } from '../utils/auth';
import PageBanner from '@/components/layout/PageBanner';
import BadgeCard from '@/components/dashboard/BadgeCard';

export default {
    name: 'BadgePage',

    meta: {
        auth: names.USER,
    },

    components: { PageBanner, BadgeCard },

    data: () => ({
        userBadges: [],

        badges: [
            {
                id: 1,
                updatedAt: '2020-11-03T23:10:56.733Z',
                createdAt: '2020-11-03T23:10:56.733Z',
                name: 'Authentic',
                description: 'Verify your e-mail address',
                awarding_experience: 0,
                awarding_coins: 500,
                variant: 0,
            },
            {
                id: 2,
                updatedAt: '2020-11-03T23:10:56.740Z',
                createdAt: '2020-11-03T23:10:56.740Z',
                name: 'Making Links',
                description: 'Connect any one social media account to your profile',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 3,
                updatedAt: '2020-11-03T23:10:56.742Z',
                createdAt: '2020-11-03T23:10:56.742Z',
                name: 'Full Coverage',
                description: 'Connect all possible social media accounts to your profile',
                awarding_experience: 0,
                awarding_coins: 1300,
                variant: 0,
            },
            {
                id: 4,
                updatedAt: '2020-11-03T23:10:56.743Z',
                createdAt: '2020-11-03T23:10:56.743Z',
                name: 'Feed The Pig',
                description: 'Save up 5000 Devcoins',
                awarding_experience: 0,
                awarding_coins: 0,
                variant: 0,
            },
            {
                id: 5,
                updatedAt: '2020-11-03T23:10:56.744Z',
                createdAt: '2020-11-03T23:10:56.744Z',
                name: 'Penny-Pincher',
                description: 'Save up 25000 Devcoins',
                awarding_experience: 0,
                awarding_coins: 0,
                variant: 0,
            },
            {
                id: 6,
                updatedAt: '2020-11-03T23:10:56.746Z',
                createdAt: '2020-11-03T23:10:56.746Z',
                name: 'High Roller',
                description: 'Earn 10000 Devcoins from betting',
                awarding_experience: 0,
                awarding_coins: 0,
                variant: 0,
            },
            {
                id: 7,
                updatedAt: '2020-11-03T23:10:56.747Z',
                createdAt: '2020-11-03T23:10:56.747Z',
                name: 'Innovator',
                description: 'Submit an idea that gets implemented',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 8,
                updatedAt: '2020-11-03T23:10:56.748Z',
                createdAt: '2020-11-03T23:10:56.748Z',
                name: 'Exterminator',
                description: 'Find a bug and report it to the DevWars team',
                awarding_experience: 0,
                awarding_coins: 1700,
                variant: 0,
            },
            {
                id: 9,
                updatedAt: '2020-11-03T23:10:56.749Z',
                createdAt: '2020-11-03T23:10:56.749Z',
                name: 'Follow Me',
                description: 'Refer 5 friends using your custom referral link',
                awarding_experience: 0,
                awarding_coins: 1300,
                variant: 0,
            },
            {
                id: 10,
                updatedAt: '2020-11-03T23:10:56.750Z',
                createdAt: '2020-11-03T23:10:56.750Z',
                name: 'Influential',
                description: 'Refer 25 friends using your custom referral link',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 11,
                updatedAt: '2020-11-03T23:10:56.752Z',
                createdAt: '2020-11-03T23:10:56.752Z',
                name: 'Natural Leader',
                description: 'Refer 50 friends using your custom referral link',
                awarding_experience: 0,
                awarding_coins: 4100,
                variant: 0,
            },
            {
                id: 12,
                updatedAt: '2020-11-03T23:10:56.753Z',
                createdAt: '2020-11-03T23:10:56.753Z',
                name: 'Ace High',
                description: 'Complete all objectives in a single game of DevWars',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 13,
                updatedAt: '2020-11-03T23:10:56.754Z',
                createdAt: '2020-11-03T23:10:56.754Z',
                name: 'First Timer',
                description: 'Watch your first game of DevWars',
                awarding_experience: 0,
                awarding_coins: 500,
                variant: 0,
            },
            {
                id: 14,
                updatedAt: '2020-11-03T23:10:56.755Z',
                createdAt: '2020-11-03T23:10:56.755Z',
                name: 'Hobbyist',
                description: 'Watch 5 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 15,
                updatedAt: '2020-11-03T23:10:56.756Z',
                createdAt: '2020-11-03T23:10:56.756Z',
                name: 'Biggest Fan',
                description: 'Watch 25 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 1300,
                variant: 0,
            },
            {
                id: 16,
                updatedAt: '2020-11-03T23:10:56.757Z',
                createdAt: '2020-11-03T23:10:56.757Z',
                name: 'Obsessed',
                description: 'Watch 50 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 17,
                updatedAt: '2020-11-03T23:10:56.759Z',
                createdAt: '2020-11-03T23:10:56.759Z',
                name: "Beginner's Luck",
                description: 'Win your first game of DevWars',
                awarding_experience: 0,
                awarding_coins: 2900,
                variant: 0,
            },
            {
                id: 18,
                updatedAt: '2020-11-03T23:10:56.760Z',
                createdAt: '2020-11-03T23:10:56.760Z',
                name: 'Victorious',
                description: 'Win 5 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 19,
                updatedAt: '2020-11-03T23:10:56.761Z',
                createdAt: '2020-11-03T23:10:56.761Z',
                name: 'Hotshot',
                description: 'Win 10 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 20,
                updatedAt: '2020-11-03T23:10:56.762Z',
                createdAt: '2020-11-03T23:10:56.762Z',
                name: 'Steamroller',
                description: 'Win 25 games of DevWars',
                awarding_experience: 0,
                awarding_coins: 4900,
                variant: 0,
            },
            {
                id: 21,
                updatedAt: '2020-11-03T23:10:56.763Z',
                createdAt: '2020-11-03T23:10:56.763Z',
                name: 'Hot Streak',
                description: 'Win 3 games of DevWars in a row',
                awarding_experience: 0,
                awarding_coins: 1300,
                variant: 0,
            },
            {
                id: 22,
                updatedAt: '2020-11-03T23:10:56.764Z',
                createdAt: '2020-11-03T23:10:56.764Z',
                name: 'On The Ball',
                description: 'Answer first on a Twitch quiz question',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 23,
                updatedAt: '2020-11-03T23:10:56.765Z',
                createdAt: '2020-11-03T23:10:56.765Z',
                name: 'Smarty Pants',
                description: 'Answer 10 Twitch quiz questions first',
                awarding_experience: 0,
                awarding_coins: 1300,
                variant: 0,
            },
            {
                id: 24,
                updatedAt: '2020-11-03T23:10:56.766Z',
                createdAt: '2020-11-03T23:10:56.766Z',
                name: "I'm All In",
                description: 'Bet ALL of your Devcoins in a stream and win',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 25,
                updatedAt: '2020-11-03T23:10:56.767Z',
                createdAt: '2020-11-03T23:10:56.767Z',
                name: 'Cake Day',
                description: 'Visit DevWars on your birthday',
                awarding_experience: 0,
                awarding_coins: 2100,
                variant: 0,
            },
            {
                id: 26,
                updatedAt: '2020-11-03T23:10:56.768Z',
                createdAt: '2020-11-03T23:10:56.768Z',
                name: 'Poll position',
                description: 'Complete a poll or a survey',
                awarding_experience: 0,
                awarding_coins: 900,
                variant: 0,
            },
            {
                id: 27,
                updatedAt: '2020-11-03T23:10:56.769Z',
                createdAt: '2020-11-03T23:10:56.769Z',
                name: 'Rapid Response',
                description: 'Complete 25 polls or surveys',
                awarding_experience: 0,
                awarding_coins: 3300,
                variant: 0,
            },
            {
                id: 28,
                updatedAt: '2020-11-03T23:10:56.770Z',
                createdAt: '2020-11-03T23:10:56.770Z',
                name: 'Coin Hoarder',
                description: 'Buy this badge from the coinshop to unlock it',
                awarding_experience: 0,
                awarding_coins: 0,
                variant: 0,
            },
        ],
    }),

    computed: {
        ...mapState('user', ['user']),
    },

    mounted() {
        this.fetchUserBadges();
    },

    methods: {
        async fetchUserBadges() {
            this.userBadges = await this.$api.users.getUserBadges(this.user.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.BadgePage {
    .BadgeCard {
        align-self: stretch;
    }
}
</style>
