<template>
  <view class="h-full">
    <nut-form>
      <!-- 这是纠正措施相关的内容 -->
      <nut-form-item label="责任人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onMeasureDutyManConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="完成人">
        <nut-picker
          cancel-text=" "
          :columns="users"
          title="   "
          @confirm="onFinisherConfirm"
        ></nut-picker>
      </nut-form-item>

      <nut-form-item label="目标日期">
        <nut-date-picker
          v-model="currentTargetDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onTargetDateConfirm"
        ></nut-date-picker>
      </nut-form-item>

      <nut-form-item label="完成日期">
        <nut-date-picker
          v-model="currentFinishDate"
          :min-date="minDate"
          :max-date="maxDate"
          three-dimensional
          is-show-chinese
          @confirm="onFinishDateConfirm"
        ></nut-date-picker>
      </nut-form-item>

      <nut-form-item label="详情">
        <nut-textarea
          v-model="details"
          placeholder="请输入详情"
          :autosize="{ minHeight: 100 }"
        ></nut-textarea>
      </nut-form-item>
    </nut-form>
    <nut-button type="info" @click="updateAction">修改</nut-button>
    <nut-button type="primary" @click="cancel">返回</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { getDataItems } from '../../api/modules/dataitem'
  import { getUsers } from '../../api/modules/user'
  import { getFindingsByIds, updateFindingMeasure } from '../../api/modules/finding'

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
        console.log('获取到的纠正措施数据:', res.data.data[0])
        const data = res.data.data[0]

        // 设置表单数据
        if (data.measureDutyMan) {
          measureDutyManId.value = data.measureDutyMan.id
        }

        if (data.finisher) {
          finisherId.value = data.finisher.id
        }

        details.value = data.details || ''

        if (data.targetDate) {
          targetDate.value = data.targetDate
          try {
            currentTargetDate.value = new Date(data.targetDate)
          } catch (error) {
            console.error('目标日期转换失败:', error)
            currentTargetDate.value = new Date()
          }
        }

        if (data.finishDate) {
          finishDate.value = data.finishDate
          try {
            currentFinishDate.value = new Date(data.finishDate)
          } catch (error) {
            console.error('完成日期转换失败:', error)
            currentFinishDate.value = new Date()
          }
        }
      })
      .catch((error) => {
        console.error('获取纠正措施数据失败:', error)
        uni.showToast({
          title: '获取数据失败',
          icon: 'none'
        })
      })
  }

  const cancel = () => {
    uni.navigateBack()
  }

  // 纠正措施相关的表单数据
  const targetDate = ref('')
  const finishDate = ref('')
  const details = ref('')
  const measureDutyManId = ref(0)
  const finisherId = ref(0)

  // 更新操作
  const updateAction = () => {
    // 获取纠正措施数据对象
    const measureData = {
      id: Number(currentFindingId.value),
      measureDutyManId: measureDutyManId.value,
      finisherId: finisherId.value,
      targetDate: targetDate.value,
      finishDate: finishDate.value,
      details: details.value
    }

    // 打印对象
    console.log('纠正措施数据对象:', measureData)

    // 调用API更新数据
    updateFindingMeasure(measureData)
      .then((res) => {
        console.log('纠正措施修改成功:', res)
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

  // 数据项列表
  const users = ref([])

  onMounted(() => {
    loadUsers()
  })

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
  const onMeasureDutyManConfirm = ({ selectedOptions }) => {
    measureDutyManId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onFinisherConfirm = ({ selectedOptions }) => {
    finisherId.value = Number(selectedOptions[0]?.value || 0)
  }

  const onTargetDateConfirm = () => {
    targetDate.value = formatToLocalDateTime(currentTargetDate.value)
  }

  const onFinishDateConfirm = () => {
    finishDate.value = formatToLocalDateTime(currentFinishDate.value)
  }

  // 日期相关
  const minDate = new Date(2020, 0, 1)
  const maxDate = new Date(2030, 11, 31)
  const currentTargetDate = ref(new Date())
  const currentFinishDate = ref(new Date())

  // 日期格式化
  const formatToLocalDateTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`
  }
</script>
