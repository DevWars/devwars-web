<template>
    <div class="RegistrationButtons">
        <ButtonGroup>
            <Button
                v-if="!isApplied(game)"
                class="primary"
                @click="enter(game, user)"
            >
                Register
            </Button>
            <Button v-else class="outline danger" @click="cancel(game, user)">
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
        async enter(game, user) {
            if (!this.user) return this.$router.push('/login');
            await this.$open(GameRegistration, { game, user: user.user });
        },

        async cancel(game, user) {
            if (!this.user) this.$router.push('/login');

            await this.$open(GameResignModal, { game, user: user.user });
        },

        isApplied(game) {
            return this.applications.some((application) => {
                return application.gameId && application.gameId === game.id;
            });
        },
    },
};
</script>
