<template>
  <div class="drawer-wrap">
    <el-drawer v-model="drawer" direction="rtl" :before-close="handleClose" size="60%" :show-close="false">
      <template #title>
        <div class="drawer-header">
          <h4>TopicPanel</h4>
          <el-button v-if="isEdit" round @click="startEdit()">开启编辑</el-button>
        </div>
      </template>
      <template #default>
        <div>
          <TopicForm ref="topicForm" :classify="classify" @createSuccess="createSuccess" />
        </div>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick('cancel')">关闭</el-button>
          <el-button @click="cancelClick('reset')">重置</el-button>
          <el-button type="primary" @click="confirmClick">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, defineEmits, defineProps } from "vue"
import { ElMessageBox } from "element-plus"
import TopicForm from "./TopicForm.vue"

defineProps({
  isEdit: {
    type: Boolean
  },
  classify: {
    type: Object
  }
})
const emit = defineEmits(["refreshTable"])

const topicForm = ref(null)

// drawer 开关标识
const drawer = ref(false)

// 关闭前的回调
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// 题目创建成功事件
function createSuccess() {
  // 1、刷新列表
  emit("refreshTable")
  // 2、关闭抽屉
  drawer.value = false
}

// 开启表单编辑
function startEdit() {
  ;(topicForm.value as any).enableEdit()
}

// 取消
function cancelClick(flag: string) {
  if (flag === "cancel") {
    drawer.value = false
    return
  }
  // 重置表单
  ;(topicForm.value as any).distribute(false)
}

// 确认事件
function confirmClick() {
  ;(topicForm.value as any).distribute(true)
  // ElMessageBox.confirm(`Are you confirm to chose darwer ?`)
  //   .then(() => {
  //     drawer.value = false
  //   })
  //   .catch(() => {
  //     // catch error
  //   })
}

// drawer 开关事件
const toggle = (flag: boolean) => {
  console.log("toggle", flag)
  drawer.value = flag
}

// 供父组件调用
defineExpose({ toggle })
</script>

<style lang="scss" scoped>
.drawer-wrap ::v-deep .el-drawer__header {
  margin-bottom: 0;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
