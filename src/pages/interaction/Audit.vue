<template>
  <view class="interaction h-full">
    <scroll-view
      :refresher-triggered="isRefreshing"
      refresher-enabled
      scroll-y
      style="height: 100%"
      @refresherrefresh="onRefresh"
    >
      <nut-button type="success" @click="navTo">新增</nut-button>
      <view v-for="item in audits" :key="item.id">
        <nut-cell-group :title="item.name">
          <nut-button type="danger" @click="deleteAction(item.id)">删除</nut-button>
          <nut-button type="info" @click="editAction(item.id)">编辑</nut-button>
          <nut-button type="info" @click="doAuditAction(item.checklists)">审计</nut-button>
          <nut-cell
            :desc="item.dept == null ? '暂未选择' : item.dept.value"
            title="部门"
          ></nut-cell>
          <nut-cell
            :desc="item.process == null ? '暂未选择' : item.process.value"
            title="流程"
          ></nut-cell>
          <nut-cell
            :desc="item.mainAuditor == null ? '暂未选择' : item.mainAuditor.username"
            title="主审人"
          ></nut-cell>
          <nut-cell
            :desc="item.plannedStartDate == null ? '暂未选择' : item.plannedStartDate"
            title="计划开始时间"
          ></nut-cell>
          <nut-cell
            :desc="item.realStartDate == null ? '暂未开始' : item.realStartDate"
            title="实际开始时间"
          ></nut-cell>
          <nut-cell
            :desc="item.airport == null ? '暂未选择' : item.airport.value"
            title="机场"
          ></nut-cell>
          <nut-cell
            :desc="item.auditMethodId == null ? '暂未选择' : item.auditMethodId.value"
            title="审计方法"
          ></nut-cell>
          <nut-cell :desc="item.status == 0 ? '开启' : '关闭'" title="状态"></nut-cell>
          <nut-cell
            :desc="item.closeUser == null ? '暂未关闭' : item.closeUser.username"
            title="关闭人"
          ></nut-cell>
          <nut-cell :desc="item.remark == null ? '' : item.remark" title="备注"></nut-cell>
          <nut-cell :desc="item.summary == '' ? '暂无' : item.summary" title="总结信息"></nut-cell>
          <nut-cell title="检擦单">
            <view v-for="item in item.checklists" :key="item.id">
              <nut-tag round type="primary">{{ item.name }}</nut-tag>
            </view>
          </nut-cell>
          <nut-cell title="其他审计人">
            <view v-for="item in item.otherAuditors" :key="item.id">
              <nut-tag round type="primary">{{ item.username }}</nut-tag>
            </view>
          </nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { deleteAudit, getAudits } from '../../api/modules/audit'

  const audits = ref([])
  const isRefreshing = ref(false)

  const navTo = () => {
    uni.navigateTo({
      url: './AuditAdd'
    })
  }
  const caculateStatus = (status) => {
    if (status === 0) {
      return '计划'
    } else if (status === 1) {
      return '执行'
    } else if (status === 2) {
      return '取消'
    } else if (status === 3) {
      return '待关闭'
    } else {
      return '已关闭'
    }
  }
  // 初始化加载
  onMounted(() => {
    loadAudits()
  })

  // 下拉刷新
  const onRefresh = () => {
    isRefreshing.value = true
    loadAudits().finally(() => {
      setTimeout(() => (isRefreshing.value = false), 1000)
    })
  }

  // 加载数据
  const loadAudits = async () => {
    const res = await getAudits()
    audits.value = res.data.data.content
  }

  const deleteAction = (id) => {
    deleteAudit(id).then((res) => {
      console.log(res, '删除成功')
      loadAudits()
    })
  }

  const editAction = (id) => {
    uni.navigateTo({ url: './AuditEdit?id=' + id })
  }
  const doAuditAction = (checklists) => {
    const itemIds = Array.from(
      new Set(
        checklists
          .flatMap((item) => item.checklistItemsIds.split(',')) // 将每个字符串按逗号分割为数组
          .map((id) => id.trim()) // 去除可能的空格
      )
    ).join(',')
    uni.navigateTo({ url: './DoAuditList?itemIds=' + itemIds })
    console.log(itemIds, 'itemIds')
  }
</script>

<style>
  .interaction {
    box-sizing: border-box;
    padding: 16rpx;
  }

  scroll-view {
    height: 100%;
  }
</style>
