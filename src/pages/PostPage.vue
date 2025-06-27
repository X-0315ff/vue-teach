<script setup>
import { onMounted, reactive, ref, useTemplateRef } from 'vue'
import { ElButton, ElInput, ElSkeleton } from 'element-plus'
import { createPostApi, deletePostApi, listPostApi, updatePostApi } from '@/http/post.js'

const title = ref('')
const text = ref('')
const pageInfo = reactive({ page: 1, size: 5 })
const postList = ref([])
const editType = ref('add') // add
const updateId = ref(-1)
const isLoading = ref(false)
const isEnd = ref(false)
const list = useTemplateRef('list')
const resetStatus = () => {
  pageInfo.page = 1
  postList.value = []
  isEnd.value = false
}

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
    resetStatus()
    getPostList()
    title.value = ''
    text.value = ''
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
const deletePost = (post) => {
  deletePostApi(post.id).then((res) => {
    resetStatus()
    getPostList()
  })
}
// 获取post列表
const getPostList = () => {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  return listPostApi(pageInfo.page, pageInfo.size)
    .then((res) => {
      if (res.length === 0) {
        isEnd.value = true
        return
      }
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
const canLoadMore = () => {
  return (
    !isLoading.value && // 确保当前没有其他请求
    !isEnd.value &&  // 确保后面有内容
    // scrollHeight:整个滚动内容的总高度（包括隐藏部分）
    // clientHeight:元素的可视区域高度
    // scrollTop:当前滚动条卷去的高度
    // 左式等于到底部还有多少像素
    list.value.scrollHeight - list.value.clientHeight - list.value.scrollTop < 50
  )
}
// 滚动监听，检测是否“接近底部”
const handleScroll = () => {
  if (canLoadMore()) {
    getPostList()
  }
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
    <div class="list" ref="list" @scroll="handleScroll">
      <div class="title">post 列表</div>
      <div class="post" v-for="post in postList" :key="post.id">
        <div class="update">
          <span>title</span>
          <div>
            <el-button @click="handleUpdateBtn(post)">update</el-button>
            <el-button @click="deletePost(post)">删除</el-button>
          </div>
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
