<template>
  <div class="student-table">

    <a-collapse :default-active-key="['result']" :bordered="false">
      <a-collapse-item header="条件查询" key="search">
        <a-form layout="vertical" :model="form">

          <a-form-item v-if="manager.role===1" field="schoolName" label="选择学校">
            <a-select placeholder="请选择学校查看..." v-model="form.schoolName" allow-clear style="text-align: left;">
              <a-option v-for="school in schoolData">{{ school.name }}</a-option>
            </a-select>
          </a-form-item>

          <a-form-item field="studentId" label="课程ID">
            <a-input v-model="form.studentId" placeholder="请输入课程ID..."/>
          </a-form-item>

          <a-form-item content-class="search-btn">
            <a-button type="primary" shape="round" size="mini" @click="search">查询</a-button>
          </a-form-item>
        </a-form>
      </a-collapse-item>
    </a-collapse>


    <a-table
        :columns="columns" :bordered="true" :hoverable="true" :stripe="true"
        :loading="false" :show-header="true" page-position="bottom"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true
        }"
        :data="courseData" row-key="id"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import { allCourse, allStudent, getAllSchool, superManagerAllCourse, superManagerAllStudent } from "../../../common/api"
import preference from "../../../common/preference"

const columns = [
  {
    title: '课程ID',
    dataIndex: 'id',
  },
  {
    title: '课程名',
    dataIndex: 'name',
  },
  {
    title: '任课教师',
    dataIndex: 'teachername',
  }
]

const loading = ref(false)
const form = reactive({
  schoolName: null,
  courseId: null,
})

const manager = preference.get('manager')
const courseData = ref([])

const schoolData = ref([])
const selectedSchoolId = ref(-1)

const fetchData = async () => {
  loading.value = true
  const manager = preference.get('manager')
  let res
  if (manager.role === 1) {
    res = await superManagerAllCourse({})
  } else {
    res = await allCourse()
  }
  loading.value = false
  return res.rows
}

const fetchSchoolData = async () => {
  const res = await getAllSchool()
  schoolData.value = res.rows
}

const search = async () => {
  const courses = await fetchData()
  const result = []
  courses.forEach((course) => {
    if (selectedSchoolId.value !== -1 && course.schoolid !== selectedSchoolId.value) {
      return
    }
    if (form.courseId && form.courseId !== course.id.toString()) {
      return
    }
    result.push(course)
  })
  courseData.value = result
}

watch(() => form.schoolName, (val) => {
  schoolData.value.forEach((school) => {
    if (school.name === val) {
      selectedSchoolId.value = school.id
    }
  })
})

onMounted(async () => {
  courseData.value = await fetchData()
  fetchSchoolData()
})
</script>

<style scoped>

</style>