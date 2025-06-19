<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import FileInput from '@/components/FileInput.vue'
import { ElMessage } from 'element-plus'

const dateList = ref([])
const initDateList = () => {
  let startDate = dayjs().date(1).day(0).startOf() // 拿到当前月开始的那一周的周日X,dayjs()拿到当前时间，date()获取或设置月份里的日期,day()获取或设置月份里的日期。
  const endDate = dayjs().add(1, 'month').date(0).day(6).endOf()
  while (startDate.isBefore(endDate)) {
    dateList.value.push({
      dateString: startDate.format('DD 日'),
      startTime: startDate.startOf(),
      endTime: startDate.endOf(),
    })
    startDate = startDate.add(1, 'day')
  }
  dateList.value.push({
    dateString: endDate.format('DD 日'),
  })
}
const handeDate = (date) => {
  console.log(date)
}
const fileError = (message,callback) => {
  if(message){
    callback()
  }
}

onMounted(() => {
  initDateList()
})
</script>

<template>
  <div class="calendar-page">
    <div class="calendar">
      <div class="header">this is header</div>
      <div class="calendar-panel">
        <div class="week-title">周 7</div>
        <div v-for="num in 6" class="week-title" :key="num">周 {{ num }}</div>
        <div v-for="date in dateList" class="month-date" @click="handeDate(date)">
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
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .calendar {
    width: 100%;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }

  .header {
    text-align: center;
    font-size: 18px;
    line-height: 30px;
  }

  .calendar-panel {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid #4822a5;
  }

  .week-title {
    border: 1px solid #4822a5;
    padding: 10px;
  }

  .month-date {
    border: 1px solid #4822a5;
    padding: 10px;
  }
}
</style>
