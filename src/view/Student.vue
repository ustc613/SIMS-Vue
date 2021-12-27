<template>
  <div class="student-info">
    <div class="info-card">
      <a-avatar :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: '#14a9f8',
    }">
        {{ studentInfo.name }}

      </a-avatar>
      <a-descriptions :data="infoData" title="详细信息" layout="inline-horizontal"/>
    </div>

    <a-space/>

    <!--    <a-card title="课程成绩" bordered>-->
    <!--      <a-card-grid-->
    <!--          v-for="(course, index) in courses"-->
    <!--          :key="index"-->
    <!--          :hoverable="index % 2 === 0"-->
    <!--          :style="{ width: '25%' }"-->
    <!--      >-->
    <!--        <a-card :title="course.coursename" :bordered="false">-->
    <!--          <p :style="{ margin: 0 }">-->
    <!--            成绩：{{ course.grade }}-->
    <!--          </p>-->
    <!--        </a-card>-->
    <!--      </a-card-grid>-->
    <!--    </a-card>-->

    <div class="grade-info">
      <a-table :columns="columns" :data="courses" :pagination="false" :stripe="true"/>
      <a-alert> 平均成绩 {{ average }}</a-alert>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getStudentInfo } from "../common/api"

const studentInfo = ref({})
const courses = ref([])
const infoData = ref([])

const fetchData = async () => {
  const res = await getStudentInfo()
  console.log(res)
  return res
}

const keyToLabel = {
  name: '姓名',
  age: '年龄',
  sex: '性别',
  phone: '手机号',
  username: '用户名',
  schoolname: '所在学校'
}

const columns = [
  {
    title: '课程名称',
    dataIndex: 'coursename',
  },
  {
    title: '成绩',
    dataIndex: 'grade',
  }
]

const average = ref(0)
onMounted(async () => {
  const res = await fetchData()
  if (res) {
    studentInfo.value = res.studentRows[0]
    courses.value = res.courseRows
    infoData.value = []
    Object.keys(studentInfo.value).forEach(k => {
      const label = keyToLabel[k]
      if (label) {
        infoData.value.push({
          label,
          value: studentInfo.value[k],
        })
      }
    })
    let sum = 0
    courses.value.forEach(c => {
      sum += c.grade
    })
    average.value = sum / courses.value.length
  }
})
</script>

<style scoped lang="less">
.student-info {
  max-width: 768px;
  margin: 0 auto;
  padding: 24px;

  @border: 6px;

  .info-card {
    display: flex;
    flex-direction: row;
    position: relative;
    border-radius: @border;
    padding: 12px 24px;
    background-color: white;
    border: 1px solid rgba(black, .05);

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: @border;
      content: ' ';
      background-color: var(--color-primary-light-4);
      border-top-left-radius: @border;
      border-bottom-left-radius: @border;
    }
  }

  .grade-info{
    background-color: white;
    padding: 12px;
    border: @border;
    border: 1px solid rgba(black, .05);
  }
}
</style>