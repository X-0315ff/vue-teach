<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { onMounted, ref, useTemplateRef } from 'vue'
import { listImg, uploadImg } from '@/http/upload.js'


const props = defineProps({
  size: {
    type : Number,
    default: 0, // 0默认不限制文件大小
  },
  // 上传失败回调
  checkFailCallback: {
    type: Function,
    default: () => {}
  },

  // 外部传入的函数：用于获取文件列表
  fetchList :{
    type: Function,
    required: false
  },

  // 外部传入的上传参数
  uplodaFn:{
    type: Function,
    required: true
  }
})

// 声明要触发的事件（子 --> 父）
const emit = defineEmits([
  // 拖拽状态变化
  'isDrag',
  // 上传状态变化
  'isUploding',
  // 上传成功
  'uploadFileSuccess',
  // 上传失败
  'uploadFileFailed'
])


const imgList = ref([])
const fileInput = useTemplateRef('file-input')

// 点击图片添加按钮
const handleAddButton = () => {
  fileInput.value.click()
}


// 校验文件的大小
const checkFileSize = (file) => {
  if (props.size <= 0) {
    return true
  }
  return file.size <= props.size
}

// 上传文件方法
const uploadFile = async (file) => {
  // 校验文件大小失败
  if(!checkFileSize(file)) {
    props.checkFailCallback?.(file)
    return
  }
  emit('isUploding', true) // 上传状态变化

  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await props.uplodaFn(formData)

    // 上传成功
    emit('uploadFileSuccess', response)

    // 如果提供了 fetchList，刷新文件列表
    if(props.fetchList){
      const res = await props.fetchList()
      imgList.value = res.images || []
    }
  } catch (error) {
    emit('uploadFileFailed', error) // 上传失败
    isDragging.value = false
  } finally {
    emit('isUploding', false) // 重置上传状态
    isDragging.value = false // 重置拖拽状态
  }
  // let formData = new FormData()
  // formData.append('file', file)
  // uploadImg(formData).then((response) => {
  //   console.log(response)
  //   getImgList()
  //   isDragging.value = false
  // })
}
// 选择完文件触发
const fileInputChange = (e) => {
  const file = e.target.files[0];
  console.log(file);
  // todo: 校验文件体积
  if(!file) return
  uploadFile(file)
}

// 拖拽上传
const isDragging = ref(false)
// 文件拖进时触发
const dragEnter = (e) => {
  e.preventDefault()
  isDragging.value = true
  emit('isDrag', true) // 拖拽状态变化
}
// 拖拽离开
const dragLeave = (e) => {
  const relatedTarget = e.relatedTarget
  const parent = e.currentTarget
  if (relatedTarget && parent.contains(relatedTarget)) {
    return
  }
  isDragging.value = false
  emit('isDrag', false) // 拖拽状态变化
}

// 拖拽经过，（必须阻止默认）
const dragOver = (e) => {
  e.preventDefault()
}

// 文件放下时触发上传
const drop = (e) => {
  e.preventDefault()
  let file = e.dataTransfer.files[0];
  if (!file) return
  // todo: 校验文件体积,校验文件类型
  uploadFile(file)
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
      <img :src="img.url" alt="" class="img" v-for="img in imgList" :key="img.url" />
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
