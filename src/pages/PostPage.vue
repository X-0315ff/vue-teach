<script setup>
import useUserInfoStore from '@/stores/userInfo.js'
import { sendPost } from '@/http/index.js';
import { ref } from 'vue';

let title = ref('')
let text = ref('')
let useStore = useUserInfoStore()


console.log(useUserInfoStore.user);

// senListPost()
sendPost(title,text).then( res => {
  // instance.defaults.headers.common['Authorization'] = useStore.user.token
  console.log(res);
})
</script>


<template>
<div>
  <div class="head">头像</div>
  <p class="tie">Title</p>
  <div class="title" >
    <input  v-model="title">
  </div>
  <p class="des">Description</p>
  <div class="Description">
    {{ text}}
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
