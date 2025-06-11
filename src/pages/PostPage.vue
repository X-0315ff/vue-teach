<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElButton, ElInput,ElSkeleton } from 'element-plus'
import { createPostApi, listPostApi, updatePostApi } from '@/http/post.js'

const title = ref('')
const text = ref('')
const pageInfo = reactive({ page: 1, size: 5 })
const postList = ref([])
const editType = ref('add') // add
const updateId = ref(-1)
const isLoading = ref(false)
// 点击按钮
const handleBtn = () => {
  if (editType.value === 'add') {
    createPost()
  } else {
    updatePost()
  }
}
// 创建post;
const createPost = () => {
  createPostApi(title.value, text.value).then((res) => {
    pageInfo.page = 1
    postList.value = []
    getPostList()
  })
}
// 更新post
const updatePost = () => {
  updatePostApi({ id: updateId.value, title: title.value, text: text.value }).then(() => {
    let data = postList.value.find((item) => item.id === updateId.value)
    data.title = title.value
    data.text = text.value
    editType.value = 'add'
  })
}
// 删除post
const deletePost = () => {}
// 获取post列表
const getPostList = () => {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  listPostApi(pageInfo.page, pageInfo.size)
    .then((res) => {
      postList.value.push(...res)
      pageInfo.page = pageInfo.page + 1
    })
    .finally(() => {
      isLoading.value = false
    })
}
// 点击更新按钮
const handleUpdateBtn = (post) => {
  editType.value = 'update'
  title.value = post.title
  text.value = post.text
  updateId.value = post.id
}

onMounted(() => {
  getPostList()
})
</script>


<template>
  <div class="post-page">
    <div class="create-post">
      <div class="title">title</div>
      <el-input v-model="title" placeholder="请输入标题" />
      <div class="title">text</div>
      <el-input
        v-model="text"
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        placeholder="请输入内容"
      />
      <div class="footer">
        <el-button @click="handleBtn">{{ editType === 'add' ? 'create' : 'update' }}</el-button>
      </div>
    </div>
    <div class="list">
      <div class="title">post 列表</div>
      <div class="post" v-for="post in postList" :key="post.id">
        <div class="update">
          <span>title</span>
          <el-button @click="handleUpdateBtn(post)">update</el-button>
        </div>
        <div>{{ post.title }}</div>
        <div class="title">text</div>
        <div>{{ post.text }}</div>
      </div>
      <el-skeleton :rows="5" animated v-if="isLoading" />
    </div>

    <el-button class="title" @click="getPostList" v-if="!isLoading">load 下一页数据</el-button>
  </div>
</template>

<style scoped lang="scss">
.post-page {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow: hidden;

  .create-post {
    padding: 24px;
    border: 1px solid #4822a5;
    border-radius: 12px;
  }

  .title {
    font-size: 18px;
    line-height: 30px;
  }

  .footer {
    margin-top: 16px;
    display: flex;
    flex-direction: row-reverse;
  }

  .list {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    overflow-y: auto;
  }

  .post {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #4822a5;
    border-radius: 12px;
  }

  .update {
    display: flex;
    justify-content: space-between;
  }
}
</style>
