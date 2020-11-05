<template>
    <div
        class="BadgeCard"
        :class="{complete: badgeIsEarned}"
        :title="badge.description"
    >
        <div class="badgeInner">
            <img :src="badgeImageUrl">
            <h2>{{ badge.name }}</h2>

            <Devcoins :amount="badge.awardingCoins" />
            <span v-if="badgeIsEarned">Earned on {{ badge.createdAt | moment('M/DD/YYYY') }}</span>
            <span v-else>Not earned</span>
        </div>
    </div>
</template>

<script>
import Devcoins from '@/components/Devcoins';

export default {
    name: 'BadgeCard',

    components: { Devcoins },

    props: {
        badge: { type: Object, required: true },
        userBadges: { type: Array, required: true },
    },

    computed: {
        badgeImageUrl() {
            const filename = this.badge.name.toLowerCase().replace(/ /g, '-');
            return require(`~/assets/img/badges/${filename}.png`);
        },

        badgeIsEarned() {
            return this.userBadges.find((b) => b.id === this.badge.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.BadgeCard {
    border-top: $border-size solid $divider-color;
    padding: $grid-gutter-width;
    margin-bottom: 30px;
    background-color: lighten($bg-color-4, 2%);
    text-align: center;

    .badgeInner {
        opacity: 0.4;
    }

    img {
        display: block;
        height: 100%;
        width: auto;
        max-height: 140px;
        margin: 0 auto;
    }

    h2 {
        padding: $s-space 0 $s-space;
        font-size: $font-size-lg;
    }

    &.complete {
        border-color: $brand-secondary;
        background-color: $bg-color-2;

        .badgeInner {
            opacity: 1;
        }
    }

    .Devcoins {
        justify-content: center;
    }
}
</style>
