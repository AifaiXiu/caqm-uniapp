<template>
  <view class="h-full">
    <nut-button type="info" @click="saveFinding">保存</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getChecklists } from '../../api/modules/checklist'
  const cancel = () => {
    uni.navigateBack()
  }
  // 表单数据
  // 数据项
  const processId = ref(0)
  const airportId = ref(0)
  const deptId = ref(0)
  const findingTypeId = ref(0)
  const rootAnalyzedId = ref(0)
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
  const riskValue = ef(0)
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
  const checklists = ref([])
  onMounted(() => {
    loadDataItems()
    loadUsers()
    loadChecklists()
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
  const loadChecklists = async () => {
    const res = await getChecklists()
    checklists.value = res.data.data.content
  }
  const saveFinding = () => {}
</script>
