<template>
  <div>
    <!--
        <PageBanner title="Badges"/>
        <div class="footer-offset">
            <Container>
                <Row
                    <Column v-for="badge in badges" :key="badge.id" :lg="3" :md="4" :sm="6">
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
                            <Devcoins :amount="badge.coins"/>
                        </div>
                    </Column>
                </Row>
            </Container>
        </div>
        -->
    <h1>badges</h1>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import Http from '../services/Http';
// import PageBanner from '@/components/layout/PageBanner';
// import Devcoins from '@/components/Devcoins';
import { names } from '../utils/auth';

export default {
  // name: 'Badges',
  // components: {
  //     PageBanner,
  //     Devcoins,
  // },
  meta: {
    auth: names.USER,
  },
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
  //         const url = `@/assets/img/badges/${badge.name
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

<style lang="scss" scoped>
@import 'utils.scss';

.badge-card {
  border-top: $border-size solid $divider-color;
  padding: $xs-space $grid-gutter-width $grid-gutter-width;
  margin-bottom: 30px;
  background-color: $bg-color-3;
  text-align: center;
  opacity: 0.5;

  &__img {
    display: block;
    height: 100%;
    width: auto;
    max-height: 140px;
    margin: 0 auto;
  }

  &__name {
    padding: $s-space 0 $s-space;
    font-size: $h4-font-size;
  }

  &__meta {
    @extend %flex-justify;
    margin-bottom: $xs-space;
  }

  &__global {
    color: $text-color-muted;
    .fa {
      padding-right: 5px;
    }
  }

  &__tier {
    border: 1px solid;
    padding: 0 $xxs-space;
    font-size: $font-size-xs;
  }

  .progress {
    max-width: 80%;
    margin: 0 auto $xs-space;

    &__bar {
      background-color: $brand-secondary;
    }
  }

  &.complete {
    background-color: $bg-color-2;
    opacity: 1;
  }

  @mixin badge-variant($rank, $color) {
    &.#{$rank} {
      border-color: $color;
    }
    &.#{$rank} &__tier {
      color: $color;
    }
    //&.#{$rank} .progress__bar { background-color: $color; }
  }

  @include badge-variant(bronze, $bronze-color);
  @include badge-variant(silver, $silver-color);
  @include badge-variant(gold, $gold-color);
  @include badge-variant(diamond, $diamond-color);
}
</style>
