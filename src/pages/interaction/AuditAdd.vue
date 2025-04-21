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
    <nut-button type="info" @click="saveAudit">保存</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getChecklists } from '../../api/modules/checklist'
  import { addAudit } from '../../api/modules/audit'
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

  // 日期相关
  const minDate = new Date(2010, 0, 1)
  const maxDate = new Date(2045, 12, 31)
  const currentSSDate = ref(new Date(2022, 4, 10))
  const currentSEDate = ref(new Date(2022, 4, 10))
  const currentRSDate = ref(new Date(2022, 4, 10))
  const currentREDate = ref(new Date(2022, 4, 10))

  // 数据加载
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

    auditMethods.value = res.data.data.content
      .filter((item) => item.type === 1)
      .map((item) => ({ text: item.value, value: item.id }))
  }

  const loadUsers = async () => {
    const res = await getUsers()
    originUsers.value = res.data.data.content
    users.value = res.data.data.content.map((item) => ({
      text: item.username,
      value: item.id
    }))
  }

  const loadChecklists = async () => {
    const res = await getChecklists()
    checklistsRaw.value = res.data.data.content
  }

  // 日期处理函数
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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

  const onCloserConfirm = ({ selectedOptions }) => {
    closeUserId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onOtherAuditorsChange = (value) => {
    otherAuditorsId.value = value.join(',')
  }

  const onChecklistsChange = (value) => {
    checklistsIds.value = value.join(',')
  }

  // 保存函数
  const saveAudit = async () => {
    try {
      // 将日期格式化为 LocalDateTime 格式（yyyy-MM-dd'T'HH:mm:ss）
      const formatToLocalDateTime = (dateStr) => {
        return dateStr ? `${dateStr}T00:00:00` : null
      }

      const response = await addAudit(
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
        closeUserId.value,
        remark.value,
        checklistsIds.value,
        summary.value
      )
      cancel()
      console.log('保存成功:', response.data)
    } catch (error) {
      console.error('保存失败:', error)
    }
  }
  const cancel = () => {
    uni.navigateBack()
  }
</script>
