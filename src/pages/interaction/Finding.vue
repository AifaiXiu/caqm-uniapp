<template>
  <view class="h-full">
    <nut-button type="primary" @click="navTo">新增</nut-button>
    <view v-for="item in allFindings" :key="item.id">
      <nut-cell-group :title="item.audit.name">
        <nut-button type="info" @click="deleteAction(item.id)">删除</nut-button>
        <nut-cell title="流程" :desc="item.process.value"></nut-cell>
        <nut-cell title="部门" :desc="item.dept.value"></nut-cell>
        <nut-cell title="机场" :desc="item.airport.value"></nut-cell>
        <nut-cell title="目标关闭时期" :desc="item.targetCloseTime"></nut-cell>
        <nut-cell title="详细内容" :desc="item.evaluateResult"></nut-cell>
        <nut-cell title="不符合项类型" :desc="item.findingType.value"></nut-cell>
      </nut-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { getDataItems } from '../../api/modules/dataitem'
  import { getAudits } from '../../api/modules/audit'
  import { deleteFinding, getFindings } from '../../api/modules/finding'
  const allFindings = ref([])
  onMounted(() => {
    loadData()
  })
  const navTo = () => {
    uni.navigateTo({
      url: './FindingAdd'
    })
  }
  const loadData = () => {
    getFindings().then((res) => {
      allFindings.value = res.data.data.content
    })
  }
  const deleteAction = (id) => {
    deleteFinding(id).then((res) => {
      console.log('删除成功')
      loadData()
    })
  }
</script>
