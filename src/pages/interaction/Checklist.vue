<template>
  <view class="interaction h-full">
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      style="height: 100%"
    >
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
            <nut-checkbox-group v-model="value" @change="onChange">
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
    </scroll-view>
  </view>
</template>

<script setup>
  import ChecklistItem from './ChecklistItem.vue'
  import { reactive, ref, toRaw, onMounted } from 'vue'
  import { getFiles } from '../../api/modules/file'
  import { getChecklistItems } from '../../api/modules/checklistitem'
  import { addChecklist, getChecklists, deleteChecklist } from '../../api/modules/checklist'
  import { getDataItems } from '../../api/modules/dataitem'

  // 状态管理
  const state = reactive({
    tab11value: '0'
  })
  const isEditChecklist = ref(false)

  // 下拉刷新标记
  const isRefreshing = ref(false)

  // 表单数据
  const checklistAdd = reactive({
    name: '',
    deptId: 0,
    remark: '',
    filesIds: '',
    checklistItemsIds: ''
  })

  // 数据集合
  const allDepts = ref([])
  const allFiles = ref([])
  const allChecklistItems = ref([])
  const allItems = ref([])
  const columns = ref([])

  // 页面初始化加载
  onMounted(() => {
    loadData()
  })

  // 加载所有数据
  const loadData = () => {
    Promise.all([fetchDataItems(), fetchFiles(), fetchChecklistItems(), fetchChecklists()])
  }

  // 加载检查单详情和其他数据
  const fetchDataItems = async () => {
    const res = await getDataItems()
    allDepts.value = res.data.data.content.filter((item) => item.type === 3)
    columns.value = allDepts.value.map((dept) => ({
      text: dept.value,
      value: dept.id
    }))
  }

  const fetchFiles = async () => {
    const res = await getFiles()
    allFiles.value = res.data.data.content
  }

  const fetchChecklistItems = async () => {
    const res = await getChecklistItems()
    allChecklistItems.value = res.data.data.content
  }

  const fetchChecklists = async () => {
    const res = await getChecklists()
    allItems.value = res.data.data.content
  }

  // 下拉刷新
  const onRefresh = () => {
    isRefreshing.value = true
    Promise.all([fetchFiles(), fetchChecklistItems(), fetchChecklists()])
      .catch((error) => {
        console.error('刷新失败:', error)
      })
      .finally(() => {
        setTimeout(() => {
          isRefreshing.value = false
        }, 1000)
      })
  }

  // 操作方法
  const onConfirm = ({ selectedValue }) => {
    checklistAdd.deptId = Number(selectedValue)
  }

  const onChange = (value) => {
    checklistAdd.filesIds = toRaw(value).join(',')
  }

  const ChangeItem = (value) => {
    checklistAdd.checklistItemsIds = toRaw(value).join(',')
  }

  const savaAction = async () => {
    const res = await addChecklist(
      checklistAdd.name,
      checklistAdd.deptId,
      checklistAdd.remark,
      checklistAdd.filesIds,
      checklistAdd.checklistItemsIds
    )
    console.log('保存成功:', res)
    isEditChecklist.value = false
    await fetchChecklists()
  }

  const deleteAction = async (id) => {
    const res = await deleteChecklist(id)
    console.log('删除成功:', res)
    await fetchChecklists()
  }
</script>

<style lang="scss" scoped>
  :deep(.nut-tabs) {
    height: 100%;

    .nut-tabs__content {
      height: calc(100% - var(--window-bottom));
    }
  }
  scroll-view {
    height: 100%;
  }
  .nut-button {
    margin: 10rpx 0;
  }
</style>
