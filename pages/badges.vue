<template>
    <div>
        <!--
        <PageBanner title="Badges"/>
        <div class="footer-offset">
            <div class="container">
                <div class="row">
                    <div v-for="badge in badges" :key="badge.id" class="col-lg-3 col-md-4 col-sm-6">
                        <div
                            class="badge-card bronze"
                            :class="{complete: completed(badge)}"
                            :title="badge.description"
                        >
                            <div class="badge-card__meta">
                                <span class="badge-card__global">
                                    <i class="fa fa-group"></i>
                                </span>
                            </div>
                            <img class="badge-card__img" :src="image(badge)">
                            <h2 class="badge-card__name">{{ badge.name }}</h2>
                            <div class="progress">
                                <div class="progress__bar" :style="[style(badge)]"></div>
                            </div>
                            <div class="devcoins">
                                <Devcoin/>
                                <div class="devcoins__amount color-white">{{ badge.coins | number }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        -->
    </div>
</template>


<script>
// import { mapGetters } from 'vuex';
// import Http from '../services/Http';
// import PageBanner from '~/components/layout/PageBanner';
// import Devcoin from '~/components/Devcoin';

export default {
    // name: 'Badges',
    // components: {
    //     PageBanner,
    //     Devcoin,
    // },
    // computed: {
    //     ...mapGetters({
    //         badges: 'badges/badges',
    //         userCount: 'user/userCount',
    //     }),
    // },
    // async asyncData({ store }) {
    //     const mine = await Http.for(`user/${store.state.user.user.id}`).get(
    //         'badges'
    //     );
    //     return {
    //         mine,
    //     };
    // },
    // methods: {
    //     completed(badge) {
    //         return this.mine.some((it) => it.id === badge.id);
    //     },
    //     style(badge) {
    //         return {
    //             width: `${(badge.userCount / this.userCount) * 100}%`,
    //         };
    //     },
    //     image(badge) {
    //         /* eslint-disable */
    //         const url = `~/assets/img/badges/${badge.name
    //             .split(' ')
    //             .join('-')
    //             .toLowerCase()}.png`;
    //         try {
    //             return require(url);
    //         } catch (e) {
    //             console.error(`Couldn't load image for badge ${badge.name}`);
    //         }
    //     },
    // },
};
</script>
