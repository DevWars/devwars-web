<template>
  <div class="Tabs">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab"
      :class="[
        { active: activeTab === tab.key },
        { link: tabIsLink(tab) },
        tab.data.class,
      ]"
      @click="setActiveTab(tab.key)"
    >
      <VNode :vnodes="tab" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',

  components: {
    VNode: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },

  data: () => ({
    activeTab: 0,
  }),

  computed: {
    tabs() {
      const defaultSlots = this.$slots.default
        .filter((slot) => {
          return slot.tag !== undefined;
        })
        .map((slot, index) => {
          if (!slot.key) {
            slot.key = index + 1;
          }

          return slot;
        });

      return defaultSlots || [];
    },
  },

  mounted() {
    this.setActiveTab();
  },

  methods: {
    setActiveTab(tabKey) {
      this.activeTab = tabKey || this.tabs[0].data.key || 1;
    },

    tabIsLink(tab) {
      const tag = tab.componentOptions.tag;
      return tag === 'a' || tag === 'nuxt-link';
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

$tab-padding: 10px 20px;

.Tabs {
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
