<template>
  <view class="h-full">
    <nut-form>
      <!-- 这是和不符合项相关的基础内容 -->
      <!-- 审计选择 -->
      <nut-form-item label="审计">
        <nut-picker
          cancel-text=" "
          :columns="audits"
          title="   "
          @confirm="onAuditConfirm"
        ></nut-picker>
      </nut-form-item>

      <!-- 流程选择 -->
      <nut-form-item label="流程">
        <nut-picker
          cancel-text=" "
          :columns="processes"
          title="   "
          @confirm="onProcessConfirm"
        ></nut-picker>
      </nut-form-item>

      <!-- 机场选择 -->
      <nut-form-item label="机场">
        <nut-picker
          cancel-text=" "
          :columns="airports"
          title="   "
          @confirm="onAirportConfirm"
        ></nut-picker>
      </nut-form-item>

      <!-- 部门选择 -->
      <nut-form-item label="部门">
        <nut-picker
          cancel-text=" "
          :columns="depts"
          title="   "
          @confirm="onDeptConfirm"
        ></nut-picker>
      </nut-form-item>

      <!-- 不符合项类型选择 -->
      <nut-form-item label="不符合项类型">
        <nut-picker
          cancel-text=" "
          :columns="findingTypes"
          title="   "
          @confirm="onFindingTypeConfirm"
        ></nut-picker>
      </nut-form-item>

      <!-- 详细内容输入 -->
      <nut-form-item label="详细内容">
        <nut-textarea
          v-model="evaluateResult"
          placeholder="请输入不符合项详细内容"
          :autosize="{ minHeight: 100 }"
        ></nut-textarea>
      </nut-form-item>

      <!-- 目标关闭日期选择 -->
      <nut-form-item label="目标关闭日期">
        <nut-date-picker
          v-model="currentTargetCloseDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onTargetCloseConfirm"
        ></nut-date-picker>
      </nut-form-item>

      <!-- 关闭人选择 -->
      <nut-form-item label="关闭人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onCloserConfirm"
        ></nut-picker>
      </nut-form-item>
    </nut-form>
    <nut-button type="info" @click="updateAction">修改</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getAudits } from '../../api/modules/audit'
  import { updateFindingBasic, getFindingsByIds } from '../../api/modules/finding'
  const currentFindingId = ref(0)
  onLoad((options) => {
    currentFindingId.value = options.id
    console.log('路由参数ID:', currentFindingId.value)
    // getFindingsByIds(currentFindingId.value).then((res) => {
    //   console.log(res.data.data[0], '获取到了')
    //   const data = res.data.data[0]
    //   auditId.value = data.audit.id
    //   processId.value = data.process.id
    // })
  })
  const cancel = () => {
    uni.navigateBack()
  }
  const updateAction = () => {
    const obj = {
      id: currentFindingId.value,
      auditId: auditId.value,
      processId: processId.value,
      airportId: airportId.value,
      closeUserId: closeUserId.value,
      targetCloseTime: targetCloseTime.value,
      deptId: deptId.value,
      findingTypeId: findingTypeId.value,
      evaluateResult: evaluateResult.value
    }
    console.log(obj, '这是修改对象')
    updateFindingBasic(obj).then((res) => {
      console.log(res, '修改成功')
      cancel()
    })
  }
  // 不符合项基本表单数据
  const auditId = ref(0)
  const processId = ref(0)
  const airportId = ref(0)
  const closeUserId = ref(0)
  const targetCloseTime = ref('')
  const deptId = ref(0)
  const findingTypeId = ref(0)
  const evaluateResult = ref('')

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
    users.value = res.data.data.content.map((user) => ({
      text: user.username,
      value: user.id
    }))
  }
  const loadAudits = async () => {
    const res = await getAudits()
    audits.value = res.data.data.content.map((audit) => ({
      text: audit.name,
      value: audit.id
    }))
  }
  const saveFinding = () => {}

  // 不符合项基础相关的
  // 选择器确认事件
  const onAuditConfirm = ({ selectedOptions }) => {
    auditId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onProcessConfirm = ({ selectedOptions }) => {
    processId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onAirportConfirm = ({ selectedOptions }) => {
    airportId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onDeptConfirm = ({ selectedOptions }) => {
    deptId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onFindingTypeConfirm = ({ selectedOptions }) => {
    findingTypeId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onCloserConfirm = ({ selectedOptions }) => {
    closeUserId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onTargetCloseConfirm = () => {
    targetCloseTime.value = formatToLocalDateTime(currentTargetCloseDate.value)
  }
  // 日期相关
  const minDate = new Date(2020, 0, 1)
  const maxDate = new Date(2030, 11, 31)
  const currentTargetCloseDate = ref(new Date())
  // 日期格式化
  const formatToLocalDateTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`
  }
</script>
<style lang="scss" scoped>
  :deep(.nut-tabs) {
    height: 100%;
    .nut-tabs__content {
      height: calc(100% - var(--window-bottom));
    }
  }
</style>
