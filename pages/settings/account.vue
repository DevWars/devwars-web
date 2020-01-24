<template>
  <Row v-if="user">
    <Column :sm="8">
      <Input v-model="user.username" label="Username" class="group" />

      <h3>Email</h3>
      <Input
        v-model="emailCurrentPassword"
        type="password"
        label="Current Password"
        class="group"
        required
      />
      <Input v-model="newEmail" label="New Email" class="group" />

      <Button class="primary" :async-click="changeEmail">
        Change Email
      </Button>

      <h3>Password</h3>
      <Input
        v-model="currentPassword"
        type="password"
        label="Current Password"
        class="group"
        required
      />
      <Input
        v-model="newPassword"
        type="password"
        label="New Password"
        class="group"
        required
      />
      <Input
        v-model="newPasswordConfirmed"
        type="password"
        label="Confirm New Password"
        class="group"
        required
      />

      <Button
        class="primary"
        :disabled="
          !(
            currentPassword &&
            newPassword &&
            newPassword === newPasswordConfirmed
          )
        "
        :async-click="changePassword"
      >
        Change Password
      </Button>
    </Column>
    <Column :sm="4" />
  </Row>
</template>

<script>
import Input from '@/components/form/Input'

export default {
  name: 'Accounts',
  components: { Input },
  data: () => {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmed: '',
      emailCurrentPassword: '',
      newEmail: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  methods: {
    async changeEmail() {
      await this.$store.dispatch('user/email', {
        email: this.newEmail,
        password: this.emailCurrentPassword
      })
    },
    async changePassword() {
      await this.$store.dispatch('user/password', {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword
      })
    }
  }
}
</script>
