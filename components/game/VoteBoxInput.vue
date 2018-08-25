<template>
    <Input :value="found.count" @input="change" />
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';
    import Input from '../form/Input';

    @Component({
        components: { Input }
    })
    export default class extends Vue {
        // The vote name
        @Prop() vote;

        // The team we're editing the vote for
        @Prop() team;

        change(count) {
            this.$emit('change', { count, name: this.vote });
        }

        get found() {
            const notFound = { count: 0 };

            if (!this.team || !this.team.votes) return notFound;

            const vote = Object.values(this.team.votes).find(it => it.name === this.vote);

            return vote || notFound;
        }
    }
</script>
