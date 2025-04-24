<template>
  <view class="interaction h-full">
    <nut-form>
      <nut-form-item label="审计名">
        <nut-input v-model="name" class="nut-input-text" placeholder="请输入审计名" type="text" />
      </nut-form-item>
      <nut-form-item label="部门">
        <nut-picker
          cancel-text=" "
          :columns="depts"
          title="   "
          @confirm="onDeptConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="机场">
        <nut-picker
          cancel-text=" "
          :columns="airports"
          title="   "
          @confirm="onAirportConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="流程">
        <nut-picker
          cancel-text=" "
          :columns="processes"
          title="   "
          @confirm="onProcessConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="审计方法">
        <nut-picker
          cancel-text=" "
          :columns="auditMethods"
          title="   "
          @confirm="onAuditMethodConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="主审人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onMainAuditorConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="其他审计人">
        <nut-checkbox-group v-model="otherAuditors" @change="onOtherAuditorsChange">
          <nut-checkbox v-for="item in originUsers" :key="item.id" :label="item.id">
            {{ item.username }}
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-form-item>
      <nut-form-item label="检查单">
        <nut-checkbox-group v-model="checklists" @change="onChecklistsChange">
          <nut-checkbox v-for="item in checklistsRaw" :key="item.id" :label="item.id">
            {{ item.name }}
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-form-item>
      <nut-form-item label="计划开始日期">
        <nut-date-picker
          v-model="currentSSDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onSSConfirm"
        ></nut-date-picker>
      </nut-form-item>
      <nut-form-item label="计划结束日期">
        <nut-date-picker
          v-model="currentSEDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onSEConfirm"
        ></nut-date-picker>
      </nut-form-item>
      <nut-form-item label="实际开始日期">
        <nut-date-picker
          v-model="currentRSDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onRSConfirm"
        ></nut-date-picker>
      </nut-form-item>
      <nut-form-item label="实际结束日期">
        <nut-date-picker
          v-model="currentREDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onREConfirm"
        ></nut-date-picker>
      </nut-form-item>
      <nut-form-item label="状态">
        <nut-picker
          cancel-text=" "
          :columns="statusOptions"
          title="   "
          @confirm="onStatusConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="关闭人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onCloserConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="备注">
        <nut-textarea v-model="remark"></nut-textarea>
      </nut-form-item>
      <nut-form-item label="审计总结">
        <nut-textarea v-model="summary"></nut-textarea>
      </nut-form-item>
    </nut-form>
    <nut-button type="info" @click="updateAuditData">更新</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getChecklists } from '../../api/modules/checklist'
  import { updateAudit, getAuditsByIds } from '../../api/modules/audit'

  // 当前审计ID
  const currentAuditId = ref(0)

  // 表单字段（全部改为独立ref）
  const name = ref('')
  const deptId = ref(0)
  const plannedStartDate = ref('')
  const plannedEndDate = ref('')
  const realStartDate = ref('')
  const realEndDate = ref('')
  const airportId = ref(0)
  const processId = ref(0)
  const mainAuditorId = ref('')
  const otherAuditorsId = ref('')
  const auditMethodId = ref(0)
  const status = ref(0)
  const closeUserId = ref(0)
  const remark = ref('')
  const checklistsIds = ref('')
  const summary = ref('')

  // 其他状态
  const depts = ref([])
  const airports = ref([])
  const processes = ref([])
  const auditMethods = ref([])
  const users = ref([])
  const originUsers = ref([])
  const otherAuditors = ref([])
  const checklistsRaw = ref([])
  const checklists = ref([])
  const statusOptions = ref([
    { text: '开启', value: 0 },
    { text: '关闭', value: 1 }
  ])

  // 日期相关
  const minDate = new Date(2010, 0, 1)
  const maxDate = new Date(2045, 12, 31)
  const currentSSDate = ref(new Date())
  const currentSEDate = ref(new Date())
  const currentRSDate = ref(new Date())
  const currentREDate = ref(new Date())

  // 获取路由参数
  onLoad((options) => {
    if (options.id) {
      currentAuditId.value = Number(options.id)
      console.log('加载审计ID:', currentAuditId.value)
    }
  })

  // 数据加载
  onMounted(() => {
    Promise.all([loadDataItems(), loadUsers(), loadChecklists()]).then(() => {
      // 所有数据加载完成后，加载审计详情
      // if (currentAuditId.value) {
      //   loadAuditDetails()
      // }
    })
  })

  // 加载审计详情
  const loadAuditDetails = async () => {
    try {
      const res = await getAuditsByIds(currentAuditId.value + '')
      const auditData = res.data.data.content[0]

      // 填充表单数据
      name.value = auditData.name || ''
      deptId.value = auditData.dept?.id || 0
      airportId.value = auditData.airport?.id || 0
      processId.value = auditData.process?.id || 0
      auditMethodId.value = auditData.auditMethod?.id || 0
      mainAuditorId.value = auditData.mainAuditor?.id?.toString() || ''
      status.value = auditData.status || 0
      closeUserId.value = auditData.closeUser?.id || 0
      remark.value = auditData.remark || ''
      summary.value = auditData.summary || ''

      // 处理其他审计人
      if (auditData.otherAuditors) {
        const auditorIds = auditData.otherAuditors.map((auditor) => auditor.id)
        otherAuditors.value = auditorIds
        otherAuditorsId.value = auditorIds.join(',')
      }

      // 处理检查单
      if (auditData.checklists) {
        const checklistIds = auditData.checklists.map((checklist) => checklist.id)
        checklists.value = checklistIds
        checklistsIds.value = checklistIds.join(',')
      }

      // 处理日期
      if (auditData.plannedStartDate) {
        plannedStartDate.value = formatDateFromISOString(auditData.plannedStartDate)
        currentSSDate.value = new Date(auditData.plannedStartDate)
      }

      if (auditData.plannedEndDate) {
        plannedEndDate.value = formatDateFromISOString(auditData.plannedEndDate)
        currentSEDate.value = new Date(auditData.plannedEndDate)
      }

      if (auditData.realStartDate) {
        realStartDate.value = formatDateFromISOString(auditData.realStartDate)
        currentRSDate.value = new Date(auditData.realStartDate)
      }

      if (auditData.realEndDate) {
        realEndDate.value = formatDateFromISOString(auditData.realEndDate)
        currentREDate.value = new Date(auditData.realEndDate)
      }

      console.log('审计详情加载成功')
    } catch (error) {
      console.error('加载审计详情失败:', error)
      uni.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    }
  }

  const loadDataItems = async () => {
    try {
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

      auditMethods.value = res.data.data.content
        .filter((item) => item.type === 1)
        .map((item) => ({ text: item.value, value: item.id }))
    } catch (error) {
      console.error('加载数据项失败:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const res = await getUsers()
      originUsers.value = res.data.data.content
      users.value = res.data.data.content.map((item) => ({
        text: item.username,
        value: item.id
      }))
    } catch (error) {
      console.error('加载用户数据失败:', error)
    }
  }

  const loadChecklists = async () => {
    try {
      const res = await getChecklists()
      checklistsRaw.value = res.data.data.content
    } catch (error) {
      console.error('加载检查单数据失败:', error)
    }
  }

  // 日期处理函数
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  // 从ISO字符串格式化日期 (2023-04-24T00:00:00 -> 2023-04-24)
  const formatDateFromISOString = (isoString) => {
    if (!isoString) return ''
    return isoString.split('T')[0]
  }

  const onSSConfirm = () => {
    plannedStartDate.value = formatDate(currentSSDate.value)
  }

  const onSEConfirm = () => {
    plannedEndDate.value = formatDate(currentSEDate.value)
  }

  const onRSConfirm = () => {
    realStartDate.value = formatDate(currentRSDate.value)
  }

  const onREConfirm = () => {
    realEndDate.value = formatDate(currentREDate.value)
  }

  // 选择器处理函数
  const onDeptConfirm = ({ selectedOptions }) => {
    deptId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onAirportConfirm = ({ selectedOptions }) => {
    airportId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onProcessConfirm = ({ selectedOptions }) => {
    processId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onAuditMethodConfirm = ({ selectedOptions }) => {
    auditMethodId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onMainAuditorConfirm = ({ selectedOptions }) => {
    mainAuditorId.value = selectedOptions[0]?.value?.toString() || ''
  }

  const onStatusConfirm = ({ selectedOptions }) => {
    status.value = Number(selectedOptions[0]?.value || 0)
  }

  const onCloserConfirm = ({ selectedOptions }) => {
    closeUserId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onOtherAuditorsChange = (value) => {
    otherAuditorsId.value = value.join(',')
  }

  const onChecklistsChange = (value) => {
    checklistsIds.value = value.join(',')
  }

  // 更新函数
  const updateAuditData = async () => {
    try {
      // 将日期格式化为 LocalDateTime 格式（yyyy-MM-dd'T'HH:mm:ss）
      const formatToLocalDateTime = (dateStr) => {
        return dateStr ? `${dateStr}T00:00:00` : null
      }

      const response = await updateAudit(
        currentAuditId.value,
        name.value,
        deptId.value,
        formatToLocalDateTime(plannedStartDate.value),
        formatToLocalDateTime(plannedEndDate.value),
        formatToLocalDateTime(realStartDate.value),
        formatToLocalDateTime(realEndDate.value),
        airportId.value,
        processId.value,
        mainAuditorId.value,
        otherAuditorsId.value,
        auditMethodId.value,
        status.value,
        closeUserId.value,
        remark.value,
        checklistsIds.value,
        summary.value
      )

      uni.showToast({
        title: '更新成功',
        icon: 'success'
      })

      setTimeout(() => {
        cancel()
      }, 1500)

      console.log('更新成功:', response.data)
    } catch (error) {
      console.error('更新失败:', error)
      uni.showToast({
        title: '更新失败',
        icon: 'none'
      })
    }
  }

  const cancel = () => {
    uni.navigateBack()
  }
</script>

<style scoped>
  .nut-button {
    margin: 10rpx;
  }
</style>
