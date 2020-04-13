<template>
    <div>
        <PageBanner title="Settings" />

        <div class="footer-offset">
            <Container>
                <Row>
                    <LinkTabs>
                        <nuxt-link to="profile">Profile</nuxt-link>
                        <nuxt-link to="account">Account</nuxt-link>
                        <nuxt-link to="connections">Connections</nuxt-link>
                        <nuxt-link to="notifications">Notifications</nuxt-link>
                    </LinkTabs>

                    <Card class="plain dark">
                        <nuxt />
                    </Card>
                </Row>
            </Container>
        </div>
    </div>
</template>

<script>
import { names } from '../utils/auth';
import LinkTabs from '../components/LinkTabs';
import Card from '@/components/Card';
import PageBanner from '@/components/layout/PageBanner';

export default {
    name: 'SettingsPage',

    meta: {
        auth: names.USER,
    },

    components: { LinkTabs, Card, PageBanner },
};
</script>

<style lang="scss" scoped>
/deep/ h3 {
    margin-bottom: 30px;
}
</style>
