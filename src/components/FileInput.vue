<script setup>
const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    default: 0,
  },
})
const fileCheck = (file) => {
  if (props.fileSize === 0) {
  } else {

  }
}
const emit = defineEmits(['fileCheckError', 'uploadStatus', 'fileUploadFail', 'fileUploadSuccess'])
const fileChange = (file) => {
  if(fileCheck(file)){

  }

  emit('fileCheckError', 'maaaa')
}
</script>

<template>
  <div>
    <input :accept="props.fileType" type="file" @change="fileChange" />
  </div>
</template>

<style scoped lang="scss"></style>
