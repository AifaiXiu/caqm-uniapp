<template>
  <view class="h-full">
    <nut-form>
      <!-- 这是和风险评估相关的内容 -->
      <nut-form-item label="根源分析">
        <nut-picker
          cancel-text=" "
          :columns="rootAnalyzes"
          title="   "
          @confirm="onRootAnalyzeConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="相关部门">
        <nut-picker
          cancel-text=" "
          :columns="depts"
          title="   "
          @confirm="onRelatedDeptConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="评估责任人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onEvaluateDutyManConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="可能性">
        <nut-picker
          cancel-text=" "
          :columns="psr"
          title="   "
          @confirm="onPossibilityConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="严重性">
        <nut-picker
          cancel-text=" "
          :columns="psr"
          title="   "
          @confirm="onSeverityConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="风险值">
        <text>{{ calculatedRiskValue }}</text>
      </nut-form-item>

      <nut-form-item label="事件描述">
        <nut-textarea
          v-model="eventDescribe"
          placeholder="请输入事件描述"
          :autosize="{ minHeight: 100 }"
        ></nut-textarea>
      </nut-form-item>

      <nut-form-item label="执行日期">
        <nut-date-picker
          v-model="currentExecuteDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onExecuteDateConfirm"
        ></nut-date-picker>
      </nut-form-item>

      <nut-form-item label="是否安全事件">
        <nut-picker
          cancel-text=" "
          :columns="secures"
          title="   "
          @confirm="onIsSecureConfirm"
        ></nut-picker>
      </nut-form-item>
    </nut-form>
    <nut-button type="info" @click="updateAction">修改</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getFindingsByIds, updateFindingEvaluate } from '../../api/modules/finding'

  const currentFindingId = ref(0)

  onLoad((options) => {
    currentFindingId.value = options.id
    console.log('路由参数ID:', currentFindingId.value)
    loadFindingDetails()
  })

  // 加载不符合项详细信息
  const loadFindingDetails = () => {
    getFindingsByIds(currentFindingId.value)
      .then((res) => {
        console.log('获取到的风险评估数据:', res.data.data[0])
        const data = res.data.data[0]

        // 设置表单数据
        if (data.rootAnalyze) {
          rootAnalyzeId.value = data.rootAnalyze.id
        }

        if (data.relatedDept) {
          relatedDeptId.value = data.relatedDept.id
        }

        if (data.evaluateDutyMan) {
          evaluateDutyManId.value = data.evaluateDutyMan.id
        }

        possibility.value = data.possibility || 0
        severity.value = data.severity || 0
        riskValue.value = data.riskValue || 0
        eventDescribe.value = data.eventDescribe || ''
        isSecure.value = data.isSecure || 0

        if (data.executeDate) {
          executeDate.value = data.executeDate
          try {
            // 尝试将日期字符串转换为Date对象
            currentExecuteDate.value = new Date(data.executeDate)
          } catch (error) {
            console.error('日期转换失败:', error)
            currentExecuteDate.value = new Date()
          }
        }
      })
      .catch((error) => {
        console.error('获取风险评估数据失败:', error)
        uni.showToast({
          title: '获取数据失败',
          icon: 'none'
        })
      })
  }

  const cancel = () => {
    uni.navigateBack()
  }

  // 风险评估相关的表单数据
  const rootAnalyzeId = ref(0)
  const relatedDeptId = ref(0)
  const evaluateDutyManId = ref(0)
  const possibility = ref(0)
  const severity = ref(0)
  const riskValue = ref(0)
  const eventDescribe = ref('')
  const isSecure = ref(0)
  const executeDate = ref('')

  const updateAction = () => {
    // 获取风险评估数据对象
    const riskData = {
      id: Number(currentFindingId.value),
      rootAnalyzeId: rootAnalyzeId.value,
      relatedDeptId: relatedDeptId.value,
      evaluateDutyManId: evaluateDutyManId.value,
      possibility: possibility.value,
      severity: severity.value,
      riskValue: riskValue.value,
      eventDescribe: eventDescribe.value,
      isSecure: isSecure.value,
      executeDate: executeDate.value
    }

    // 打印对象
    console.log('风险评估数据对象:', riskData)

    // 调用API更新数据
    updateFindingEvaluate(riskData)
      .then((res) => {
        console.log('风险评估修改成功:', res)
        uni.showToast({
          title: '修改成功',
          icon: 'success'
        })
        setTimeout(() => {
          cancel()
        }, 1500)
      })
      .catch((error) => {
        console.error('修改失败:', error)
        uni.showToast({
          title: '修改失败',
          icon: 'none'
        })
      })
  }

  // 根据可能性和严重性计算风险值
  const calculatedRiskValue = computed(() => {
    // 根据业务逻辑计算风险值
    // 这里使用一个简单的算法，可以根据实际需求调整
    const possibilityValues = { 0: 3, 1: 2, 2: 1 } // 高=3, 中=2, 低=1
    const severityValues = { 0: 3, 1: 2, 2: 1 } // 高=3, 中=2, 低=1

    const calcValue =
      (possibilityValues[possibility.value] || 0) * (severityValues[severity.value] || 0)

    // 更新表单值
    riskValue.value = calcValue

    // 返回对应的描述
    if (calcValue >= 6) return '高风险'
    if (calcValue >= 3) return '中风险'
    return '低风险'
  })

  // 数据项列表
  const psr = ref([
    { text: '高', value: 0 },
    { text: '中', value: 1 },
    { text: '低', value: 2 }
  ])

  const secures = ref([
    { text: '是', value: 1 },
    { text: '否', value: 0 }
  ])

  const depts = ref([])
  const rootAnalyzes = ref([])
  const users = ref([])

  onMounted(() => {
    loadDataItems()
    loadUsers()
  })

  const loadDataItems = async () => {
    try {
      const res = await getDataItems()
      depts.value = res.data.data.content
        .filter((item) => item.type === 3)
        .map((item) => ({ text: item.value, value: item.id }))

      rootAnalyzes.value = res.data.data.content
        .filter((item) => item.type === 7)
        .map((item) => ({ text: item.value, value: item.id }))
    } catch (error) {
      console.error('加载数据项失败:', error)
      uni.showToast({
        title: '加载数据项失败',
        icon: 'none'
      })
    }
  }

  const loadUsers = async () => {
    try {
      const res = await getUsers()
      users.value = res.data.data.content.map((user) => ({
        text: user.username,
        value: user.id
      }))
    } catch (error) {
      console.error('加载用户数据失败:', error)
      uni.showToast({
        title: '加载用户数据失败',
        icon: 'none'
      })
    }
  }

  // 选择器确认事件
  const onRootAnalyzeConfirm = ({ selectedOptions }) => {
    rootAnalyzeId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onRelatedDeptConfirm = ({ selectedOptions }) => {
    relatedDeptId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onEvaluateDutyManConfirm = ({ selectedOptions }) => {
    evaluateDutyManId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onPossibilityConfirm = ({ selectedOptions }) => {
    possibility.value = Number(selectedOptions[0]?.value || 0)
  }

  const onSeverityConfirm = ({ selectedOptions }) => {
    severity.value = Number(selectedOptions[0]?.value || 0)
  }

  const onIsSecureConfirm = ({ selectedOptions }) => {
    isSecure.value = Number(selectedOptions[0]?.value || 0)
  }

  const onExecuteDateConfirm = () => {
    executeDate.value = formatToLocalDateTime(currentExecuteDate.value)
  }

  // 日期相关
  const minDate = new Date(2020, 0, 1)
  const maxDate = new Date(2030, 11, 31)
  const currentExecuteDate = ref(new Date())

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

  .nut-button {
    margin: 10rpx;
  }
</style>
