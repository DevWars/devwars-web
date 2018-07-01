<template>
    <form v-async-submit="[submit]">
        <div class="form-group">
            <select v-model="name" class="form-control">
                <option value="">Select Game Type</option>
                <option>Classic</option>
                <option>Zen Garden</option>
            </select>
        </div>
        <div class="form-group">
            <Input v-model="date" placeholder="DD/MM/YYYY" />
            <label>Date</label>
        </div>
        <div class="form-group">
            <Input v-model="time" placeholder="HH:MM" />
            <label>Time</label>
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

    import {Prop} from 'vue-property-decorator';
    import Input from '../form/Input';

    @Component({
        components: { Input }
    })

    export default class CreateGameModal extends Vue {
        name = '';
        date = '';
        time = '';

        @Prop() resolve;

        async submit() {
            let timestamp = moment.utc(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm').unix() * 1000;

            await this.$store.dispatch('game/create', {name: this.name, timestamp});

            this.close(true);
        }
    }
</script>
