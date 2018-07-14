<template>
    <form v-async-submit="[save]">
        <div class="form-group">
            <div class="search-input">
                <Input autocomplete="off" />
                <ul class="search-input__list" >
                    <li class="search-input__item user-group">
                        <Avatar class="sm" />
                        <div class="user-group__name">Username</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal__actions">
            <button class="btn btn-outline-gray">Cancel</button>
            <button class="btn btn-primary">Add</button>
        </div>
    </form>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';
    import Http from "../../services/Http";
    import Input from "../form/Input";
    import Avatar from "../user/Avatar";

    @Component({
        components: { Input, Avatar }
    })

    export default class AddRegistrantModal extends Vue {


    }
</script>
