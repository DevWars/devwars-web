<template>
  <div>
    <PageBanner title="You've been entered!" type="competitor" />

    <div class="footer-offset">
      <Container>
        <Card>
          <h2>What's next?</h2>
          <p>
            You will receive an email confirmation if you have been selected to
            play. Only 6 players will be selected, one for each position.
          </p>

          <h2>How to prepare</h2>
          <p>
            There are a lot of things you should probably catch up on before
            game day. Below is our DevWars Documentation covering everything you
            need to know.
          </p>

          <Button to="/docs" class="primary">
            View Documentation
          </Button>
          <p>
            Have any questions?
            <a href="/contact">Contact Us</a>
          </p>
        </Card>
      </Container>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import PageBanner from '@/components/layout/PageBanner'

export default {
  name: 'GameConfirmation',
  components: { Card, PageBanner }
}
</script>
