<template>
  <view class="h-full">
    <view class="userinfo">
      <nut-avatar size="large">
        <image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </nut-avatar>
      <view class="" style="align-items: flex-start; margin-top: 10px">
        <view>{{ useUserStore.username }}</view>
      </view>
    </view>
    <nut-cell
      v-if="useUserStore.isAdmin"
      title="数据项配置"
      is-link
      @click="navigateTo('./DataItem')"
    ></nut-cell>
    <nut-cell
      v-if="useUserStore.isAdmin"
      title="用户管理 "
      is-link
      @click="navigateTo('./User')"
    ></nut-cell>
    <nut-cell
      v-if="useUserStore.isAdmin"
      title="文件管理 "
      is-link
      @click="navigateTo('./File')"
    ></nut-cell>
    <nut-cell title="退出登录 " is-link @click="logout"></nut-cell>
  </view>
</template>

<script setup>
  import { useUserCountStore } from '../../store/auth'
  const useUserStore = useUserCountStore()
  const navigateTo = (url) => {
    uni.navigateTo({
      url: url
    })
  }
  const logout = () => {
    uni.redirectTo({
      url: './Login'
    })
    useUserStore.ChangeAdm(false)
    useUserStore.ChangeUser('')
  }
  onMounted(() => {
    console.log(useUserStore.isAdmin, '查看状态')
    console.log(useUserStore.username, '查看用户名')
  })
</script>

<style scoped lang="scss">
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }
</style>
