<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import FileInput from '@/components/FileInput.vue'
import { ElMessage , ElIcon} from 'element-plus'
import { getPostApi } from '@/http/post.js'



// 当前选中的日期
const currentDate = ref({})

// 控制模态框
let showDialog = ref(false)

// 日历数据列表
const dateList = ref([])

// 初始化日历数据
const initDateList = () => {
  // 1. 获取本月第一天
  const firstDayOfMonth = dayjs().date(1).startOf('day')
  // 2. 获取本月第一天所在周的周日（包括上月的）
  let startDate = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'day')
  // 3. 获取本月最后一天
  const lastDayOfMonth = dayjs().add(1, 'month').date(0).endOf('day')
  // 4. 获取本月最后一天所在周的周六
  let endDate = lastDayOfMonth.add(6 - lastDayOfMonth.day(), 'day')

  dateList.value = []
  // 5. 生成日历区间内的所有日期
  while (startDate.isBefore(endDate) || startDate.isSame(endDate, 'day')) {
    dateList.value.push({
      dateString: startDate.format('DD 日'),
      startTime: startDate.startOf().valueOf(),
      endTime: startDate.endOf().valueOf(),
      posts: [] // 后面用于挂载该天的 post 数据
    })
    startDate = startDate.add(1, 'day')
  }
  
  // console.log(dateList.value[0].startTime, dateList.value[dateList.value.length - 1].endTime)
  // 加载并绑定文章数据
  getPost()
}

// 获取文章数据
const getPost = () => {
      const startTime = dateList.value[0].startTime
      const endTime = dateList.value[dateList.value.length - 1].endTime
      getPostApi(startTime,endTime).then((res) => {
        // console.log(res)
      const allPosts = res
      
      // 清空所有日期下的 posts
      dateList.value.forEach(date => {
        date.posts = []
      })
      // 2. 遍历每条 post，把它挂载到对应的日期格子上
      allPosts.forEach( post => {
        const postDate = dayjs(post.createTime).format('DD 日')
        const match = dateList.value.find(date => date.dateString === postDate)
        if(match){
          match.posts.unshift(post)
        }
      })
      ElMessage.success('加载文章成功')
  })
}

// 点击日期事件
const handeDate = (date) => {
  // console.log(date.posts[0].title)
  currentDate.value = date
  showDialog.value = true
console.log(showDialog.value)
}


// 页面挂载时初始化日历
onMounted(() => {
  initDateList()
})
</script>

<template>
  <div class="calendar-page">
    <div class="calendar">
      <div class="header">日历</div>
      <div class="calendar-panel">
        <!-- 渲染周标题 -->
        <div v-for="(w, idx) in ['日','一','二','三','四','五','六']" class="week-title" :key="idx">
          周{{ w }}
        </div>
        <!-- 渲染日期格子 -->
        <div
          v-for="(date, idx) in dateList"
          class="month-date"
          :key="idx"
          @click="handeDate(date)"
        >
          <div class="date-label">{{ date.dateString }}</div>
          <div
            v-for="post in date.posts.slice(0,2)"
            :key="post.id"
            class="post-title"
          >
            {{ post.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- el-dialog 保持不变 -->
  <el-dialog
    v-model="showDialog"
    :title="currentDate?.dateString + '详情'"
    width="500px"
    top="10vh"
    destroy-on-close
    @close="currentDate.value = {}"
  >
    <div class="dialog-scroll-body">
      <div v-if="currentDate && currentDate.posts">
        <div v-if="currentDate.posts.length === 0">
          <p>这一天还没有记录内容。</p>
        </div>
        <div v-else>
            <div
              v-for="post in currentDate.posts"
              :key="post.id"
              class="dialog-post-item"
            >
            <div class="dialog-post-title">{{ post.title }}</div>
            <div class="dialog-post-text">{{ post.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.calendar-page {
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;  // 关键，padding不会撑大内容
  
  .calendar {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0;

    .header {
      text-align: center;
      background: #ccc;
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 5px;
    }

    .calendar-panel {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 120px; // 每个格子固定高度
      border: 1px solid #4822a5;
      line-height: 30px;
    }

    .week-title {
      border: 1px solid #4822a5;
      padding: 10px;
      background: #f5f5f5;
      text-align: center;
      font-weight: bold;
    }

    .month-date {
      border: 1px solid #4822a5;
      padding: 8px;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 14px;

      &:hover {
        background: #f0f0ff;
      }

      .date-label {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .post-title {
        font-size: 12px;
        color: #555;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

/* 弹窗内容样式必须写在外层，不能嵌套在 .calendar-page 里 */
.dialog-post-item {
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.dialog-post-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 6px;
}
.dialog-post-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}

/* 让弹窗内容区可滚动 */
:deep(.el-dialog__body) {
  max-height: 200px;
  overflow-y: auto;
  padding-right: 10px;
}

.dialog-scroll-body {
  max-height: 70vh;      // 你想要的内容区最大高度
  overflow-y: auto;       // 内容超出时出现滚动条
  padding-right: 10px;    // 防止滚动条遮挡内容
}
</style>