<template>
  <div>
    <slot name="trigger"/>
    <div class="webui-popover-content">
      <slot name="menu"/>
    </div>
  </div>
</template>

<script>
  import Component from 'nuxt-class-component';
  import Vue from 'vue';

  import jQuery from 'jquery';

  @Component
  export default class Popup extends Vue {
    mounted() {
      let el = this.$slots.trigger[0].elm;
      let content = this.$slots.menu[0].elm;

      $(el).webuiPopover({
        type: 'html',
        content: jQuery(content),
        placement: 'bottom',
        animation: 'pop'
      });
    }
  }
</script>
