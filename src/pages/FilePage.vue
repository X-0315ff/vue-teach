<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { onMounted, ref, useTemplateRef } from 'vue'
import { listImg, uploadImg } from '@/http/upload.js'

const props = defineProps({
  size: {
    default: 0,
  },
})
const imgList = ref([])
const fileInput = useTemplateRef('file-input')
// 点击图片添加按钮
const handleAddButton = () => {
  fileInput.value.click()
}
// 上传文件方法
const uploadFile = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  uploadImg(formData).then((response) => {
    console.log(response)
    getImgList()
    isDragging.value = false
  })
}
// 选择完文件触发
const fileInputChange = (e) => {
  const file = e.target.files[0];
  console.log(file);
  // todo: 校验文件体积
  uploadFile(file)
}
// 校验文件的大小
const checkFileSize = (file) => {
  if (props.size <= 0) {
    return true
  }
  return file.size <= props.size
}
// 获取图片列表
const getImgList = () => {
  listImg().then((response) => {
    imgList.value = response.images
  })
}
onMounted(() => {
  getImgList()
})

// 拖拽上传
const isDragging = ref(false)
// 文件拖进时触发
const dragEnter = (e) => {
  isDragging.value = true
}
// 文件离开
const dragLeave = (e) => {
  const relatedTarget = e.relatedTarget
  const parent = e.currentTarget
  if (relatedTarget && parent.contains(relatedTarget)) {
    return
  }
  isDragging.value = false
}
const dragOver = (e) => {
  e.preventDefault()
}
const drop = (e) => {
  e.preventDefault()
  let file = e.dataTransfer.files[0];
  // todo: 校验文件体积,校验文件类型
  uploadFile(file)
}
</script>

<template>
  <div class="file-input-container">
    <div
      class="add-file"
      @click="handleAddButton"
      @dragenter="dragEnter"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drop="drop"
      :class="{ 'is-dragging': isDragging }"
    >
      <el-icon size="100" color="#ccc">
        <Plus />
      </el-icon>
    </div>
    <input
      type="file"
      accept=".jpg,.png,.webp"
      class="file-input"
      ref="file-input"
      @change="fileInputChange"
    />
    <div class="img-list">
      <img :src="img.url" alt="" class="img" v-for="img in imgList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-input-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .add-file {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .is-dragging {
    border-color: #4822a5;
    background-color: pink;
  }

  .file-input {
    display: none;
  }

  .img-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    .img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
  }
}
</style>
