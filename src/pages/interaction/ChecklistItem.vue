<template>
  <view v-if="!isEditItem">
    <view>
      <nut-button type="success" @click="isEditItem = true">新增项</nut-button>
    </view>
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
  </view>

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
      <nut-checkbox v-for="item in files" :key="item.id" :label="item.id"
        >{{ item.fileName }}
      </nut-checkbox>
    </nut-checkbox-group>
    <nut-button type="success" @click="saveAction">保存</nut-button>
    <nut-button type="danger" @click="isEditItem = false && getAll()">取消</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import type { CheckboxGroupInst } from 'nutui-uniapp'
  import {
    getChecklistItems,
    addChecklistItem,
    deleteChecklistItem
  } from '../../api/modules/checklistitem'
  import { getFiles } from '../../api/modules/file'
  const isEditItem = ref(false)
  const selectedFiles = ref([])
  //所有的文件
  const files = ref([])
  // 定义了所有项的数据结构
  const allItems = ref([
    {
      id: 1,
      checklistItemName: '检查项1',
      checklistItemContent: '检查项1的内容',
      checklistItemFiles: [
        {
          id: 1,
          fileName: '第一个文件',
          filePath: '第二个文件'
        },
        {
          id: 2,
          fileName: '第二个文件',
          filePath: '第二个文件'
        }
      ],
      checklistItemRemark: '检查项1的备注'
    },
    {
      id: 2,
      checklistItemName: '检查项2',
      checklistItemContent: '检查项2的内容',
      checklistItemFiles: [
        {
          id: 1,
          fileName: '第一个文件',
          filePath: '第二个文件'
        }
      ],
      checklistItemRemark: '检查项2的备注'
    }
  ])
  const getAll = () => {
    getChecklistItems().then((res) => {
      allItems.value = res.data.data.content
    })
  }
  const checklistItemCons = reactive({
    checklistItemName: '',
    checklistItemContent: '',
    checklistItemFilesIds: [],
    checklistItemRemark: ''
  })
  const saveAction = () => {
    console.log(checklistItemCons, '打印输出对象')
    addChecklistItem(
      checklistItemCons.checklistItemName,
      checklistItemCons.checklistItemContent,
      checklistItemCons.checklistItemFilesIds,
      checklistItemCons.checklistItemRemark
    ).then((res) => {
      console.log(res)
      isEditItem.value = false
      getAll()
    })
  }
  const deleteAction = (id) => {
    deleteChecklistItem(id).then((res) => {
      console.log(res)
      getAll()
    })
  }
  onMounted(() => {
    getAll()
    getFiles().then((res) => {
      files.value = res.data.data.content
      console.log(files.value)
    })
  })
  // 多选的框
  const group = ref<CheckboxGroupInst | null>(null)

  const value = ref([])

  function onChange(value: any[]) {
    console.log(toRaw(value))
    checklistItemCons.checklistItemFilesIds = toRaw(value).join(',')
  }
</script>
