<template>
    <DashboardCard
        class="Moderation scrollable"
        :title="`Moderation - user - ${user.role}`"
        icon="gavel"
    >
        <div class="main">
            <Button
                :disabled="isAdmin || isModerator"
                class="danger"
                @click="deleteUser"
            >
                Delete
            </Button>

            <Button v-if="!isBanned" class="danger" @click="banUser">
                Ban
            </Button>
            <Button v-else class="danger" @click="removeUserBan">
                Remove Ban
            </Button>

            <Button
                :disabled="isUser || isBanned"
                class="danger"
                @click="demoteUser"
            >
                Demote
            </Button>
            <Button
                :disabled="isAdmin || isBanned"
                class="danger"
                @click="promoteUser"
            >
                Promote
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
            const { role } = this.user;
            return role === 'ADMIN';
        },

        isModerator() {
            const { role } = this.user;
            return role === 'MODERATOR';
        },

        isUser() {
            const { role } = this.user;
            return role === 'USER';
        },

        isBanned() {
            return this.user.role === 'BANNED';
        },
    },

    methods: {
        async deleteUser() {
            try {
                const { username, id } = this.user;

                const result = await this.$open(DeleteModal, {
                    title: `Delete User ${username}?`,
                    description: `Are you sure you want delete the user ${username}? Doing so will remove all related information and data.`,
                });

                if (result) {
                    await this.$api.users.deleteUser(id);
                    this.$router.push('/dashboard');
                }
            } catch (e) {
                this.$store.dispatch('toast/error', e);
            }
        },

        async banUser() {
            try {
                const { username, id } = this.user;

                const result = await this.$open(DeleteModal, {
                    title: `Ban User ${username}?`,
                    confirm: 'Ban User',
                    description: `Are you sure you want ban the user ${username}? Doing so will kick them out there current season.`,
                });

                if (result) {
                    const body = { role: 'BANNED' };
                    await this.$api.users.updateUser(id, body);
                    this.user.role = body.role;
                }
            } catch (e) {
                this.$store.dispatch('toast/error', e);
            }
        },

        async removeUserBan() {
            try {
                const { username, id } = this.user;

                const result = await this.$open(DeleteModal, {
                    title: `Remove Ban From User ${username}?`,
                    confirm: 'Remove Ban',
                    description: `Are you sure you want remove the ban from the user ${username}? This will allow them to login again.`,
                });

                if (result) {
                    const body = { role: 'USER' };
                    await this.$api.users.updateUser(id, body);
                    this.user.role = body.role;
                }
            } catch (e) {
                this.$store.dispatch('toast/error', e);
            }
        },

        async promoteUser() {
            try {
                const { id, username, role } = this.user;
                const position = role.toLowerCase();

                const nextRole =
                    position === 'moderator' ? 'Admin' : 'Moderator';

                const result = await this.$open(DeleteModal, {
                    title: 'Promoting User',
                    confirm: 'Promote',
                    description: `Are you sure you want promote ${username} to ${nextRole}?`,
                });

                if (result) {
                    const body = { role: nextRole.toUpperCase(0) };
                    await this.$api.users.updateUser(id, body);
                    this.user.role = body.role;

                    this.$store.dispatch(
                        'toast/success',
                        `The user ${username} is now a ${nextRole}`,
                    );
                }
            } catch (e) {
                this.$store.dispatch('toast/error', e);
            }
        },

        async demoteUser() {
            try {
                const { id, username, role } = this.user;
                const position = role.toLowerCase();

                const nextRole = position === 'admin' ? 'Moderator' : 'User';

                const result = await this.$open(DeleteModal, {
                    title: 'Demoting User',
                    confirm: 'Demote',
                    description: `Are you sure you want demote ${username} to ${nextRole}?`,
                });

                if (result) {
                    const body = { role: nextRole.toUpperCase(0) };
                    await this.$api.users.updateUser(id, body);
                    this.user.role = body.role;

                    this.$store.dispatch(
                        'toast/success',
                        `The user ${username} is now a ${nextRole}`,
                    );
                }
            } catch (e) {
                this.$store.dispatch('toast/error', e);
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
