<template>
    <Applications :games="[game]">
        <div slot-scope="{isApplied, enter, cancel}">
        <a v-show="!isApplied(game)" @click="enter(game)" class="btn btn-primary">
            Register for Entry
        </a>
        <a v-show="isApplied(game)" @click="cancel(game)"
           class="btn btn-outline-danger">Resign</a>
            </div>
    </Applications>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    import Applications from '~/components/game/Applications';

    @Component({
        components: {Applications}
    })
    export default class RegistrationButton extends Vue {
        @Prop() game;
    }
</script>
