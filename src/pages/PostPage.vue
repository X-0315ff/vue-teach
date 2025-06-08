<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { createPostApi, listPostApi } from '@/http/post.js'

const title = ref('')
const description = ref('')
const pageInfo = reactive({ page: 1, size: 5 })
const editType = ref('edit')
const createPost = () => {
  createPostApi(title.value, description.value).then((res) => {})
}
const updatePost = () => {}
const deletePost = () => {}
const getPostList = () => {
  listPostApi(pageInfo.page, pageInfo.size).then((res) => {
    postList.value.push(...res)
  })
}
const postList = ref([])
onMounted(() => {
  getPostList()
})
</script>


<template>
  <div class="post-page">
    <div class="create-post">
      <div class="title">title</div>
      <el-input v-model="title" />
      <div class="title">content</div>
      <el-input
        v-model="description"
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        placeholder="Please input"
      />
      <div class="footer">
        <el-button>save</el-button>
      </div>
    </div>
    <div class="list">
      <div class="title">post 列表</div>
      <div class="post" v-for="post in postList" :key="post.id">
        <div class="title">title</div>
        <div>{{ post.title }}</div>
        <div class="title">content</div>
        <div>{{ post.text }}</div>
      </div>
    </div>
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
}
</style>
