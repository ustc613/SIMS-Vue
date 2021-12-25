<template>
  <div class="student-table">

    <a-collapse :default-active-key="['result']" :bordered="false">
      <a-collapse-item header="条件查询" key="search">
        <a-form layout="vertical" :model="form">

          <a-form-item v-if="manager.role===1" field="schoolName" label="选择学校">
            <a-select
                placeholder="请选择学校查看..." v-model="form.schoolName" allow-clear style="text-align: left;"
            >
              <a-option v-for="school in schoolData">{{ school.name }}</a-option>
            </a-select>
          </a-form-item>

          <a-form-item field="studentId" label="学生ID">
            <a-input v-model="form.studentId" placeholder="请输入学生ID..."/>
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
        :data="studentData" row-key="id"
    >
      <template #columns>
        <a-table-column v-for="col in columns" :title="col.title" :data-index="col.dataIndex"/>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button type="text" size="mini"
                      @click="tryUpdateStudent(record)">更新
            </a-button>
            <a-button type="text" size="mini"
                      @click="tryDeleteStudent(record)">删除
            </a-button>
          </template>
        </a-table-column>

      </template>
    </a-table>
  </div>

  <a-modal v-model:visible="showUpdateModal" hide-cancel
           :on-before-ok="toUpdateStudent">
    <template #title>
      更新学生信息
    </template>
    <div>
      <StudentEditor update-mode :form-data="studentToOperate" ref="studentEditor"/>
    </div>
  </a-modal>

  <a-modal v-model:visible="showDeleteModal" hide-cancel
           :on-before-ok="toDeleteStudent">
    <template #title>
      确认删除
    </template>
    <div>
      {{ studentToOperate.name + '-' + studentToOperate.phone }}
    </div>
  </a-modal>

</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import { allStudent, deleteStudent, getAllSchool, superManagerAllStudent } from "../../../common/api"
import preference from "../../../common/preference"
import StudentEditor from "./StudentEditor.vue"

const columns = [
  {
    title: '学生ID',
    dataIndex: 'id',
  },
  {
    title: '学校ID',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  }
]

const loading = ref(false)
const form = reactive({
  schoolName: null,
  studentId: null,
})
const studentEditor = ref(null)
const studentToOperate = ref({})

const showUpdateModal = ref(false)
const showDeleteModal = ref(false)

const manager = preference.get('manager')
const studentData = ref([])

const schoolData = ref([])
const selectedSchoolId = ref(-1)

const fetchData = async () => {
  loading.value = true
  const manager = preference.get('manager')
  let res
  if (manager.role === 1) {
    res = await superManagerAllStudent({})
  } else {
    res = await allStudent()
  }
  loading.value = false
  return res.rows
}


const fetchSchoolData = async () => {
  const res = await getAllSchool()
  schoolData.value = res.rows
}

const search = async () => {
  const students = await fetchData()
  const result = []
  students.forEach((stu) => {
    if (selectedSchoolId.value !== -1 && stu.schoolid !== selectedSchoolId.value) {
      return
    }
    if (form.studentId && form.studentId !== stu.id.toString()) {
      return
    }
    result.push(stu)
  })
  studentData.value = result
}

watch(() => form.schoolName, (val) => {
  schoolData.value.forEach((school) => {
    if (school.name === val) {
      selectedSchoolId.value = school.id
    }
  })
})

onMounted(async () => {
  studentData.value = await fetchData()
  fetchSchoolData()
})

const tryUpdateStudent = student => {
  console.log(student)
  studentToOperate.value = student
  showUpdateModal.value = true
}
const toUpdateStudent = async (done) => {
  await studentEditor.value.submit()
  await search()
  done()
}

const tryDeleteStudent = async student => {
  showDeleteModal.value = true
  studentToOperate.value = student
}

const toDeleteStudent = async (done) => {
  await deleteStudent(studentToOperate.value)
  done()
}
</script>

<style scoped>

</style>