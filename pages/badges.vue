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
        badges: [],
        userBadges: [],
    }),

    computed: {
        ...mapState('user', ['user']),
    },

    mounted() {
        this.fetchAllBadges();
    },

    methods: {
        async fetchAllBadges() {
            this.badges = await this.$api.badges.currentBadges();
            this.userBadges = await this.$api.users.getUserBadges(this.user.id);
        },
    },
};
</script>
