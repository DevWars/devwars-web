<template>
  <div>
    <PanelHeader :model="search" title="Users" @input="input">
      <Input
        v-model="search"
        label="Search Users"
        @keyup.enter.native="performSearch"
      />
      <Button :disabled="!searched" @click="clearSearch">
        Clear
      </Button>
      <Button :disabled="searching || search == null" @click="performSearch">
        Search
      </Button>
    </PanelHeader>

    <Table>
      <tr slot="head">
        <th>Profile</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Connections</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="user in users.data" :key="user.id">
        <td><Avatar :user="user" class="md" /></td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <ConnectionsSmall :connections="user.connections" />
        </td>
        <td>
          <Button :to="`/dashboard/${user.id}`" class="link">
            View
          </Button>
        </td>
      </tr>

      <tr v-if="users.length === 0">
        <td />
        <td />
        <td />
        <td>No Results</td>
        <td />
        <td />
      </tr>
    </Table>

    <Pagination
      :page="page"
      :per-page="10"
      :can-next="users.pagination.after != null"
      :can-previous="users.pagination.before != null"
      @next="next"
      @previous="previous"
    />
  </div>
</template>

<script>
import { names } from '../../utils/auth'
import Http from '../../services/Http'

import Input from '@/components/form/Input'
import Avatar from '@/components/user/Avatar'
import PanelHeader from '@/components/mod/PanelHeader'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import ConnectionsSmall from '@/components/user/ConnectionsSmall'

export default {
  name: 'ModUsers',
  meta: {
    auth: names.MODERATOR
  },

  components: {
    PanelHeader,
    Table,
    Pagination,
    Avatar,
    Input,
    ConnectionsSmall
  },

  data() {
    return {
      page: 0,
      search: null,
      searched: false,
      searching: false,
      users: {}
    }
  },

  async asyncData({ parmas }) {
    const users = await Http.for(`users`).get(`?after=0&first=10`)
    return { users }
  },

  methods: {
    input(searchText) {
      this.search = searchText
    },

    async performSearch() {
      if (this.search == null || this.search.trim() === '') return

      const users = await Http.for(`users/lookup`).get(
        `?username=${this.search}&full=true`
      )

      this.users = { data: users, pagination: {} }
      this.searched = true
    },

    async clearSearch() {
      this.users = await Http.for(`users`).get(`?after=0&first=10`)
      this.searched = false
      this.search = null
      this.page = 0
    },

    async previous() {
      this.page -= 1
      const { pagination } = this.users
      const before = pagination.before.split('users')[1]
      this.users = await Http.for(`users${before}`).get()
    },
    async next() {
      this.page += 1
      const { pagination } = this.users
      const after = pagination.after.split('users')[1]
      this.users = await Http.for(`users${after}`).get()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.mod-status {
  font-weight: $font-weight-bold;

  &.scheduled {
    color: $info-color;
  }

  &.preparing {
    color: $warning-color;
  }

  &.live {
    color: $danger-color;
  }

  &.active,
  &.complete {
    color: $success-color;
  }

  &.ended {
    color: $text-color-muted;
  }
}
</style>
