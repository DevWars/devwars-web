<template>
    <DashboardCard
        class="Moderation scrollable"
        title="Moderation"
        icon="gavel"
    >
        <div class="main">
            <Button :disabled="!isAdmin" class="danger" @click="deleteUser">
                Delete
            </Button>

            <Button v-if="!currentUserBanned" class="danger" @click="banUser">
                Ban
            </Button>
            <Button v-else class="danger" @click="removeUserBan">
                Remove Ban
            </Button>
        </div>
    </DashboardCard>
</template>

<script>
import DashboardCard from '@/components/DashboardCard';
import DeleteModal from '@/components/modal/DeleteModal';

export default {
    name: 'Moderation',

    components: { DashboardCard },

    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    computed: {
        isAdmin() {
            const { role } = this.$store.state.user.user;
            return role === 'ADMIN';
        },

        isModerator() {
            const { role } = this.$store.state.user.user;
            return role === 'MODERATOR';
        },

        currentUserBanned() {
            return this.user.role === 'BANNED';
        },
    },

    methods: {
        async deleteUser() {
            const { username, id } = this.user;

            const result = await this.$open(DeleteModal, {
                title: `Delete User ${username}?`,
                description: `Are you sure you want delete the user ${username}? Doing so will remove all related information and data.`,
            });

            if (result) {
                await this.$axios.delete(`/users/${id}`);
                this.$router.push('/dashboard');
            }
        },

        async banUser() {
            const { username, id } = this.user;

            const result = await this.$open(DeleteModal, {
                title: `Ban User ${username}?`,
                confirm: 'Ban User',
                description: `Are you sure you want ban the user ${username}? Doing so will kick them out there current season.`,
            });

            if (result) {
                const body = { role: 'BANNED' };
                await this.$axios.put(`/users/${id}`, body);
                this.user.role = body.role;
            }
        },

        async removeUserBan() {
            const { username, id } = this.user;

            const result = await this.$open(DeleteModal, {
                title: `Remove Ban From User ${username}?`,
                confirm: 'Remove Ban',
                description: `Are you sure you want remove the ban from the user ${username}? This will allow them to login again.`,
            });

            if (result) {
                const body = { role: 'USER' };
                await this.$axios.put(`/users/${id}`, body);
                this.user.role = body.role;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Moderation {
    /deep/ {
        .main {
            @extend %flex-justify;
            padding: $grid-gutter-width;
            border-bottom: 1px solid $divider-color;
            float: left;

            button {
                margin-right: 10px;
            }
        }

        .actions {
            width: 100px;
        }
    }
}
</style>
