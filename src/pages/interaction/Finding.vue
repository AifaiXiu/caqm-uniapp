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
          <nut-button type="info" @click="editAction(item.id)">修改</nut-button>
          <nut-button type="info" @click="evaluateAction(item.id)">评估</nut-button>
          <nut-button type="info" @click="correctAction(item.id)">纠正</nut-button>
          <nut-cell title="流程" :desc="item.process==null?'暂未选择':item.process.value"></nut-cell>
          <nut-cell title="部门" :desc="item.dept==null?'暂未选择':item.dept.value"></nut-cell>
          <nut-cell title="机场" :desc="item.airport==null?'暂未选择':item.airport.value"></nut-cell>
          <nut-cell title="目标关闭时期" :desc="item.targetCloseTime==null?'暂未选择':item.targetCloseTime"></nut-cell>
          <nut-cell title="详细内容" :desc="item.evaluateResult==null?'暂未选择':item.evaluateResult"></nut-cell>
          <nut-cell title="不符合项类型" :desc="item.findingType==null?'暂未选择':item.findingType.value"></nut-cell>
          <nut-cell title="审计" :desc="item.audit==null?'暂未选择':item.audit.name"></nut-cell>
          <nut-cell title="关闭人" :desc="item.closeUser==null ? '暂未选择':item.closeUser.username"></nut-cell>
          <nut-cell title="根源分析" :desc="item.rootAnalyze==null ? '暂未选择':item.rootAnalyze.value"></nut-cell>
          <nut-cell title="相关部门" :desc="item.relatedDept==null ? '暂未选择':item.relatedDept.value"></nut-cell>
          <nut-cell title="评估责任人" :desc="item.evaluateDutyMan==null ? '暂未选择':item.evaluateDutyMan.username"></nut-cell>
          <nut-cell title="可能性" :desc="item.possibility==null ? '暂未选择':evaluate(item.possibility)"></nut-cell>
          <nut-cell title="严重性" :desc="item.possibility==null ? '暂未选择':evaluate(item.possibility)"></nut-cell>
          <nut-cell title="风险值" :desc="item.possibility==null ? '暂未选择':evaluate(item.possibility)"></nut-cell>
          <nut-cell title="事件描述" :desc="item.eventDescribe==null?'暂未填写':item.eventDescribe"></nut-cell>
          <nut-cell title="执行日期" :desc="item.executeDate==null?'暂未选择':item.eventDescribe"></nut-cell>
          <nut-cell title="是否安全事件" :desc="item.isSecure==null?'暂未选择':caculateSecure(item.isSecure)"></nut-cell>
          <nut-cell title="纠正措施责任人" :desc="item.measureDutyMan==null?'暂未选择':item.measureDutyMan.username"></nut-cell>
          <nut-cell title="纠正措施完成人" :desc="item.finisher==null?'暂未选择':item.finisher.username"></nut-cell>
          <nut-cell title="纠正措施目标日期" :desc="item.targetDate==null?'暂未选择':item.targetDate"></nut-cell>
          <nut-cell title="纠正措施完成日期" :desc="item.finishDate==null?'暂未选择':item.finishDate"></nut-cell>
          <nut-cell title="纠正措施详情" :desc="item.details==null?'暂未填写':item.details"></nut-cell>
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

  const evaluate=(value)=>{
    if(value==0){
      return "高"
    }else if(value==1){
      return "中"
    }else{
      return "低"
    }}
  const caculateSecure=(value)=>{
  return value==1?"是":"否"
 }

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
  const evaluateAction = (id) => {
    uni.navigateTo({ url: './FindingEvaluate?id=' + id })
  }
  const correctAction = (id) => {
    uni.navigateTo({ url: './FindingCorrect?id=' + id })
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
