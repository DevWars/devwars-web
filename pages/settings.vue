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
import Tabs from '~/components/Tabs';
import Card from '~/components/Card';
import PageBanner from '~/components/layout/PageBanner';

export default {
    name: 'Settings',

    components: { Tabs, Card, PageBanner },
};
</script>


<style lang="scss" scoped>
/deep/ h3 {
    margin-bottom: 30px;
}
</style>

