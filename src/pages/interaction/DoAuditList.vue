<template>
  <scroll-view
    :refresher-triggered="isRefreshing"
    refresher-enabled
    scroll-y
    style="height: 100%"
    @refresherrefresh="onRefresh"
  >
    <view class="interaction h-full">
      <view v-for="item in checklistItems" :key="item.id">
        <nut-cell-group :title="item.checklistItemName">
          <nut-button type="success" @click="action(item.id)">审计</nut-button>
          <nut-cell :desc="item.checklistItemContent" title="内容"></nut-cell>
          <nut-cell :desc="item.checklistItemRemark" title="备注"></nut-cell>
          <nut-cell :desc="caculateStatus(item.status)" title="状态"></nut-cell>
        </nut-cell-group>
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
  import { getChecklistItemsByIds } from '../../api/modules/checklistitem'
  import { ref } from 'vue'

  const isRefreshing = ref(false)
  const itemIds = ref('')
  const checklistItems = ref([])
  onLoad((options) => {
    console.log('路由参数ID:', options.itemIds)
    itemIds.value = options.itemIds
    loadData()
  })
  const loadData = () => {
    getChecklistItemsByIds(itemIds.value).then((res) => {
      console.log(res.data.data, '获取成功')
      checklistItems.value = res.data.data
    })
  }
  // 下拉刷新
  const onRefresh = () => {
    isRefreshing.value = true
    loadData()
    setTimeout(() => (isRefreshing.value = false), 1000)
  }
  const action = (id) => {
    uni.navigateTo({
      url: './DoAudit?id=' + id
    })
  }
  const caculateStatus = (status) => {
    if (status == '0') {
      return '符合'
    } else if (status == '1') {
      return '文文不符'
    } else if (status == '2') {
      return '文实不符'
    } else {
      return '不适用'
    }
  }
</script>
