<template>
  <!-- :disabled="formDisabled || !isEdit" -->
  <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" class="formData">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formData.title" type="textarea" placeholder="请输入题目" autocomplete="off" />
    </el-form-item>
    <el-form-item label="分类" prop="classify_id">
      <el-select v-model="formData.classify_id" class="m-2" placeholder="请选择分类">
        <el-option v-for="item in classify" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="formData.author" placeholder="请输入题目作者" autocomplete="off" />
    </el-form-item>
    <el-form-item label="公司" prop="company">
      <el-input v-model="formData.company" placeholder="请输入题目来源" autocomplete="off" />
    </el-form-item>
    <el-form-item label="答案" prop="answer">
      <el-input
        v-model="formData.answer"
        placeholder="请输入题目答案或者上传markdown文件"
        type="textarea"
        autocomplete="off"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref, defineExpose, defineEmits, defineProps } from "vue"
import type { FormInstance } from "element-plus"
import { ElMessage } from "element-plus"
import { getAllClassify, ClassifyType } from "@/api/classify"
import { createTopic, CreateTopicType } from "@/api/topic"

const props = defineProps({
  isEdit: {
    type: Boolean
  },
  classify: {
    type: Object
  }
})

const emit = defineEmits(["createSuccess"])

const formDisabled = ref(true)
const ruleFormRef = ref<FormInstance>()
const formData = reactive<CreateTopicType>({
  title: "",
  classify_id: undefined,
  company: "",
  author: "",
  answer: "",
  mdurl: ""
})

// 获取分类
console.log("form-->", props?.classify)
console.log("form-->", props?.classify?.value)
const classify: Ref<ClassifyType[]> = ref([])
const getClassify = async () => {
  const result = await getAllClassify()
  console.log("getClassify", result)
  classify.value = result.data
}

if (!props.classify) {
  getClassify()
} else {
  classify.value = props.classify as any
}

// 校验 标题
const validateTitle = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the title"))
  } else {
    // 是否包含 特殊字符
    if (value.includes("script")) {
      callback(new Error("包含特殊字符"))
    }
    callback()
  }
}

// 校验规则
const rules = reactive({
  title: [{ validator: validateTitle, trigger: "blur" }]
})

// 调用接口创建题目
const generateTopic = async (data: CreateTopicType) => {
  const result = await createTopic(data)
  console.log("generateTopic", result)
  emit("createSuccess")
}

// 提交事件
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!", formData.title)
      generateTopic(formData)
    } else {
      console.log("error submit!")
      return false
    }
  })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 分发事件，父组件调用
const distribute = (flag: boolean) => {
  if (formDisabled.value) {
    ElMessage.error("请先启用编辑")
    return
  }
  flag ? submitForm(ruleFormRef.value) : resetForm(ruleFormRef.value)
}

const enableEdit = () => {
  formDisabled.value = false
}

defineExpose({ distribute, enableEdit })
</script>
