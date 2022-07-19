<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    :action="action"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-remove="beforeRemove"
    :limit="1"
    :on-exceed="handleExceed"
  >
    <el-button v-if="!fileList.length" type="primary">Click to upload</el-button>
  </el-upload>

  <!-- <el-image v-if="url" style="width: 100px; height: 100px" :src="url" fit="cover" /> -->
</template>
<script lang="ts" setup>
import { ref, defineEmits } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

import type { UploadProps, UploadUserFile } from "element-plus"

const action = ref(import.meta.env.VITE_BASE_API + "/upload")

const url = ref("")

const fileList = ref<UploadUserFile[]>([])

const emit = defineEmits(["uploadSuccess"])

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handleSuccess: UploadProps["onSuccess"] = (response) => {
  url.value = response.result
  emit("uploadSuccess", url.value)
}

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  )
}
</script>
