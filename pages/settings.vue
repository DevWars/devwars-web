<template>
    <div>
        <PageBanner title="Settings"/>

        <div class="footer-offset">
            <Container>
                <Row>
                    <Tabs>
                        <nuxt-link to="profile">Profile</nuxt-link>
                        <nuxt-link to="account">Account</nuxt-link>
                        <nuxt-link to="connections">Connections</nuxt-link>
                        <nuxt-link to="email">Email Settings</nuxt-link>
                    </Tabs>

                    <Card class="plain dark">
                        <nuxt/>
                    </Card>
                </Row>
            </Container>
        </div>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs';
import Card from '@/components/Card';
import PageBanner from '@/components/layout/PageBanner';
import { names } from '../utils/auth';

export default {
    name: 'Settings',
    meta: {
        auth: names.USER,
    },
    components: { Tabs, Card, PageBanner },
};
</script>

<style lang="scss" scoped>
/deep/ h3 {
    margin-bottom: 30px;
}
</style>
