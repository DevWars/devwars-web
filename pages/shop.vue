<template>
    <div>
        <PageBanner title="Shop">
            <div class="devcoins devcoins-xl">
                <Devcoin/>
                <div class="devcoins__amount">232</div>
            </div>

            <div slot="nav">
                <div class="shop-nav">
                    <button class="shop-nav__link active">All</button>
                    <button class="shop-nav__link">Consumable</button>
                    <button class="shop-nav__link">Wearable</button>
                    <button class="shop-nav__link">Cosmetic</button>
                </div>
            </div>

            <div slot="sub-actions">
                <select class="select--clear">
                    <option selected="selected">Sort by</option>
                    <option>Latest</option>
                    <option>Price</option>
                </select>
            </div>
        </PageBanner>

        <div class="footer-offset">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <i class="fa fa-question-circle shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Quiz Call</h2>
                                <p
                                    class="shop-card__desc"
                                >Activate a quiz round during a live game show.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card wearable">
                            <div class="shop-card__cover">
                                <i class="fa fa-chess-queen shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Wearable</span>
                                <h2 class="shop-card__name">Crown of Prosperity</h2>
                                <p class="shop-card__desc">+5 DevBit Earnings</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card cosmetic">
                            <div class="shop-card__cover">
                                <i class="fa fa-camera-retro shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Cosmetic</span>
                                <h2 class="shop-card__name">Upload Avatar</h2>
                                <p class="shop-card__desc">Allows upload of a custom avatar.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <i class="fa fa-shield-alt shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Safety Shield</h2>
                                <p
                                    class="shop-card__desc"
                                >Protects 5%-30% of your gambled assets on your next bet.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <i class="fa fa-tag shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Name Tag</h2>
                                <p class="shop-card__desc">Allows for 1 username change.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <i class="fa fa-music shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Jukebox</h2>
                                <p
                                    class="shop-card__desc"
                                >Place a song request to play on the live stream.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="shop-card consumable">
                            <div class="shop-card__cover">
                                <i class="fa fa-ticket-alt shop-card__img"></i>
                            </div>
                            <div class="shop-card__main">
                                <span class="shop-card__type">Consumable</span>
                                <h2 class="shop-card__name">Lottery Ticket</h2>
                                <p
                                    class="shop-card__desc"
                                >Enter for a chance to win the weekly DevWars Jackpot.</p>
                            </div>
                            <div class="devcoins devcoins-lg">
                                <Devcoin/>
                                <div class="devcoins__amount">232</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import PageBanner from '~/components/layout/PageBanner';
import Devcoin from '~/components/Devcoin';

export default {
    name: 'Shop',
    components: { PageBanner, Devcoin },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.shop-card {
    margin-bottom: $grid-gutter-width;
    background-color: $bg-color-3;
    cursor: pointer;

    &__cover {
        @include aspect-ratio(16, 9);
        background-image: url('/assets/img/starburst.png');
        background-size: cover;
        background-position: center;
        background-color: $bg-color-2;
    }

    &__img {
        @extend %absolute-center;
        width: 60%;
        max-width: 180px;
        margin: 0 auto;
        text-align: center;

        &.fa:before {
            font-size: $display3-size;
            color: #fff;
        }
    }

    &__main {
        min-height: 120px;
        padding: $xs-space $grid-gutter-part 0;
    }

    &__type {
        font-weight: $font-weight-bold;
        font-size: $font-size-xs;
        text-transform: uppercase;
    }

    &__name {
        margin-bottom: $xxs-space;
        font-weight: $font-weight-bold;
        font-size: $h4-font-size;
        color: #fff;
    }

    &__desc {
        line-height: 1.3;
        font-size: $font-size-sm;
        color: $text-color-secondary;
    }

    .devcoins {
        border-top: 1px solid $divider-color;
        padding: $xs-space 0;
        margin-top: $xs-space;
        text-align: center;
        position: relative;

        &:after {
            @extend %absolute-overlay;
            content: 'Buy Now';
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $h4-font-size;
            font-weight: $font-weight-bold;
            background-color: $bg-color-2;
            opacity: 0;
        }
    }

    &:hover .devcoins:after {
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
        font-size: $h4-font-size;
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
            margin-right: $grid-gutter-width;
        }

        &:hover {
            color: $text-color-primary;
        }
    }
}
</style>
