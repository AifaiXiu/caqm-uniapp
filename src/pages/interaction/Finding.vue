<template>
  <view class="h-full">
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      style="height: 100%"
    >
      <nut-button type="success" @click="navTo">新增</nut-button>

      <view v-for="item in allFindings" :key="item.id">
        <nut-cell-group :title="item.audit.name">
          <nut-button type="danger" @click="deleteAction(item.id)">删除</nut-button>
          <nut-button type="info" @click="editAction(item.id)">编辑</nut-button>
          <nut-cell title="流程" :desc="item.process.value"></nut-cell>
          <nut-cell title="部门" :desc="item.dept.value"></nut-cell>
          <nut-cell title="机场" :desc="item.airport.value"></nut-cell>
          <nut-cell title="目标关闭时期" :desc="item.targetCloseTime"></nut-cell>
          <nut-cell title="详细内容" :desc="item.evaluateResult"></nut-cell>
          <nut-cell title="不符合项类型" :desc="item.findingType.value"></nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { getFindings, deleteFinding } from '../../api/modules/finding'

  const allFindings = ref([])
  const isRefreshing = ref(false)

  // 初始化加载
  onMounted(() => {
    loadData()
  })

  // 下拉刷新
  const onRefresh = () => {
    isRefreshing.value = true
    loadData().finally(() => {
      setTimeout(() => (isRefreshing.value = false), 1000)
    })
  }

  // 加载数据
  const loadData = () => {
    return getFindings().then((res) => {
      allFindings.value = res.data.data.content
    })
  }

  // 删除操作
  const deleteAction = (id) => {
    deleteFinding(id).then(() => {
      uni.showToast({ title: '删除成功' })
      loadData()
    })
  }
  const editAction = (id) => {
    uni.navigateTo({ url: './FindingEdit?id=' + id })
  }
  // 跳转到新增页面
  const navTo = () => {
    uni.navigateTo({ url: './FindingAdd' })
  }
</script>

<style>
  scroll-view {
    box-sizing: border-box;
    padding: 16rpx;
  }
</style>
