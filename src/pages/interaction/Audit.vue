<template>
  <view class="interaction h-full">
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      style="height: 100%"
    >
      <nut-button type="success" @click="navTo">新增</nut-button>
      <view v-for="item in audits" :key="item.id">
        <nut-cell-group :title="item.name">
          <nut-button type="danger" @click="deleteAction(item.id)">删除</nut-button>
          <nut-button type="info" @click="editAction(item.id)">编辑</nut-button>
          <nut-cell title="部门" :desc="item.dept.value"></nut-cell>
          <nut-cell title="流程" :desc="item.process.value"></nut-cell>
          <nut-cell title="主审人" :desc="item.mainAuditor.username"></nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { getAudits, deleteAudit } from '../../api/modules/audit'

  const audits = ref([])
  const isRefreshing = ref(false)

  const navTo = () => {
    uni.navigateTo({
      url: './AuditAdd'
    })
  }

  // 初始化加载
  onMounted(() => {
    loadAudits()
  })

  // 下拉刷新
  const onRefresh = () => {
    isRefreshing.value = true
    loadAudits().finally(() => {
      setTimeout(() => (isRefreshing.value = false), 1000)
    })
  }

  // 加载数据
  const loadAudits = async () => {
    const res = await getAudits()
    audits.value = res.data.data.content
  }

  const deleteAction = (id) => {
    deleteAudit(id).then((res) => {
      console.log(res, '删除成功')
      loadAudits()
    })
  }

  const editAction = (id) => {
    uni.navigateTo({ url: './AuditEdit?id=' + id })
  }
</script>

<style>
  .interaction {
    box-sizing: border-box;
    padding: 16rpx;
  }
  scroll-view {
    height: 100%;
  }
</style>
