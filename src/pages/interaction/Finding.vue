<template>
  <view class="h-full">
    <nut-button type="info" @click="navTo">新增</nut-button>
  </view>
</template>

<script lang="ts" setup>
  const navTo = () => {
    uni.navigateTo({
      url: './FindingAdd'
    })
  }
</script>
