<template>
    <div class="dashboard-card devcoin-wallet">
        <div class="devcoin-wallet__inner">
            <div class="devcoin-wallet__main">
                <div class="devcoins devcoins-lg">
                    <Devcoin></Devcoin>
                    <div class="devcoins__amount">{{ user.ranking.bits | number }}</div>
                </div>
            </div>
            <div class="devcoins-wallet__actions">
                <button class="btn btn-outline-white btn-sm" disabled>Shop</button>
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

    import Devcoin from '~/components/Devcoin';

    @Component({
        components: {Devcoin},
        props: ['user']
    })
    export default class Wallet extends Vue {
    }
</script>
