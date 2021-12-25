<template>
  <div class="manager-table">
    <a-table
        :bordered="true" :hoverable="true" :stripe="true"
        :loading="loading" :show-header="true" page-position="bottom"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true
        }"
        :data="managerData" row-key="id"
    >
      <template #columns>
        <a-table-column v-for="col in columns" :title="col.title" :data-index="col.dataIndex"/>
        <a-table-column title="角色">
          <template #cell="{ record }">
            <span v-if="record.role===0">学校管理员</span>
            <span v-else>教育局管理员</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button type="text" size="mini" @click="tryUpdateManager(record)">更新信息</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <a-modal v-model:visible="showUpdateModal" hide-cancel
             :on-before-ok="toUpdateManager">
      <template #title>
        更新管理员信息
      </template>
      <div>
        <ManagerEditor update-mode :form-data="managerToUpdate" ref="managerEditor" :school-id-map="schoolIdMap"/>
      </div>
    </a-modal>
  </div>
</template>

<script setup>

import { onMounted, ref } from "vue"
import { allManager, getAllSchool } from "../../../common/api"
import ManagerEditor from "./ManagerEditor.vue"

const columns = [
  {
    title: '管理员ID',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '所属学校名称',
    dataIndex: 'schoolName',
  }
]
const loading = ref(false)


const showUpdateModal = ref(false)
const managerToUpdate = ref(null)

const managerData = ref([])
const managerEditor = ref(null)

const schoolIdMap = ref(null)

const fetchData = async () => {
  loading.value = true
  const res = await allManager()
  loading.value = false
  return res.rows.map(m => {
    m['schoolName'] = schoolIdMap.value[m.schoolid]
    return m
  })
}

onMounted(async () => {
  const schoolRes = await getAllSchool()
  if (schoolRes) {
    const map = {}
    schoolRes.rows.forEach(s => {
      map[s.id] = s.name
    })
    schoolIdMap.value = map
  }
  managerData.value = await fetchData()
})

const tryUpdateManager = record => {
  console.log(record)
  managerToUpdate.value = record
  showUpdateModal.value = true
}

const toUpdateManager = async (done) => {
  await managerEditor.value.submit()
  managerData.value = await fetchData()
  done()
}
</script>

<style scoped lang="less">

</style>