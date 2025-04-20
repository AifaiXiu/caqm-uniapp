<template>
  <view class="h-full">
    <nut-button type="primary" @click="addAction">新增文件</nut-button>
    <view class="w-20 h-20 bg-green" @click="chooseMyFile">点击上传文件</view>
    <nut-input v-model="fileName" placeholder="请输入文件名"></nut-input>
    <view v-for="file in files" :key="file.id">
      <nut-cell :title="file.fileName">
        <template #link>
          <nut-button type="danger" @click="deleteAction(file.id)">删除</nut-button>
        </template>
      </nut-cell>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { getFiles, deleteFile, addFile } from '../../api/modules/file'
  const fileName = ref('')
  const filePath = ref('/aihua/666')
  const uploadUrl = ref('http://localhost:8080/upload/file')
  const files = ref([
    {
      id: 1,
      fileName: 'test1',
      filePath: '/aihua/666'
    },
    {
      id: 2,
      fileName: 'test2',
      filePath: '/aihua/666'
    }
  ])
  const getALL = () => {
    getFiles().then((res) => {
      files.value = res.data.data.content
      console.log(files.value)
    })
  }
  const deleteAction = (id) => {
    deleteFile(id).then((res) => {
      getALL()
    })
  }
  const addAction = () => {
    addFile(fileName.value, filePath.value).then((res) => {
      getALL()
    })
  }
  onMounted(() => {
    getALL()
  })
  const chooseMyFile = () => {
    uni.chooseFile({
      count: 1, // 允许选择1个文件
      success: (res) => {
        const file = res.tempFiles[0]
        uploadFile(file)
      },
      fail: (err) => {
        console.error('选择文件失败:', err)
      }
    })
  }
  const uploadFile = (file) => {
    // 2. 上传文件
    uni.uploadFile({
      url: 'http://localhost:8080/upload/file', // 替换为你的后端地址
      filePath: file.path, // 文件临时路径
      name: 'file', // 必须和后端 @RequestParam("file") 一致
      formData: {}, // 可附加其他表单数据
      success: (uploadRes) => {
        result.value = `上传成功: ${uploadRes.data}`
        console.log('服务器返回:', uploadRes.data)
      },
      fail: (uploadErr) => {
        result.value = '上传失败'
        console.error('上传失败:', uploadErr)
      }
    })
  }
</script>

<style scoped></style>
