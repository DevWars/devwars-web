<template>
    <div>
        <PageBanner title="Badges" />

        <div class="footer-offset">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6" v-for="badge in badges" :key="badge.id">
                        <div class="badge-card bronze" :class="{complete: completed(badge)}"
                             :title="badge.description">
                            <div class="badge-card__meta">
                                <span class="badge-card__global"><i
                                    class="fa fa-group"></i></span>
                                <!--<span class="badge-card__tier">Bronze</span>-->
                            </div>
                            <img class="badge-card__img" :src="image(badge)">
                            <h2 class="badge-card__name">{{ badge.name }}</h2>
                            <div class="progress">
                                <div class="progress__bar" :style="[style(badge)]"></div>
                            </div>
                            <div class="devcoins">
                                <Devcoin></Devcoin>
                                <div class="devcoins__amount color-white">{{ badge.coins | number }}</div>
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

        style(badge) {
            return {
                width: (badge.userCount / this.userCount * 100) + '%'
            }
        }

        image(badge) {
            try {
                return require(`~/assets/img/badges/${badge.name.split(' ').join('-').toLowerCase()}.png`);
            } catch(e) {
                return require('~/assets/img/badges/mystery.png');
            }
        }

        async asyncData({store}) {
            return {
                mine: await Http.for(`user/${store.state.user.user.id}`).get('badges')
            }
        }
    }
</script>


