<template>
    <DashboardCard class="Moderation scrollable" title="Moderation" icon="gavel">
        <div class="main">
            <Column :xs="2" class="no-gutter status">
                <Button
                    :disabled="!isAdmin"
                    class="danger"
                    @click="deleteUser"
                >
                    Delete
                </Button>
            </Column>
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
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Moderation {
    /deep/ {
        .main {
            @extend %flex-justify;
            width: 100%;
            padding: $grid-gutter-width;
            border-bottom: 1px solid $divider-color;
        }

        .actions {
            width: 100px;
        }
    }
}
</style>
