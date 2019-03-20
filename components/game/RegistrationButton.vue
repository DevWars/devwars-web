<template>
    <Applications :games="[game]">
        <div slot-scope="{isApplied, enter, cancel}">
            <a
                v-show="!isApplied(game)"
                class="btn btn-primary"
                @click="enter(game)"
            >Register for Entry</a>
            <a v-show="isApplied(game)" class="btn btn-outline-danger" @click="cancel(game)">Resign</a>
        </div>
    </Applications>
</template>


<script>
import Applications from '~/components/game/Applications';

export default {
    name: 'RegistrationButton',
    components: { Applications },
    props: {
        'game': {
            type: Object,
            required: true,
        },
    },
};
</script>
