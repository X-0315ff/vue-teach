<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import FileInput from '@/components/FileInput.vue'
import { ElMessage } from 'element-plus'
import { getPostApi } from '@/http/post.js'

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
    })
    startDate = startDate.add(1, 'day')
  }
  
    // console.log(startDate.valueOf(), endDate.valueOf())
    // 初始化上传的post
    const getPost = () => {
    getPostApi(startDate.valueOf(), endDate.valueOf()).then((res) => {
      console.log(res)
    })
  }
  getPost()
}

// 点击日期事件
const handeDate = (date) => {
  console.log(date)
}


// 文件错误处理（未用到）
const fileError = (message,callback) => {
  if(message){
    callback()
  }
}

// 页面挂载时初始化日历
onMounted(() => {
  initDateList()
})
</script>

<template>
  <div class="calendar-page">
    <div class="calendar">
      <div class="header">this is header</div>
      <div class="calendar-panel">
        <!-- 渲染周标题 -->
        <div v-for="(w, idx) in ['日','一','二','三','四','五','六']" class="week-title" :key="idx">
          周{{ w }}
        </div>
        <!-- 渲染日期 -->
        <div v-for="(date, idx) in dateList" class="month-date" @click="handeDate(date)" :key="idx">
          {{ date.dateString }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar-page {
  width: 100%;
  height: 100%;
  display: flex; // 页面整体居中
  justify-content: center;
  align-items: flex-start;

  .calendar {
    width: 100%; // 日历宽度
    height: 100%; // 日历高度
    display: flex;
    flex-direction: column;
    margin-top: 0;

    .header {
      text-align: center; // 标题居中
      background: #ccc;   // 灰色背景
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 5px;
    }

    .calendar-panel {
      flex: 1;
      display: grid; // 使用网格布局
      grid-template-columns: repeat(7, 1fr); // 7列
      border: 1px solid #4822a5;
      line-height: 30px;
    }

    .week-title {
      border: 1px solid #4822a5;
      padding: 10px;
      background: #f5f5f5; // 周标题背景色
      text-align: center;
    }

    .month-date {
      border: 1px solid #4822a5;
      padding: 10px;
      // text-align: center;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background: #ede7f6; // 鼠标悬停效果
      }
    }
  }
}
</style>
