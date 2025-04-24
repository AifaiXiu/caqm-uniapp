<template>
  <view class="interaction h-full">
    <nut-cell-group>
      <nut-form-item label="内容">
        <nut-textarea
          readonly
          v-model="checklistItemContent"
          placeholder="请输入内容"
        ></nut-textarea>
      </nut-form-item>
      <nut-form-item label="备注">
        <nut-textarea v-model="checklistItemRemark" placeholder="请输入备注"></nut-textarea>
      </nut-form-item>
      <nut-form-item label="审计结果">
        <nut-input v-model="status"></nut-input>
        <nut-textarea readonly v-model="notes"></nut-textarea>
      </nut-form-item>
    </nut-cell-group>
    <nut-button type="success" @click="save">保存</nut-button>
  </view>
</template>
<script setup>
  import { getChecklistItemById, updateItemDetails } from '../../api/modules/checklistitem'
  const notes = ref('0表示符合，1表示文文不符，2表示文实不符，3表示不适用')
  const checklistItemId = ref('')
  const checklistItemContent = ref('')
  const checklistItemRemark = ref('')
  const status = ref(0)
  onLoad((options) => {
    console.log('路由参数', options.id)
    checklistItemId.value = options.id
    getChecklistItemContent(checklistItemId.value)
  })
  // 获取一下检查项的内容
  const getChecklistItemContent = (id) => {
    getChecklistItemById(id).then((res) => {
      console.log('检查项内容', res.data.data)
      const data = res.data.data
      checklistItemContent.value = data.checklistItemContent
      checklistItemRemark.value = data.checklistItemRemark
      status.value = data.status
    })
  }
  const save = () => {
    const obj = {
      id: checklistItemId.value,
      checklistItemRemark: checklistItemRemark.value,
      status: status.value
    }
    console.log(obj, '保存的参数')
    updateItemDetails(obj).then((res) => {
      console.log('保存成功', res)
      uni.navigateBack()
    })
  }
</script>
