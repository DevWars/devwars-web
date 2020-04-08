<template>
    <div>
        <PageBanner title="Shop">
            <Devcoins :amount="7400" class="lg" />

            <div slot="nav">
                <div class="shop-nav">
                    <div class="shop-nav__link active">All</div>
                    <div class="shop-nav__link">Consumable</div>
                    <div class="shop-nav__link">Wearable</div>
                    <div class="shop-nav__link">Cosmetic</div>
                </div>
            </div>

            <div slot="sub-actions">
                <Select class="clear">
                    <option>Sort by</option>
                    <option>Latest</option>
                    <option>Price</option>
                </Select>
            </div>
        </PageBanner>

        <div class="footer-offset">
            <Container>
                <Row>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <Icon name="question-circle" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Quiz Call</h2>
                                <p class="shop-card__desc">
                                    Activate a quiz round during a live game show.
                                </p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card wearable">
                            <div class="shop-card__cover">
                                <Icon name="chess-queen" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Wearable</span>
                                <h2 class="shop-card__name">Crown of Prosperity</h2>
                                <p class="shop-card__desc">+5 DevBit Earnings</p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card cosmetic">
                            <div class="shop-card__cover">
                                <Icon name="camera-retro" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Cosmetic</span>
                                <h2 class="shop-card__name">Upload Avatar</h2>
                                <p class="shop-card__desc">Allows upload of a custom avatar.</p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <Icon name="shield-alt" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Safety Shield</h2>
                                <p class="shop-card__desc">
                                    Protects 5%-30% of your gambled assets on your next bet.
                                </p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <Icon name="tag" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Name Tag</h2>
                                <p class="shop-card__desc">Allows for 1 username change.</p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <Icon name="music" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Jukebox</h2>
                                <p class="shop-card__desc">
                                    Place a song request to play on the live stream.
                                </p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                    <Column :lg="3" :md="4" :sm="6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <Icon name="ticket-alt" />
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Lottery Ticket</h2>
                                <p class="shop-card__desc">
                                    Enter for a chance to win the weekly DevWars Jackpot.
                                </p>
                            </div>
                            <Devcoins :amount="232" class="sm" />
                        </div>
                    </Column>
                </Row>
            </Container>
        </div>
    </div>
</template>

<script>
import PageBanner from '@/components/layout/PageBanner';
import Select from '@/components/form/Select';
import Devcoins from '@/components/Devcoins';

export default {
    name: 'Shop',

    components: { PageBanner, Select, Devcoins },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.shop-card {
    margin-bottom: 30px;
    background-color: $bg-color-3;
    cursor: pointer;

    &__cover {
        @include aspect-ratio(16, 9);
        background-image: url('/assets/img/starburst.png');
        background-size: cover;
        background-position: center;
        background-color: $bg-color-2;
    }

    .Icon {
        @extend %absolute-center;
        width: 60%;
        max-width: 180px;
        margin: 0 auto;
        text-align: center;
        font-size: $display3-size;
        color: #fff;
    }

    &__main {
        min-height: 120px;
        padding: $xs-space $grid-gutter-width 0;
    }

    &__type {
        font-weight: $font-weight-bold;
        font-size: $font-size-xs;
        text-transform: uppercase;
    }

    &__name {
        margin-bottom: $xxs-space;
        font-weight: $font-weight-bold;
        font-size: $font-size-lg;
        color: #fff;
    }

    &__desc {
        line-height: 1.3;
        font-size: $font-size-sm;
        color: $text-color-secondary;
    }

    .Devcoins {
        justify-content: center;
        border-top: 1px solid $divider-color;
        padding: $xs-space 0;
        margin-top: $xs-space;
        position: relative;

        &:after {
            @extend %absolute-overlay;
            content: 'Buy Now';
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $font-size-lg;
            font-weight: $font-weight-bold;
            background-color: $bg-color-2;
            opacity: 0;
        }
    }

    &:hover .Devcoins:after {
        opacity: 1;
    }

    @mixin shop-variant($type, $color) {
        &.#{$type} &__cover {
            background-color: darken($color, 25%);
        }
        &.#{$type} &__type {
            color: $color;
        }
    }

    @include shop-variant(consumable, #ff4282);
    @include shop-variant(wearable, #febc11);
    @include shop-variant(cosmetic, #44ff86);
    @include shop-variant(craftable, #11eafe);
}

.shop-nav {
    @extend %flex-justify;

    &__link {
        text-transform: uppercase;
        font-weight: $font-weight-bold;
        font-size: $font-size-lg;
        color: $text-color-secondary;
        position: relative;

        &.active,
        &.active:hover {
            color: $brand-secondary;
            &:before {
                content: '';
                border-bottom: $border-size-lg solid $brand-secondary;
                position: absolute;
                bottom: -$xxs-space;
                width: 100%;
            }
        }

        &:not(:last-of-type) {
            margin-right: 30px;
        }

        &:hover {
            color: $text-color-primary;
        }
    }
}
</style>
