<template>
  <view class="interaction h-full">
    <nut-form>
      <nut-form-item label="审计名">
        <nut-input
          v-model="audit.name"
          class="nut-input-text"
          placeholder="请输入审计名"
          type="text"
        />
      </nut-form-item>
      <nut-form-item label="部门">
        <nut-picker
          cancel-text=" "
          v-model="currentDept"
          :columns="depts"
          title="   "
          @confirm="onDeptConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="机场">
        <nut-picker
          cancel-text=" "
          v-model="currentAirprot"
          :columns="airports"
          title="   "
          @confirm="onAirportConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="流程">
        <nut-picker
          cancel-text=" "
          v-model="currentPorcess"
          :columns="processes"
          title="   "
          @confirm="onProcessConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="审计方法">
        <nut-picker
          cancel-text=" "
          v-model="currentAuditMethod"
          :columns="auditMethods"
          title="   "
          @confirm="onAuditMethodConfirm"
        ></nut-picker>
      </nut-form-item>
      <nut-form-item label="主审人"> </nut-form-item>
      <nut-form-item label="其他审计人"> </nut-form-item>

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
      <nut-form-item label="实际开始日期">
        <nut-date-picker
          v-model="currentREDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onREConfirm"
        ></nut-date-picker>
      </nut-form-item>
      <nut-form-item label="备注">
        <nut-textarea v-model="audit.remark"></nut-textarea>
      </nut-form-item>
      <nut-form-item label="审计总结">
        <nut-textarea v-model="audit.summary"></nut-textarea>
      </nut-form-item>
      <nut-form-item label="关闭人"> </nut-form-item>
    </nut-form>
  </view>
</template>
<script setup>
  import { getDataItems } from '../../api/modules/dataitem'
  onMounted(() => {
    getDataItems().then((res) => {
      depts.value = res.data.data.content
        .filter((item) => item.type === 3)
        .map((item) => {
          return {
            text: item.value,
            value: item.id
          }
        })
      airports.value = res.data.data.content
        .filter((item) => item.type === 0)
        .map((item) => {
          return {
            text: item.value,
            value: item.id
          }
        })
      processes.value = res.data.data.content
        .filter((item) => item.type === 5)
        .map((item) => {
          return {
            text: item.value,
            value: item.id
          }
        })
      auditMethods.value = res.data.data.content
        .filter((item) => item.type === 1)
        .map((item) => {
          return {
            text: item.value,
            value: item.id
          }
        })
    })
  })
  const audit = ref({
    name: '',
    deptId: '',
    plannedStartDate: '',
    plannedEndDate: '',
    realStartDate: '',
    realEndDate: '',
    airportId: '',
    processId: '',
    mainAuditorId: '',
    otherAuditorsId: '',
    auditMethodId: '',
    status: '',
    closeUserId: '',
    remark: '',
    checklistsIds: '',
    findingsIds: '',
    summary: ''
  })
  // 日期相关的
  const minDate = new Date(2010, 0, 1)
  const maxDate = new Date(2045, 12, 31)
  // 计划开始日期
  const currentSSDate = ref(new Date(2022, 4, 10))
  function onSSConfirm({ date, selectedValue, selectedOptions }) {
    console.log(date, selectedValue)
    console.log(currentSSDate.value, '当前的计划开始日期')
  }
  // 计划结束日期
  const currentSEDate = ref(new Date(2022, 4, 10))
  function onSEConfirm({ date, selectedValue, selectedOptions }) {
    console.log(date, selectedValue)
    console.log(currentSEDate.value, '当前的计划结束日期')
  }
  // 实际开始日期
  const currentRSDate = ref(new Date(2022, 4, 10))
  function onRSConfirm({ date, selectedValue, selectedOptions }) {
    console.log(date, selectedValue)
    console.log(currentRSDate.value, '当前的实始开始日期')
  }
  // 实际结束日期
  const currentREDate = ref(new Date(2022, 4, 10))
  function onREConfirm({ date, selectedValue, selectedOptions }) {
    console.log(date, selectedValue)
    console.log(currentREDate.value, '当前的实始结束日期')
  }
  // 获取相关的其他单选数据:部门，机场，流程，审计方法
  const currentDept = ref('')
  const depts = ref([])
  function onDeptConfirm({ selectedValue, selectedOptions }) {
    console.log(selectedValue, selectedOptions)
    console.log(currentDept.value, '当前选择的部门')
  }
  const currentAirprot = ref('')
  const airports = ref([])
  function onAirportConfirm({ selectedValue, selectedOptions }) {
    console.log(selectedValue, selectedOptions)
    console.log(currentAirprot.value, '当前选择的机场')
  }
  const currentPorcess = ref('')
  const processes = ref([])
  function onProcessConfirm({ selectedValue, selectedOptions }) {
    console.log(selectedValue, selectedOptions)
    console.log(currentPorcess.value, '当前选择的机场')
  }
  const currentAuditMethod = ref('')
  const auditMethods = ref([])
  function onAuditMethodConfirm({ selectedValue, selectedOptions }) {
    console.log(selectedValue, selectedOptions)
    console.log(currentAuditMethod.value, '当前选择的审计方法')
  }
  // 获取相关的其他（单）多选数据:主审计员，其他审计员，关闭人，检查单，不符合项
  // 获取相关的其他（单）多选数据:主审计员，其他审计员，关闭人，检查单，不符合项
</script>
