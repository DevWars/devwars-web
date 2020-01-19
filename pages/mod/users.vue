<template>
    <div>
        <PanelHeader title="Users" showSearch @input="input">
            <Button :disabled="searching" @click="performSearch">Search</Button>
        </PanelHeader>

        <Table>
            <tr slot="head">
                <th>Profile</th>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Signed In</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="user in users" :key="user.id">
                <td><Avatar :user="user" class="md" /></td>
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.lastSignIn | moment('MM/DD/YYYY') }}</td>
                <td>
                    <Button :to="'/dashboard/' + user.id" class="link">View</Button>
                </td>
            </tr>

            <tr v-if="users.length === 0">
                <td></td>
                <td></td>
                <td></td>
                <td>No Results</td>
                <td></td>
                <td></td>
            </tr>
        </Table>

        <Pagination
            :page="paging.page"
            :perPage="paging.limit"
            :count="users.length > 0 ? 99999 : 0"
            @next="() => page(true)"
            @previous="() => page(false)"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Avatar from '@/components/user/Avatar';
import PanelHeader from '@/components/mod/PanelHeader';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

import { names } from '../../utils/auth';

export default {
    name: 'ModUsers',
    meta: {
        auth: names.MODERATOR,
    },

    components: { PanelHeader, Table, Pagination, Avatar },

    async fetch({ store }) {
        await store.dispatch('moderation/users');
    },

    data() {
        return {
            search: '',
        };
    },

    computed: {
        ...mapGetters({
            users: 'moderation/users',
            searching: 'moderation/usersSearching',
            paging: 'moderation/userPaging',
        }),
    },
    methods: {
        input(searchText) {
            this.search = searchText;
        },

        performSearch() {
            if (this.search.trim() === '') return this.$store.dispatch('moderation/users');
            this.$store.dispatch('moderation/usersBySearch', this.search);
        },

        page(forward) {
            this.$store.dispatch('moderation/pageUsers', forward);
        },
    },
};
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
