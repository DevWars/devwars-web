<template>
  <div class="Leaderboards">
    <PageBanner title="Leaderboards" />

    <Container class="footer-offset">
      <Table>
        <tr slot="head">
          <th width="10%">
            Rank
          </th>
          <th width="30%">
            Username
          </th>
          <th width="15%">
            Level
          </th>
          <th width="15%">
            Won
          </th>
          <th width="15%">
            Coins
          </th>
          <th width="15%">
            XP
          </th>
        </tr>

        <tr v-for="(user, index) in leaderboards.data" :key="user.userId">
          <td scope="row" class="rank">
            {{ page * 10 + index + 1 }}
          </td>
          <td><User :user="user" size="sm" /></td>
          <td>{{ user.level }}</td>
          <td>{{ user.wins }}</td>
          <td>{{ user.coins }}</td>
          <td>
            {{ user.xp }}
          </td>
        </tr>
      </Table>

      <Pagination
        :page="page"
        :per-page="10"
        :can-next="leaderboards.pagination.after !== null"
        :can-previous="leaderboards.pagination.before !== null"
        @previous="previous"
        @next="next"
      />
    </Container>
  </div>
</template>

<script>
import Http from '../services/Http'
import PageBanner from '@/components/layout/PageBanner'
import Table from '@/components/Table'
import User from '@/components/user/User'
import Pagination from '@/components/Pagination'

export default {
  name: 'Leaderboards',

  components: { PageBanner, Table, User, Pagination },

  async asyncData() {
    return { leaderboards: await Http.for('users/leaderboards?first=10').get() }
  },

  data: () => {
    return {
      page: 0,
      pagination: {
        after: null,
        before: null
      },
      data: []
    }
  },

  mounted() {},

  methods: {
    async previous() {
      this.page -= 1

      const { pagination } = this.leaderboards
      const before = pagination.before.split('users/leaderboards')[1]
      this.leaderboards = await Http.for(`users/leaderboards${before}`).get()
    },

    async next() {
      this.page += 1

      const { pagination } = this.leaderboards
      const after = pagination.after.split('users/leaderboards')[1]
      this.leaderboards = await Http.for(`users/leaderboards${after}`).get()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Leaderboards {
  .rank {
    padding-left: 20px;
    font-size: 15px;

    &.increase {
      color: $success-color;
    }
    &.neutral {
      color: $blue-color;
      font-size: 12px;
    }
    &.decrease {
      color: $danger-color;
    }
  }

  .Table td {
    padding-top: $grid-gutter-width;
    padding-bottom: $grid-gutter-width;

    &:last-child {
      text-align: left;
    }
  }
}
</style>
