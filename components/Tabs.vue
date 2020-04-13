<template>
    <div>
        <div class="tabs">
            <div
                v-for="tab in tabs"
                :key="tab.key"
                :class="{ tab: true, active: tab.isActive }"
            >
                <a class="link" :href="tab.href" @click="selectTab(tab)">{{
                    tab.name
                }}</a>
            </div>
        </div>

        <div class="tabs-details">
            <slot class="tab"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return { tabs: [] };
    },

    created() {
        this.tabs = this.$children;
    },

    mounted() {
        const hash = this.$route.hash;
        let defaultTab = null;

        this.tabs.forEach((tab) => {
            if (hash.substring(1) === tab.name.toLowerCase()) {
                tab.selected = true;
                this.selectTab(tab);
            }

            if (tab.default) defaultTab = tab;
            if (tab.selected) defaultTab = null;
        });

        if (defaultTab) this.selectTab(defaultTab);
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach((tab) => {
                tab.isActive = tab.name === selectedTab.name;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

$tab-padding: 10px 20px;

.tabs {
    display: flex;
    align-items: flex-end;

    .tab {
        padding: $tab-padding;
        border-width: $border-size-sm;
        background-color: darken($bg-color-2, 7%);
        font-size: $font-size-base;
        color: $text-color-muted;
        text-align: center;

        &:not(:first-child) {
            margin-left: 1px;
        }

        &.active {
            border-top-style: solid;
            border-color: $brand-secondary;
            background-color: $bg-color-2;
            color: #fff;
        }

        /deep/ a {
            display: block;
            color: inherit;
        }

        &.link {
            padding: 0;

            /deep/ a {
                padding: $tab-padding;
            }
        }
    }

    &.fluid {
        width: 100%;

        .tab {
            flex: 1;
        }
    }

    &.invert {
        .tab {
            border-top: none;
            border-bottom-style: solid;
        }
    }
}
</style>
