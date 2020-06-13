<template>
    <div class="RegistrationButtons">
        <ButtonGroup>
            <Button
                v-if="!isApplied(game)"
                class="primary"
                @click="enter(game)"
            >
                Register
            </Button>
            <Button v-else class="outline danger" @click="cancel(game)">
                Resign
            </Button>
        </ButtonGroup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GameResignModal from '@/components/modal/GameResignModal';
import GameRegistration from '@/components/modal/GameRegistration';

export default {
    name: 'RegistrationButtons',

    props: {
        game: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState({
            user: 'user',
        }),

        applications() {
            return this.$store.state.game.applications;
        },
    },

    methods: {
        async enter(schedule) {
            if (!this.user) {
                this.$router.push('/login');
                return;
            }

            await this.$open(GameRegistration, { schedule });
        },

        async cancel(schedule) {
            if (!this.user) {
                this.$router.push('/login');
                return;
            }

            await this.$open(GameResignModal, { schedule });
        },

        isApplied(game) {
            return this.applications.some((application) => {
                return application.gameId && application.gameId === game.id;
            });
        },
    },
};
</script>
