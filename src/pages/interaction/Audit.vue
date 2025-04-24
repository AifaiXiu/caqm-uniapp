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
          <nut-button type="info" @click="doAuditAction(item.checklists)">审计</nut-button>
          <nut-cell title="部门" :desc="item.dept.value"></nut-cell>
          <nut-cell title="流程" :desc="item.process.value"></nut-cell>
          <nut-cell title="主审人" :desc="item.mainAuditor.username"></nut-cell>
          <nut-cell title="状态" :desc="caculateStatus(item.status)"></nut-cell>
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
  const caculateStatus = (status) => {
    if (status === 0) {
      return '计划'
    } else if (status === 1) {
      return '执行'
    } else if (status === 2) {
      return '取消'
    } else if (status === 3) {
      return '待关闭'
    } else {
      return '已关闭'
    }
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
  const doAuditAction = (checklists) => {
    const itemIds = Array.from(
      new Set(
        checklists
          .flatMap((item) => item.checklistItemsIds.split(',')) // 将每个字符串按逗号分割为数组
          .map((id) => id.trim()) // 去除可能的空格
      )
    ).join(',')
    uni.navigateTo({ url: './DoAuditList?itemIds=' + itemIds })
    console.log(itemIds, 'itemIds')
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
