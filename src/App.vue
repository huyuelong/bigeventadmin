<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores'

// 在 Vue3 CompositionAPI 中
// 1.获取路由对象 router  useRouter
//    const router = userRouter()
// 2.获取路由参数 route  useRoute
//    const route = userRoute()

const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('./list')
  console.log(router, route)
}

const userStore = useUserStore()
const countStore = useCountStore()
</script>

<template>
  <div>
    <router-view></router-view>
    <hr />
    <hr />
    <hr />
    我是App
  </div>
  <el-button @click="$router.push('/home')">跳首页</el-button>
  <el-button @click="goList">跳列表页</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('Bearer hdhdiuwefuhrufi')">
    登录
  </el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>

  <hr />
  {{ countStore.count }}
  <el-button @click="countStore.add(2)">加法</el-button>
</template>

<style scoped></style>
