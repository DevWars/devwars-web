<template>
  <div>
    <PageBanner title="Welcome to DevWars!" />

    <div class="footer-offset">
      <Container>
        <Card class="plain dark">
          <h3>Verify your email address</h3>
          <p>
            Confirm your email by clicking the verification link we sent to your
            inbox. Don't forget to
            <u>check your spam folder</u>.
          </p>
          <div>
            <Button class="outline muted" @click="resend">
              Resend Email
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  </div>
</template>

<script>
import Http from '../services/Http'
import { names } from '../utils/auth'
import Card from '@/components/Card'
import PageBanner from '@/components/layout/PageBanner'

export default {
  name: 'Pending',

  meta: {
    auth: names.PENDING,
    limit: true
  },

  components: { Card, PageBanner },

  methods: {
    async resend() {
      await Http.for('auth/reverify').save()
      return this.$store.dispatch(
        'toast/success',
        'We have sent off another email, please wait patiently.'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-offset {
  text-align: center;
}
</style>
