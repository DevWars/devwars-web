<template>
    <Input :value="found.count" @input="change"/>
</template>


<script>
import Input from '../form/Input';

export default {
    name: 'VoteBoxInput',
    components: { Input },
    props: {
        'vote': {
            type: String,
            required: true,
        }, 
        'team': {
            type: Object,
            required: true,
        },
    },
    computed: {
        found() {
            const notFound = { count: 0 };

            if (!this.team || !this.team.votes) return notFound;

            const vote = Object.values(this.team.votes).find(
                (it) => it.name === this.vote
            );

            return vote || notFound;
        },
    },
    methods: {
        change(count) {
            this.$emit('change', { count, name: this.vote });
        },
    },
};
</script>
