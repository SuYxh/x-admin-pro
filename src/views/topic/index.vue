<template>
  <div class="all-topic">
    <el-input class="search" v-model="search" size="large" placeholder="Type to search" />

    <el-table :data="filterTableData" style="width: 100%">
      <!-- type="index" 表示 序号 -->
      <el-table-column type="index" width="50" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="分类" prop="classify_id" width="150">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag class="ml-2" :type="randomItem()">{{ handleClassify(scope.row.classify_id) }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author" width="100" />
      <el-table-column label="公司" prop="company" width="100" />
      <el-table-column label="浏览" prop="view" width="70" />
      <el-table-column label="点赞" prop="like" width="70" />
      <el-table-column label="收藏" prop="collect" width="70" />
      <el-table-column align="right">
        <template #header>
          <el-button round :icon="Plus" link type="primary" @click="addNewTopic">新增</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <TopicPanel ref="topicPanel" :isEdit="isEdit" :classify="classify" @refreshTable="refreshTable" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Plus } from "@element-plus/icons-vue"
import { Topic, getAllTopic } from "@/api/topic"
import { getAllClassify, ClassifyType } from "@/api/classify"
import TopicPanel from "./component/TopicPanel.vue"
import type { TagProps } from "element-plus"
type TagType = TagProps["type"]

const isEdit = ref<boolean>(false)

// ref
const topicPanel = ref(null)

// 获取分类
const classify: Ref<ClassifyType[]> = ref([])
const getClassify = async () => {
  const result = await getAllClassify()
  console.log("getClassify", result)
  classify.value = result.data
}

getClassify()

// 处理表格的分类
const tagTypeList: TagType[] = ["", "danger", "info", "success", "warning"]
const randomItem = () => tagTypeList[(Math.random() * tagTypeList.length) | 0]
const handleClassify = (id: number) => {
  const result = classify.value.filter((item) => item.id === id)?.[0]
  return result.title
}

// 获取 topic
const tableData: Ref<Topic[]> = ref([])
const getTopics = async () => {
  const result = await getAllTopic()
  tableData.value = result.data
}
getTopics()

// 刷新表格
const refreshTable = () => {
  getTopics()
}

// 搜索过滤
const search = ref("")
const filterTableData = computed(() =>
  tableData.value.filter((data) => !search.value || data.title.toLowerCase().includes(search.value.toLowerCase()))
)

// 新增
const addNewTopic = () => {
  isEdit.value = false
  ;(topicPanel.value as any).toggle(true)
}

// 编辑事件
const handleEdit = (index: number, row: Topic) => {
  console.log(index, row)
  isEdit.value = true
  ;(topicPanel.value as any).toggle(true)
}

// 删除事件
const handleDelete = (index: number, row: Topic) => {
  console.log(index, row)
  openMessageBox()
}

// 删除提示
const openMessageBox = () => {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed"
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled"
      })
    })
}
</script>

<style lang="scss" scoped>
.all-topic {
  padding: 20px;

  .search {
    margin-bottom: 20px;
  }
}
</style>
