<template>
    <div>
        <PageBanner title="Compete in DevWars" type="competitor"/>

        <div class="footer-offset">
            <Container>
                <Card class="plain dark">
                    <h3 class="modpanel__title">You are already registered as a Competitor</h3>
                    <p>Want to compete in an upcoming game?</p>
                    <ButtonGroup class="mt-30">
                        <Button href="/schedule" class="primary">View schedule</Button>
                        <Button href="/" class="outline">Back to home</Button>
                    </ButtonGroup>
                </Card>
            </Container>
        </div>
    </div>
</template>


<script>
import Card from '@/components/Card';
import PageBanner from '@/components/layout/PageBanner';
import { names } from '../../utils/auth';

export default {
    name: 'CompetitorRegistration',
    components: { Card, PageBanner },
    meta: {
        auth: names.USER,
    },
};
</script>
