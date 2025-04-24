<template>
  <view class="login-container">
    <view class="logo-area">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="app-name">民航质量管理系统</text>
    </view>

    <view class="form-area">
      <view class="input-item">
        <text class="input-label">账号</text>
        <input
          class="input-field"
          type="text"
          v-model="username"
          placeholder="请输入账号"
          placeholder-class="placeholder"
        />
      </view>

      <view class="input-item">
        <text class="input-label">密码</text>
        <input
          class="input-field"
          type="password"
          v-model="password"
          placeholder="请输入密码"
          placeholder-class="placeholder"
        />
      </view>

      <button class="login-btn" :disabled="isLoading" @click="handleLogin">
        {{ isLoading ? '登录中...' : '登 录' }}
      </button>
    </view>

    <view class="footer">
      <text class="copyright">© 2025 企业管理系统 版权所有</text>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  // 表单数据
  const username = ref('')
  const password = ref('')
  const isLoading = ref(false)

  // 登录处理
  const handleLogin = () => {
    // 校验账号密码非空
    if (!username.value.trim()) {
      uni.showToast({
        title: '请输入账号',
        icon: 'none'
      })
      return
    }

    if (!password.value.trim()) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }

    // 设置加载状态
    isLoading.value = true

    // 模拟登录请求
    setTimeout(() => {
      // 登录成功，存储登录状态
      uni.setStorageSync('isLoggedIn', true)
      uni.setStorageSync('userInfo', {
        username: username.value
        // 其他用户信息...
      })

      // 显示成功提示
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转到首页
      setTimeout(() => {
        // 跳转到 tabbar 首页
        uni.switchTab({
          url: '/pages/interaction/Audit'
        })

        // 重置加载状态
        isLoading.value = false
      }, 1500)
    }, 1000)
  }
</script>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 40rpx;
    background-color: #f8f8f8;
  }

  .logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80rpx;
    margin-bottom: 80rpx;
  }

  .logo {
    width: 180rpx;
    height: 180rpx;
  }

  .app-name {
    margin-top: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }

  .form-area {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 40rpx 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  .input-item {
    margin-bottom: 30rpx;
  }

  .input-label {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
  }

  .input-field {
    width: 100%;
    height: 90rpx;
    border: 1px solid #e0e0e0;
    border-radius: 8rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    background-color: #f9f9f9;
  }

  .placeholder {
    color: #999;
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #2979ff;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    margin-top: 50rpx;
  }

  .login-btn:active {
    background-color: #2569e0;
  }

  .login-btn[disabled] {
    background-color: #8eb9ff;
  }

  .footer {
    margin-top: auto;
    padding: 30rpx 0;
    text-align: center;
  }

  .copyright {
    font-size: 24rpx;
    color: #999;
  }
</style>
