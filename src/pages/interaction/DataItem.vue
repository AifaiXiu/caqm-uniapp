<template>
  <nut-picker :columns="columns" title="数据项选择" @confirm="onConfirm"></nut-picker>
  <nut-input v-model="itemValue" placeholder="请输入数据项"></nut-input>
  <nut-button type="success" @click="newItem">新增</nut-button>
  <template>
    <nut-cell-group title="值">
      <view v-for="item in allDataItems" :key="item.id">
        <nut-cell :title="item.value" is-link>
          <template #link> <button @click="deleteItem(item.id)">删除</button> </template>
        </nut-cell>
      </view>
    </nut-cell-group>
  </template>
</template>

<script setup>
  import { getDataItems, deleteDataItem, addDataItem } from '../../api/modules/dataitem'
  const columns = ref([
    { text: '机场', value: '0' },
    { text: '审计方法', value: '1' },
    { text: '公司', value: '2' },
    { text: '部门', value: '3' },
    { text: '不符合项类型', value: '4' },
    { text: '流程', value: '5' },
    { text: '风险源', value: '6' },
    { text: '根源分析', value: '7' }
  ])
  const onConfirm = ({ selectedValue, selectedOptions }) => {
    console.log('确定了', Number(selectedValue.toString()))
    currentItem.value = Number(selectedValue.toString())
  }
  const allDataItems = ref([])
  const flushData = () => {
    // 获取所有的数据项，根据type字段区分
    getDataItems(currentItem.value).then((res) => {
      console.log(res.data.data.content)
      allDataItems.value = res.data.data.content.filter((item) => item.type === currentItem.value)
    })
  }

  // 当前的页面展示的数据项的type
  const currentItem = ref(0)
  watch(currentItem, () => {
    flushData()
  })
  // 准备新增的数据项值
  const itemValue = ref('')
  const newItem = () => {
    addDataItem(currentItem.value, itemValue.value).then((res) => {
      console.log(res)
      flushData()
    })
  }
  const deleteItem = (id) => {
    console.log('点击事件触发了', id)
    deleteDataItem(id).then((res) => {
      console.log(res)
      flushData()
    })
  }
  // 当前展示的数据项
  const currentItemData = ref([])
  onMounted(() => {
    flushData()
  })
</script>
