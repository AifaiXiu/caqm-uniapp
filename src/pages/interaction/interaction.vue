<template>
  <view class="interaction h-full">
    <nut-tabs v-model="state.tab11value" type="smile" swipeable>
      <nut-tab-pane class="important-p-0 important-px-2" title="加载刷新"></nut-tab-pane>
      <nut-tab-pane title="Tab 3"> 这是tab页面 </nut-tab-pane>
    </nut-tabs>
  </view>
</template>
<script setup>
  import MescrollBox from './components/mescrollBox.vue'
  import Audit from './Audit.vue'
  const state = reactive({
    tab11value: '0'
  })
</script>
<style lang="scss" scoped>
  :deep(.nut-tabs) {
    height: 100%;
    .nut-tabs__content {
      height: calc(100% - var(--window-bottom));
    }
  }
</style>
