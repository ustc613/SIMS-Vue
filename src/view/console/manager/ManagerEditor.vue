<template>
  <div class="manager-editor">
    <a-form layout="vertical" :model="form">
      <a-form-item field="username" label="用户名">
        <a-input v-model="form.username" placeholder="请输入用户名..."/>
      </a-form-item>
      <a-form-item field="username" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码..."/>
      </a-form-item>
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" placeholder="请输入姓名..."/>
      </a-form-item>
      <a-form-item field="sex" label="性别">
        <a-radio-group v-model="form.sex">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="phone" label="手机号">
        <a-input v-model="form.phone" placeholder="请输入手机号..."/>
      </a-form-item>
      <a-form-item field="schoolName" label="选择学校">
        <a-select
            placeholder="请选择学校查看..." v-model="form.schoolName" allow-clear style="text-align: left;"
        >
          <a-option v-for="school in Object.values(schoolIdMap||{})">{{ school }}</a-option>
        </a-select>
      </a-form-item>
      <a-form-item content-class="search-btn" v-if="!updateMode">
        <a-button type="primary" shape="round" @click="submit">新增</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { reactive, ref, watch } from "vue"
import { addManager, updateManager, updateSchool } from "../../../common/api"
import { Message } from "@arco-design/web-vue"

const props = defineProps({
  updateMode: {
    type: Boolean,
    default: () => false,
  },
  formData: Object,
  schoolIdMap: Object,
})

const router = useRouter()
const form = reactive({
  name: null,
  username: null,
  password: null,
  sex: null,
  phone: null,
  role: null,
  schoolName: null,
})


watch(() => props.formData, (val) => {
  Object.assign(form, val)
})

const schoolid = ref(-1)
watch(() => form.schoolName, val => {
  for (const k of Object.keys(props.schoolIdMap || {})) {
    if (props.schoolIdMap[k] === val) {
      schoolid.value = k
      break
    }
  }
})

const submit = async () => {
  if (form.name && form.username && form.password) {
    let res
    const commonData = {
      name: form.name,
      username: form.username,
      password: form.password,
      sex: form.sex,
      phone: form.phone,
      role: 0,
      schoolid: parseInt(schoolid.value)
    }
    if (props.updateMode) {
      res = await updateManager(Object.assign(commonData, {
        id: props.formData.id,
      }))
    } else {
      res = await addManager(commonData)
    }

    if (res) {
      if (res.code === 200) {
        Message.success(res.msg)
        await router.replace({ name: 'ManagerTable' })
      } else {
        Message.error(res.msg)
      }
    }
  } else {
    Message.error("姓名、用户名以及密码不能为空")
  }
}

defineExpose({
  submit,
})
</script>

<style scoped lang="less">

</style>