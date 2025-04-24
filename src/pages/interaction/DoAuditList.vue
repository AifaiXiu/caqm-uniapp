<template>
  <view class="interaction h-full">
    <view v-for="item in checklistItems" :key="item.id">
      <nut-cell-group :title="item.checklistItemName">
        <nut-button type="success" @click="action(item.id)">审计</nut-button>
        <nut-cell title="内容" :desc="item.checklistItemContent"></nut-cell>
        <nut-cell title="备注" :desc="item.checklistItemRemark"></nut-cell>
      </nut-cell-group>
    </view>
  </view>
</template>
<script setup>
  import { getChecklistItemsByIds } from '../../api/modules/checklistitem'
  const itemIds = ref('')
  const checklistItems = ref([])
  onLoad((options) => {
    console.log('路由参数ID:', options.itemIds)
    itemIds.value = options.itemIds
    getChecklistItemsByIds(itemIds.value).then((res) => {
      console.log(res.data.data, '获取成功')
      checklistItems.value = res.data.data
    })
  })
  const action = (id) => {
    uni.navigateTo({
      url: './DoAudit?id=' + id
    })
  }
</script>
