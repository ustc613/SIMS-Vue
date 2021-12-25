<template>
  <div class="student-editor">
    <a-form layout="vertical" :model="form">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" placeholder="请输入姓名..."/>
      </a-form-item>
      <a-form-item field="age" label="年龄">
        <a-input-number v-model="form.age" placeholder="请输入年龄..."/>
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
      <a-form-item content-class="search-btn" v-if="!updateMode">
        <a-button type="primary" shape="round" @click="submit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue"
import { addStudent, updateStudent } from "../../../common/api"
import { Message } from "@arco-design/web-vue"

const props = defineProps({
  updateMode: {
    type: Boolean,
    default: () => false,
  },
  formData: Object,
})


const form = reactive({
  name: null,
  age: null,
  sex: null,
  phone: null,
})

const submit = async () => {
  if (props.updateMode) {
    const info = Object.assign(props.formData, form)
    console.log(info)
    const res = await updateStudent(info)
    if (res && res.code === 200) {
      Message.success(res.msg)
    }
  } else {
    await addStudent({
      name: form.name,
      age: form.age,
      sex: form.sex,
      phone: form.phone,
    })
  }
}

defineExpose({
  submit,
})

watch(() => props.formData, (val) => {
  Object.assign(form, val)
})

</script>

<style scoped>

</style>