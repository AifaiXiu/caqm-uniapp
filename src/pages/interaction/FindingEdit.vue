<template>
  <view class="h-full">
    <nut-tabs v-model="state.tab11value" type="smile" swipeable>
      <nut-tab-pane class="important-p-0 important-px-2" title="不符合项">
        <nut-form>
          <!-- 这是和不符合项相关的基础内容 -->
          <nut-form-item label="审计"> </nut-form-item>
          <nut-form-item label="流程"> </nut-form-item>
          <nut-form-item label="机场"> </nut-form-item>
          <nut-form-item label="部门"> </nut-form-item>
          <nut-form-item label="不符合项类型"> </nut-form-item>
          <nut-form-item label="详细内容"> </nut-form-item>
          <nut-form-item label="目标关闭日期"> </nut-form-item>
          <nut-form-item label="关闭人"> </nut-form-item>
        </nut-form>
        <nut-button type="info">修改</nut-button>
        <nut-button type="primary" @click="cancel">返回</nut-button>
      </nut-tab-pane>
      <nut-tab-pane title="风险评估">
        <nut-form>
          <!-- 这是和风险评估相关的内容 -->
          <nut-form-item label="根源分析"> </nut-form-item>
          <nut-form-item label="相关部门"> </nut-form-item>
          <nut-form-item label="评估责任人"> </nut-form-item>
          <nut-form-item label="可能性"> </nut-form-item>
          <nut-form-item label="严重性"> </nut-form-item>
          <nut-form-item label="风险值"> </nut-form-item>
          <nut-form-item label="事件描述"> </nut-form-item>
          <nut-form-item label="执行日期"> </nut-form-item>
          <nut-form-item label="是否安全事件"> </nut-form-item>
        </nut-form>
        <nut-button type="info">修改</nut-button>
        <nut-button type="primary" @click="cancel">返回</nut-button>
      </nut-tab-pane>
      <nut-tab-pane title="纠正措施">
        <nut-form>
          <!-- 这是纠正措施相关的内容 -->
          <nut-form-item label="责任人"> </nut-form-item>
          <nut-form-item label="完成人"> </nut-form-item>
          <nut-form-item label="目标日期"> </nut-form-item>
          <nut-form-item label="完成日期"> </nut-form-item>
          <nut-form-item label="详情"> </nut-form-item>
        </nut-form>
        <nut-button type="info">修改</nut-button>
        <nut-button type="primary" @click="cancel">返回</nut-button>
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script lang="ts" setup>
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getChecklists } from '../../api/modules/checklist'
  import { getAudits } from '../../api/modules/audit'
  // 和tab相关的
  const state = reactive({
    tab11value: '0'
  })
  const cancel = () => {
    uni.navigateBack()
  }
  // 表单数据
  // 数据项
  const processId = ref(0)
  const airportId = ref(0)
  const deptId = ref(0)
  const findingTypeId = ref(0)
  const rootAnalyzeId = ref(0)
  const relatedDeptId = ref(0)
  // 普通数据
  const targetCloseTime = ref('')
  const evaluateResult = ref('')
  const targetDate = ref('')
  const executeDate = ref('')
  const finishDate = ref('')
  const details = ref('')
  const possibility = ref(0)
  const severity = ref(0)
  const riskValue = ref(0)
  const isSecure = ref(0)
  const eventDescribe = ref('')
  const closeUserId = ref(0)
  const measureDutyManId = ref(0)
  const finisherId = ref(0)
  const evaluateDutyManId = ref(0)
  const auditId = ref(0)
  // 数据项列表
  const depts = ref([])
  const airports = ref([])
  const processes = ref([])
  const findingTypes = ref([])
  const rootAnalyzes = ref([])
  const users = ref([])
  const audits = ref([])
  onMounted(() => {
    loadDataItems()
    loadUsers()
    loadAudits()
  })

  const loadDataItems = async () => {
    const res = await getDataItems()
    depts.value = res.data.data.content
      .filter((item) => item.type === 3)
      .map((item) => ({ text: item.value, value: item.id }))

    airports.value = res.data.data.content
      .filter((item) => item.type === 0)
      .map((item) => ({ text: item.value, value: item.id }))

    processes.value = res.data.data.content
      .filter((item) => item.type === 5)
      .map((item) => ({ text: item.value, value: item.id }))

    findingTypes.value = res.data.data.content
      .filter((item) => item.type === 4)
      .map((item) => ({ text: item.value, value: item.id }))

    rootAnalyzes.value = res.data.data.content
      .filter((item) => item.type === 7)
      .map((item) => ({ text: item.value, value: item.id }))
  }
  const loadUsers = async () => {
    const res = await getUsers()
    users.value = res.data.data.content
  }
  const loadAudits = async () => {
    const res = await getAudits()
    audits.value = res.data.data.content
  }
  const saveFinding = () => {}
</script>
<style lang="scss" scoped>
  :deep(.nut-tabs) {
    height: 100%;
    .nut-tabs__content {
      height: calc(100% - var(--window-bottom));
    }
  }
</style>
