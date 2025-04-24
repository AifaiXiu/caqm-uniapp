<template>
  <view>
    <!-- 非编辑模式显示的内容 -->
    <view v-if="!isEditItem">
      <scroll-view
        scroll-y
        refresher-enabled
        :refresher-triggered="isRefreshing"
        @refresherrefresh="onRefresh"
        style="height: 100%"
      >
        <nut-button type="success" @click="isEditItem = true">新增项</nut-button>
        <view class="h-full" v-for="item in allItems" :key="item.id">
          <nut-cell-group :title="item.checklistItemName">
            <nut-button type="danger" @click="deleteAction(item.id)">删除</nut-button>
            <nut-cell title="项内容" :desc="item.checklistItemContent"></nut-cell>
            <nut-cell title="备注" :desc="item.checklistItemRemark"></nut-cell>
            <nut-cell title="参考文件">
              <view v-for="file in item.checklistItemFiles" :key="file.id">
                <nut-tag type="primary" round>{{ file.fileName }}</nut-tag>
              </view>
            </nut-cell>
          </nut-cell-group>
        </view>
      </scroll-view>
    </view>

    <!-- 编辑模式显示的内容 -->
    <view v-if="isEditItem">
      <nut-form>
        <nut-form-item label="项名称">
          <nut-input v-model="checklistItemCons.checklistItemName" placeholder="请输入项名称" />
        </nut-form-item>
        <nut-form-item label="项内容">
          <nut-input v-model="checklistItemCons.checklistItemContent" placeholder="请输入项内容" />
        </nut-form-item>
        <nut-form-item label="备注">
          <nut-input v-model="checklistItemCons.checklistItemRemark" placeholder="请输入备注信息" />
        </nut-form-item>
      </nut-form>
      <nut-checkbox-group ref="group" v-model="value" @change="onChange">
        <nut-checkbox v-for="item in files" :key="item.id" :label="item.id">
          {{ item.fileName }}
        </nut-checkbox>
      </nut-checkbox-group>
      <nut-button type="success" @click="saveAction">保存</nut-button>
      <nut-button type="danger" @click="isEditItem = false && getAll()">取消</nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRaw, onMounted } from 'vue'
  import type { CheckboxGroupInst } from 'nutui-uniapp'
  import {
    getChecklistItems,
    addChecklistItem,
    deleteChecklistItem
  } from '../../api/modules/checklistitem'
  import { getFiles } from '../../api/modules/file'

  // 编辑模式标记
  const isEditItem = ref(false)

  // 下拉刷新标记
  const isRefreshing = ref(false)

  // 所有检查项数据
  const allItems = ref([])

  // 文件数据
  const files = ref([])

  // 表单数据
  const checklistItemCons = reactive({
    checklistItemName: '',
    checklistItemContent: '',
    checklistItemFilesIds: [],
    checklistItemRemark: ''
  })

  // 多选框绑定的值
  const value = ref([])

  // 获取检查项数据
  const getAll = async () => {
    const res = await getChecklistItems()
    allItems.value = res.data.data.content
  }

  // 获取文件数据
  const loadFiles = async () => {
    const res = await getFiles()
    files.value = res.data.data.content
  }

  // 保存新的检查项
  const saveAction = async () => {
    console.log('保存表单数据:', checklistItemCons)
    const res = await addChecklistItem(
      checklistItemCons.checklistItemName,
      checklistItemCons.checklistItemContent,
      checklistItemCons.checklistItemFilesIds,
      checklistItemCons.checklistItemRemark
    )
    console.log('保存成功:', res)
    isEditItem.value = false
    await getAll()
  }

  // 删除检查项
  const deleteAction = async (id: number) => {
    const res = await deleteChecklistItem(id)
    console.log('删除成功:', res)
    await getAll()
  }

  // 编辑模式下多选框的值变化
  function onChange(value: any[]) {
    console.log('选中的文件', toRaw(value))
    checklistItemCons.checklistItemFilesIds = toRaw(value).join(',')
  }

  // 下拉刷新函数
  const onRefresh = () => {
    isRefreshing.value = true
    Promise.all([getAll(), loadFiles()]).finally(() => {
      setTimeout(() => {
        isRefreshing.value = false // 下拉完成
      }, 1000)
    })
  }

  // 页面挂载时加载数据
  onMounted(() => {
    Promise.all([getAll(), loadFiles()])
  })
</script>

<style>
  .scroll-view {
    height: 100%;
    box-sizing: border-box;
    padding: 16rpx;
  }

  .nut-button {
    margin: 10rpx 0;
  }
</style>
