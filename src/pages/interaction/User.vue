<template>
  <view v-if="!isEidtUser">
    <view>
      <nut-button type="success" @click="isEidtUser = true">新增用户</nut-button>
    </view>
    <view class="h-full">
      <view v-for="user in allUsers" :key="user.id">
        <nut-cell-group :title="user.username">
          <nut-button type="info" @click="editAction(user)">修改</nut-button>
          <nut-button type="danger" @click="deleteAction(user.id)">删除</nut-button>
          <nut-cell title="邮箱" :desc="user.email"></nut-cell>
          <nut-cell title="密码" :desc="user.passwd"></nut-cell>
          <nut-cell title="部门" :desc="user.department.value"></nut-cell>
        </nut-cell-group>
      </view>
    </view>
  </view>
  <view v-if="isEidtUser">
    <nut-form>
      <nut-form-item label="用户名">
        <nut-input v-model="currentUserAdd.username" placeholder="请输入用户名" />
      </nut-form-item>
      <nut-form-item label="邮箱">
        <nut-input v-model="currentUserAdd.email" placeholder="请输入邮箱" />
      </nut-form-item>
      <nut-form-item label="密码">
        <nut-input v-model="currentUserAdd.passwd" placeholder="请输入密码" />
      </nut-form-item>
      <nut-picker :columns="columns" title="部门" @confirm="onConfirmDept"></nut-picker>
    </nut-form>
    <nut-button type="success" @click="saveUser">保存</nut-button>
    <nut-button type="success" @click="updateAction">修改</nut-button>
    <nut-button type="danger" @click="isEidtUser = false">取消</nut-button>
  </view>
</template>

<script lang="ts" setup>
  import { getUsers, deleteUser, addUser, updataUser } from '../../api/modules/user'
  import { getDataItems } from '../../api/modules/dataitem'
  const isEidtUser = ref(false)
  const allUsers = ref([])
  const getAllUsers = () => {
    getUsers().then((res) => {
      console.log(res.data.data)
      allUsers.value = res.data.data.content
    })
  }
  const deleteAction = (id) => {
    console.log(id, '删除id')
    deleteUser(id).then((res) => {
      console.log(res)
      getAllUsers()
    })
  }
  const currentUserId = ref(0)
  const editAction = (user) => {
    currentUserId.value = user.id
    isEidtUser.value = true
    currentUserAdd.username = user.username
    currentUserAdd.email = user.email
    currentUserAdd.passwd = user.passwd
    // 部门不操作
    console.log(user)
  }
  onMounted(() => {
    getAllUsers()
    // 获取所有的数据项
    getDataItems().then((res) => {
      const depts = res.data.data.content.filter((item) => item.type === 3)
      const newDepts = depts.map((item) => {
        return {
          text: item.value,
          value: item.id
        }
      })
      columns.value = newDepts
      console.log(depts)
    })
  })
  const columns = ref([
    {
      text: '技术部',
      value: 74
    },
    {
      text: '市场部',
      value: 74
    },
    {
      text: '行政部',
      value: 74
    }
  ])
  const currentUserAdd = reactive({
    username: '',
    email: '',
    passwd: '',
    deptId: 0
  })
  const onConfirmDept = ({ selectedValue, selectedOptions }) => {
    // 这里是给对应的部门id赋值
    console.log(Number(selectedValue.toString()))
    currentUserAdd.deptId = Number(selectedValue.toString())
  }
  const saveUser = () => {
    console.log(currentUserAdd.username)
    addUser(
      currentUserAdd.username,
      currentUserAdd.email,
      currentUserAdd.passwd,
      currentUserAdd.deptId
    ).then((res) => {
      console.log(res, '新增成功')
      isEidtUser.value = false
      getAllUsers()
    })
  }
  const updateAction = () => {
    updataUser(
      currentUserId.value,
      currentUserAdd.username,
      currentUserAdd.email,
      currentUserAdd.passwd,
      currentUserAdd.deptId
    ).then((res) => {
      console.log(res, '修改成功')
      isEidtUser.value = false
      getAllUsers()
    })
  }
</script>
