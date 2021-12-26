<template>
  <div class="student-table">

    <a-collapse :default-active-key="['result']" :bordered="false">
      <a-collapse-item header="条件查询" key="search">
        <a-form layout="vertical" :model="form">

          <a-form-item field="studentId" label="课程名称">
            <a-input v-model="form.courseName" placeholder="请输入课程名称..."/>
          </a-form-item>

          <a-form-item content-class="search-btn">
            <a-button type="primary" shape="round" size="mini" @click="search">查询</a-button>
          </a-form-item>
        </a-form>
      </a-collapse-item>
    </a-collapse>


    <a-table
        :bordered="true" :hoverable="true" :stripe="true"
        :loading="loading" :show-header="true" page-position="bottom"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true
        }"
        :data="courseData" row-key="id"
    >
      <template #columns>
        <a-table-column v-for="col in columns" :title="col.title" :data-index="col.dataIndex" :sortable="col.sortable"/>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button type="text" size="mini"
                      @click="tryUpdateCourse(record)">更新
            </a-button>
          </template>
        </a-table-column>

      </template>
    </a-table>
  </div>
  <a-modal v-model:visible="showUpdateModal" hide-cancel
           :on-before-ok="toUpdateSCourse">
    <template #title>
      更新课程信息
    </template>
    <div>
      <CourseEditor update-mode :form-data="courseToOperate" ref="courseEditor"/>
    </div>
  </a-modal>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import { allCourse, allStudent, getAllSchool, superManagerAllCourse, superManagerAllStudent } from "../../../common/api"
import preference from "../../../common/preference"
import CourseEditor from "./CourseEditor.vue"

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
  courseName: null,
})

const manager = preference.get('manager')
const courseData = ref([])

const schoolData = ref([])
const selectedSchoolId = ref(-1)
const courseToOperate = ref({})
const showUpdateModal = ref(false)
const courseEditor = ref(null)

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

const search = async () => {
  const courses = await fetchData()
  const result = []
  courses.forEach((course) => {
    if (form.courseName && course.name.indexOf(form.courseName) === -1) {
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
})

const tryUpdateCourse = student => {
  console.log(student)
  courseToOperate.value = student
  showUpdateModal.value = true
}
const toUpdateSCourse = async (done) => {
  await courseEditor.value.submit()
  await search()
  done()
}

</script>

<style scoped>

</style>