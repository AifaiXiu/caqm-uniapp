<template>
  <view class="h-full">
    <nut-button type="success" @click="addAction">新增文件</nut-button>
    <view v-for="file in files" :key="file.id">
      <nut-cell :title="file.fileName">
        <template #link>
          <nut-button type="danger" @click="deleteAction(file.id)">删除</nut-button>
          <nut-button type="success" @click="downloadFile(file.filePath)">下载</nut-button>
        </template>
      </nut-cell>
    </view>
  </view>
</template>
<script lang="ts" setup>
  import { getFiles, deleteFile } from '../../api/modules/file'

  const files = ref([
    { id: 1, fileName: 'test1', filePath: '/aihua/666' },
    { id: 2, fileName: 'test2', filePath: '/aihua/666' }
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
    uni.navigateTo({
      url: './FileAdd'
    })
  }
  onMounted(() => {
    getALL()
  })
  // 下载文件并打开
  const downloadFile = (filePath) => {
    const downloadUrl = `http://152.136.166.253:8080/upload/file?filePath=${encodeURIComponent(filePath)}`

    console.log('发起下载请求:', downloadUrl)

    wx.downloadFile({
      url: downloadUrl,
      success: (res) => {
        console.log('下载请求成功:', res.tempFilePath)
        // 调用 wx.openDocument 进行文件预览
        wx.openDocument({
          filePath: res.tempFilePath,
          success: (openRes) => {
            console.log('文档打开成功', openRes)
          },
          fail: (openErr) => {
            console.error('文档打开失败', openErr)
            uni.showToast({
              title: '文档打开失败',
              icon: 'none'
            })
          }
        })

        if (res.statusCode === 200) {
          // 使用临时路径进行处理，而不保存到永久存储，这样避免占用空间
          uni.showToast({
            title: '文件下载成功，暂时保存于: ' + res.tempFilePath,
            icon: 'success'
          })
        } else {
          console.error('下载请求失败，状态码:', res.statusCode)
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('下载请求失败:', err)
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    })
  }
</script>
<style scoped></style>
