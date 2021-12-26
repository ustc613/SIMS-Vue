<template>
  <div class="school-table">
    <a-collapse :default-active-key="['result']" :bordered="false">
      <a-collapse-item header="条件查询" key="search">
        <a-form layout="vertical" :model="form">
          <a-form-item field="name" label="学校名称">
            <a-input v-model="form.name" placeholder="学校名称..."/>
          </a-form-item>
          <a-form-item field="address" label="学校地址">
            <a-input v-model="form.address" placeholder="请输入学校地址..."/>
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
        :data="schoolData" row-key="id"
    >
      <template #columns>
        <a-table-column v-for="col in columns" :title="col.title" :data-index="col.dataIndex"/>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button type="text" size="mini" @click="tryUpdateSchool(record)">更新信息</a-button>
            <a-button type="text" size="mini" @click="tryFetchSchoolCourseGradeData(record)">查看成绩</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <a-modal v-model:visible="showUpdateModal" hide-cancel
             :on-before-ok="toUpdateSchool">
      <template #title>
        更新学校信息
      </template>
      <div>
        <SchoolEditor update-mode :form-data="schoolToUpdate" ref="schoolEditor"/>
      </div>
    </a-modal>

    <a-modal v-model:visible="showSchoolCourseGradeModal" hide-cancel
             :on-before-ok="toUpdateSchool">
      <template #title>
        学校课程平均分
      </template>
      <div>
        <a-table :columns="courseGradeCols" :data="schoolCourseGradeData" :pagination="false"/>
      </div>
    </a-modal>
  </div>
</template>

<script setup>

import { onMounted, reactive, ref } from "vue"
import { getAllSchool, getCourses } from "../../../common/api"
import SchoolEditor from "./SchoolEditor.vue"

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '学校名称',
    dataIndex: 'name',
  },
  {
    title: '学校地址',
    dataIndex: 'address',
  }
]

const courseGradeCols = [
  {
    title: '课程名',
    dataIndex: 'name'
  },
  {
    title: '任课教师',
    dataIndex: 'teachername',
  },
  {
    title: '平均分',
    dataIndex: 'average',
  }
]

const loading = ref(false)
const form = reactive({
  name: null,
  address: null,
})

const showUpdateModal = ref(false)
const schoolToUpdate = ref(null)

const schoolData = ref([])
const schoolEditor = ref(null)

const showSchoolCourseGradeModal = ref(false)
const schoolCourseGradeData = ref([])

const fetchData = async () => {
  loading.value = true
  const res = await getAllSchool()
  loading.value = false
  return res.rows
}

const search = async () => {
  const schools = await fetchData()
  const result = []
  schools.forEach(school => {
    if (form.name && school.name.indexOf(form.name) === -1) {
      return
    }
    if (form.address && school.address.indexOf(form.address) === -1) {
      return
    }
    result.push(school)
  })
  schoolData.value = result
}

onMounted(async () => {
  schoolData.value = await fetchData()
})

const tryUpdateSchool = record => {
  console.log(record)
  schoolToUpdate.value = record
  showUpdateModal.value = true
}

const toUpdateSchool = async (done) => {
  await schoolEditor.value.submit()
  await search()
  done()
}

const tryFetchSchoolCourseGradeData = async record => {
  showSchoolCourseGradeModal.value = true
  schoolCourseGradeData.value = []
  const res = await getCourses({
    id: record.id
  })
  if (res) {
    schoolCourseGradeData.value = res.rows
  }
}
</script>

<style scoped lang="less">

</style>