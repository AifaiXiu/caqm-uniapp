<template>
  <view class="h-full">
    <view class="userinfo">
      <nut-avatar size="large">
        <image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </nut-avatar>
      <view class="" style="align-items: flex-start; margin-top: 10px">
        <view>用户名：aihua</view>
        <view>角色：管理员</view>
      </view>
    </view>
    <nut-cell title="数据项配置" is-link @click="navigateTo('./DataItem')"></nut-cell>
    <nut-cell title="用户管理 " is-link @click="navigateTo('./User')"></nut-cell>
    <nut-cell title="文件管理 " is-link @click="navigateTo('./File')"></nut-cell>
  </view>
</template>

<script setup>
  const navigateTo = (url) => {
    uni.navigateTo({
      url: url
    })
  }
</script>

<style scoped lang="scss">
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }
</style>
