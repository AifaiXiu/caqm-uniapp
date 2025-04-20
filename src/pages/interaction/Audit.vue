<template>
  <view class="interaction h-full"> 这是审计页面 </view>
</template>
<script setup></script>
<style lang="scss" scoped>
  :deep(.nut-tabs) {
    height: 100%;
    .nut-tabs__content {
      height: calc(100% - var(--window-bottom));
    }
  }
</style>
