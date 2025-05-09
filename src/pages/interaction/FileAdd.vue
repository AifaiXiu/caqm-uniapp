<template>
  <view class="h-full">
    <view class="upload-box" @click="chooseMyFile">点击上传文件</view>
    <view class="file-info" v-if="selectedFile">
      已选：{{ selectedFile.name }}
      <view>大小：{{ selectedFile.size }} 字节</view>
      <view>路径：{{ selectedFile.path }}</view>
    </view>
    <nut-input v-model="fileName" placeholder="请输入文件名"></nut-input>
    <nut-button type="success" @click="addAction">上传</nut-button>
    <nut-button type="danger" @click="back()">返回</nut-button>

    <!-- 调试信息区域 -->
    <!-- <view class="debug-info" v-if="debugInfo">
      <text>{{ debugInfo }}</text>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { addFile } from '../../api/modules/file'

  const fileName = ref('')
  const filePath = ref('/aihua/666')
  const uploadUrl = ref('http://152.136.166.253:8080/upload/file')
  const selectedFile = ref(null)
  const debugInfo = ref('') // 用于显示调试信息

  // 调试日志函数
  const log = (message, obj = null) => {
    console.log(message, obj)
    debugInfo.value += message + (obj ? JSON.stringify(obj) : '') + '\n'

    // 如果日志太长，清理一下
    if (debugInfo.value.length > 1000) {
      debugInfo.value = debugInfo.value.substring(debugInfo.value.length - 1000)
    }
  }

  // 从微信聊天选择文件
  const chooseMyFile = () => {
    log('开始选择文件...')

    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success: (res) => {
        log('选择文件成功:', res)

        if (res.tempFiles && res.tempFiles.length > 0) {
          selectedFile.value = res.tempFiles[0]

          log('选择的文件详情:', selectedFile.value)

          // 如果未输入文件名，使用所选文件名
          if (!fileName.value) {
            fileName.value = selectedFile.value.name || '未命名文件'
            log('文件名自动设置为:', fileName.value)
          }
        }
      },
      fail: (err) => {
        log('选择文件失败:', err)
        uni.showToast({
          title: '选择文件失败',
          icon: 'none'
        })
      }
    })
  }

  // 上传文件并保存记录
  const addAction = () => {
    if (!selectedFile.value) {
      log('错误: 未选择文件')
      uni.showToast({
        title: '请先选择文件',
        icon: 'none'
      })
      return
    }

    if (!fileName.value) {
      log('错误: 未输入文件名')
      uni.showToast({
        title: '请输入文件名',
        icon: 'none'
      })
      return
    }

    log('开始上传文件...')
    log('上传URL:', uploadUrl.value)
    log('文件路径:', selectedFile.value.path)

    // 显示上传中
    uni.showLoading({
      title: '上传中...'
    })

    // 上传文件到服务器
    uni.uploadFile({
      url: uploadUrl.value,
      filePath: selectedFile.value.path,
      name: 'file', // 必须和后端 @RequestParam("file") 匹配
      formData: {}, // 可添加额外表单数据
      success: (uploadRes) => {
        uni.hideLoading()
        log('上传成功，状态码:', uploadRes.statusCode)
        log('服务器响应:', uploadRes.data)

        try {
          // 解析返回的JSON数据
          const result =
            typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data
          log('解析后的响应数据:', result)

          if (result.success) {
            // 上传成功，将返回的文件路径赋值给filePath
            filePath.value = result.filePath
            log('文件路径已更新为:', filePath.value)

            // 将文件信息保存到数据库
            log('开始保存文件信息至数据库...')
            log('文件名:', fileName.value)
            log('文件路径:', filePath.value)

            addFile(fileName.value, filePath.value)
              .then((res) => {
                log('保存到数据库成功:', res)
                uni.showToast({
                  title: '添加成功',
                  icon: 'success'
                })
                setTimeout(() => {
                  back()
                }, 1000)
              })
              .catch((err) => {
                log('保存到数据库失败:', err)
                uni.showToast({
                  title: '保存记录失败',
                  icon: 'none'
                })
              })
          } else {
            log('上传失败，服务器返回失败信息:', result.message || '未知错误')
            uni.showToast({
              title: '上传失败: ' + (result.message || '未知错误'),
              icon: 'none'
            })
          }
        } catch (e) {
          log('解析响应数据失败:', e)
          uni.showToast({
            title: '上传失败: 服务器响应解析错误',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        uni.hideLoading()
        log('上传请求失败:', err)
        uni.showToast({
          title: '上传失败: 网络错误',
          icon: 'none'
        })
      }
    })
  }

  // 返回上一页
  const back = () => {
    log('返回上一页')
    uni.navigateTo({ url: './File' })
  }
</script>

<style scoped>
  .h-full {
    padding: 20rpx;
  }

  .upload-box {
    width: 150rpx;
    height: 150rpx;
    background-color: #4caf50;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
  }

  .file-info {
    font-size: 28rpx;
    color: #666666;
    margin-bottom: 20rpx;
    word-break: break-all;
  }

  .debug-info {
    margin-top: 30rpx;
    padding: 10rpx;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    font-size: 24rpx;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 400rpx;
    overflow-y: auto;
  }
</style>
