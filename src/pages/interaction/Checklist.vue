<template>
  <view class="interaction h-full">
    <nut-tabs v-model="state.tab11value" type="smile" swipeable>
      <nut-tab-pane title="检查单项">
        <ChecklistItem />
      </nut-tab-pane>
      <nut-tab-pane title="检查单">
        <view v-if="!isEditChecklist">
          <nut-button type="info" @click="isEditChecklist = true">新增 </nut-button>
          <view class="h-full" v-for="item in allItems" :key="item.id">
            <nut-cell-group :title="item.name">
              <nut-button type="danger" @click="deleteAction(item.id)">删除</nut-button>
              <nut-cell title="备注" :desc="item.remark"></nut-cell>
              <nut-cell title="部门" :desc="item.dept.value"></nut-cell>
              <nut-cell title="文件">
                <view v-for="file in item.files" :key="file.id">
                  <nut-tag type="primary" round>{{ file.fileName }}</nut-tag>
                </view>
              </nut-cell>
              <nut-cell title="检查项">
                <view v-for="item in item.checklistItems" :key="item.id">
                  <nut-tag type="primary" round>{{ item.checklistItemName }}</nut-tag>
                </view>
              </nut-cell>
            </nut-cell-group>
          </view>
        </view>
        <view v-else>
          <nut-form>
            <nut-form-item label="检查单名称">
              <nut-input v-model="checklistAdd.name" placeholder="请输入检查单名称" />
            </nut-form-item>
            <nut-form-item label="备注">
              <nut-input v-model="checklistAdd.remark" placeholder="请输入备注" />
            </nut-form-item>
          </nut-form>
          <nut-checkbox-group ref="group" v-model="itemValue" @change="ChangeItem">
            <nut-checkbox v-for="item in allChecklistItems" :key="item.id" :label="item.id"
              >{{ item.checklistItemName }}
            </nut-checkbox>
          </nut-checkbox-group>
          <nut-checkbox-group ref="group" v-model="value" @change="onChange">
            <nut-checkbox v-for="item in allFiles" :key="item.id" :label="item.id"
              >{{ item.fileName }}
            </nut-checkbox>
          </nut-checkbox-group>
          <nut-picker :columns="columns" title="部门选择" @confirm="onConfirm"></nut-picker>
          <nut-button type="success" @click="savaAction">保存</nut-button>
          <nut-button type="primary" @click="isEditChecklist = false">返回</nut-button>
        </view>
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>
<script setup>
  import ChecklistItem from './ChecklistItem.vue'
  import { getDataItems } from '../../api/modules/dataitem'
  import { getFiles } from '../../api/modules/file'
  import { getChecklistItems } from '../../api/modules/checklistitem'
  import { addChecklist, getChecklists, deleteChecklist } from '../../api/modules/checklist'
  const state = reactive({
    tab11value: '0'
  })
  const isEditChecklist = ref(false)
  const group = null
  const itemGroup = null
  const value = ref([])
  const itemValue = ref([])
  // 新增的时候的数据结构，其他的都要转换成对应的格式
  const checklistAdd = reactive({
    name: '',
    deptId: 0,
    remark: '',
    filesIds: '',
    checklistItemsIds: ''
  })
  const allDepts = reactive([])
  const allFiles = ref([])
  const allChecklistItems = ref([])
  onMounted(() => {
    // 获取所有部门，所有文件，所有的检查单项
    getDataItems().then((res) => {
      // console.log(res.data.data.content, '数据项')
      allDepts.value = res.data.data.content.filter((item) => item.type === 3)
      console.log(allDepts.value, '部门')
      columns.value = allDepts.value.map((item) => {
        return { text: item.value, value: item.id }
      })
    })
    getFiles().then((res) => {
      allFiles.value = res.data.data.content
      console.log(allFiles.value, '文件我的')
    })
    getChecklistItems().then((res) => {
      allChecklistItems.value = res.data.data.content
      console.log(allChecklistItems.value, '检查单项')
    })
    getAllCheclist()
  })
  const getAllCheclist = () => {
    getChecklists().then((res) => {
      allItems.value = res.data.data.content
      console.log(allItems.value, '检查单')
    })
  }
  const allItems = ref([])
  // 和单选相关的
  const columns = ref([
    { text: '南京市', value: 'NanJing' },
    { text: '无锡市', value: 'WuXi' },
    { text: '海北藏族自治区', value: 'ZangZu' },
    { text: '北京市', value: 'BeiJing' },
    { text: '连云港市', value: 'LianYunGang' },
    { text: '浙江市', value: 'ZheJiang' },
    { text: '江苏市', value: 'JiangSu' }
  ])

  const onConfirm = ({ selectedValue, selectedOptions }) => {
    console.log(Number(selectedValue.toString()), '选择的项')
    // 把部门的id赋值给新增的数据结构
    checklistAdd.deptId = Number(selectedValue.toString())
  }
  function onChange(value) {
    checklistAdd.filesIds = toRaw(value).join(',')
    console.log(checklistAdd.filesIds, '选择的文件')
  }
  function ChangeItem(value) {
    checklistAdd.checklistItemsIds = toRaw(value).join(',')
    console.log(checklistAdd.checklistItemsIds, '选择的检查单项')
  }
  const savaAction = () => {
    console.log(checklistAdd, '新增的数据')
    addChecklist(
      checklistAdd.name,
      checklistAdd.deptId,
      checklistAdd.remark,
      checklistAdd.filesIds,
      checklistAdd.checklistItemsIds
    ).then((res) => {
      console.log(res, '新增成功')
      isEditChecklist.value = false
      getAllCheclist()
    })
  }
  const deleteAction = (id) => {
    deleteChecklist(id).then((res) => {
      console.log(res, '删除成功')
      getAllCheclist()
    })
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
