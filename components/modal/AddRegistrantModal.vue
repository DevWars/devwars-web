<template>
    <form v-async-submit="[save]">
        <div class="form-group">
            <div class="search-input">
                <Input autocomplete="off" />
                <ul class="search-input__list" >
                    <li class="search-input__item">
                        <div class="search-input__img" style="background-image: url('')"></div>
                        <span class="search-input__txt">Display name</span>
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

    @Component({
        components: { Input }
    })

    export default class AddRegistrantModal extends Vue {


    }
</script>
