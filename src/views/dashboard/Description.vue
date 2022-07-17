<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>关于项目</span>
      </div>
    </template>
    <p>
      一个免费开源的中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element-Plus、Pinia 和 Vite 等主流技术.
      模板代码是从 v3-admin 迁移而来，脚手架从 Vue-Cli 5.x 切换到了 Vite 2.9.x，并作了一些繁琐的适配.
    </p>
    <p>
      V3-Admin-Vite 中文文档:
      <a target="_blank" href="https://juejin.cn/post/7089377403717287972"
        >https://juejin.cn/post/7089377403717287972</a
      >
    </p>
    <p>
      V3-Admin-Vite GitHub:
      <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">https://github.com/un-pany/v3-admin-vite</a>
    </p>
  </el-card>

  <el-card class="box-card" v-for="(item, index) in list" :key="index">
    <template #header>
      <div class="card-header">
        <span>{{ item.title }}</span>
      </div>
    </template>
    <div class="card-content">
      <div class="card-item" v-for="(value, key, index) in item.list" :key="index">
        <span class="key center">{{ key }}</span>
        <span class="value center">{{ value }}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import pkg from "/package.json"

const list = computed(() => {
  const res: any = [
    {
      title: "开发环境依赖",
      list: pkg.devDependencies
    },
    {
      title: "生产环境依赖",
      list: pkg.dependencies
    }
  ]

  return res
})
</script>

<style lang="scss">
.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  display: flex;
  flex-wrap: wrap;

  .card-item {
    display: flex;
    background-color: aqua;
    border: 1px solid #eee;
    margin-bottom: 5px;
    margin-right: 20px;
    .key {
      width: 250px;
      height: 50px;
      background-color: #eee;
      border-bottom: 1px solid #f8f8f8;
      border-right: 1px solid #f8f8f8;
    }
    .value {
      width: 100px;
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #f8f8f8;
      border-right: 1px solid #f8f8f8;
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
