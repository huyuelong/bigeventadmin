<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
const articleList = ref([]) //文章列表

const total = ref(0) //总条数

// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 基于params参数，获取文章列表
const getArticleList = async () => {
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList()

// 编辑逻辑
const onEditArticle = (row) => {
  console.log(row)
}

// 删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button>添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <!-- inline 一行显示 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- Vue2 => v-model :value 和 @input 的简写 -->
        <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false"> {{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cata_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽 row 可以获取当前行的数据 => v-for 遍历 item -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
