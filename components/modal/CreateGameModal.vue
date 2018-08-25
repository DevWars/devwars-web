<template>
    <form v-async-submit="[submit]">
        <div class="form-group">
            <select v-model="name" class="form-control">
                <option value="">Select Game Type</option>
                <option>Classic</option>
                <option>Zen Garden</option>
                <option>Blitz</option>
            </select>
        </div>
        <div class="form-group">
            <DatePicker v-model="date" />

            <label>When is the game?</label>
        </div>
        <div class="align-right">
            <button class="btn btn-outline-gray">Cancel</button>
            <button class="btn btn-primary">Save</button>
        </div>
    </form>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import moment from 'moment';

    import { Prop } from 'vue-property-decorator';
    import Input from '../form/Input';
    import DatePicker from '../form/DatePicker';

    @Component({
        components: { DatePicker, Input },
    })

    export default class CreateGameModal extends Vue {
        name = '';
        date = '';

        @Prop() resolve;

        async submit() {
            let timestamp = moment.utc(this.date, 'MM/DD/YYYY HH:mm').unix() * 1000;

            await this.$store.dispatch('game/create', { name: this.name, timestamp });

            this.close(true);
        }
    }
</script>
