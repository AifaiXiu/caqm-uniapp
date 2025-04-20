<template>
  <view class="interaction h-full">
    <nut-button type="info" @click="navTo">新增</nut-button>
  </view>
</template>
<script setup>
  const navTo = () => {
    uni.navigateTo({
      url: './AuditAdd'
    })
  }
</script>
