<template>
  <div>
    <PageBanner title="Compete in DevWars" type="competitor" />

    <div class="footer-offset">
      <Container>
        <Card class="plain dark">
          <h3>You are already registered as a Competitor</h3>
          <p>Want to compete in an upcoming game?</p>
          <ButtonGroup class="mt-30">
            <Button href="/schedule" class="primary">
              View schedule
            </Button>
            <Button href="/" class="outline">
              Back to home
            </Button>
          </ButtonGroup>
        </Card>
      </Container>
    </div>
  </div>
</template>

<script>
import { names } from '../../utils/auth'
import Card from '@/components/Card'
import PageBanner from '@/components/layout/PageBanner'

export default {
  name: 'CompetitorRegistration',
  components: { Card, PageBanner },
  meta: {
    auth: names.USER
  }
}
</script>
