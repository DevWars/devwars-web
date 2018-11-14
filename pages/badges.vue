<template>
    <div>
        <PageBanner title="Badges" />

        <div class="footer-offset">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6" v-for="listing in badges" :key="listing.badge.id">
                        <div class="badge-card bronze" :class="{complete: completed(listing.badge)}"
                             :title="listing.badge.description">
                            <div class="badge-card__meta">
                                <span class="badge-card__global"><i
                                    class="fa fa-group"></i></span>
                                <!--<span class="badge-card__tier">Bronze</span>-->
                            </div>
                            <img class="badge-card__img" :src="image(listing.badge)">
                            <h2 class="badge-card__name">{{ listing.badge.name }}</h2>
                            <div class="progress">
                                <div class="progress__bar" :style="[style(listing)]"></div>
                            </div>
                            <div class="devcoins">
                                <Devcoin></Devcoin>
                                <div class="devcoins__amount color-white">{{ listing.badge.bits | number }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../services/Http";

    import PageBanner from '~/components/layout/PageBanner';
    import Devcoin from '~/components/Devcoin';

    @Component({
        components: { PageBanner, Devcoin }
    })
    export default class Badges extends Vue {
        @State(state => state.badges.badges) badges;
        @State(state => state.user.count) userCount;

        completed(badge) {
            return this.mine.some(it => it.id === badge.id);
        }

        style(listing) {
            return {
                width: (listing.user_count / this.userCount * 100) + '%'
            }
        }

        image(badge) {
            try {
                return require(`~/assets/img/badges/${badge.name.split(' ').join('-').toLowerCase()}.png`);
            } catch(e) {
                return require('~/assets/img/badges/mystery.png');
            }
        }

        async asyncData() {
            return {
                mine: await Http.for('badge').get('mine')
            }
        }
    }
</script>


