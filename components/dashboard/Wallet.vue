<template>
    <div class="dashboard-card devbit-wallet">
        <div class="devbit-wallet__inner">
            <div class="devbit-wallet__main">
                <div class="devbits devbits-lg">
                    <img class="devbits__icon" src="~/assets/img/devbit.png" alt="DevBits">
                    <div class="devbits__amount">{{ user.ranking.bits | number }}</div>
                </div>
            </div>
            <div class="devbit-wallet__actions">
                <a href="#" class="btn btn-outline-white btn-sm">Shop</a>
            </div>
        </div>

        <div class="inventory">
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
            <div class="inventory__slot"></div>
        </div>
        <div class="inventory__footer">
            <a href="#">Open Inventory</a>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        props: ['user']
    })
    export default class Wallet extends Vue {
    }
</script>
