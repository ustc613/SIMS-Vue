<template>
  <div class="course-editor">
    <a-form layout="vertical" :model="form">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" placeholder="请输入姓名..."/>
      </a-form-item>
      <a-form-item field="age" label="任课教师">
        <a-input v-model="form.teachername" placeholder="请输入任课教师..."/>
      </a-form-item>
      <a-form-item content-class="search-btn" v-if="!updateMode">
        <a-button type="primary" shape="round" @click="submit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>

import { reactive, watch } from "vue"
import { addCourse, addStudent, updateCourse, updateStudent } from "../../../common/api"
import { Message } from "@arco-design/web-vue"
import preference from "../../../common/preference"
import { useRouter } from "vue-router"

const props = defineProps({
  updateMode: {
    type: Boolean,
    default: () => false,
  },
  formData: Object,
})

const router = useRouter()
const form = reactive({
  name: null,
  teachername: null,
})

const submit = async () => {
  if (form.name && form.teachername) {
    let res
    if (props.updateMode) {
      const info = Object.assign(props.formData, form)
      console.log(info)
      res = await updateCourse(info)
      if (res && res.code === 200) {
        Message.success(res.msg)
      }
    } else {
      res = await addCourse({
        name: form.name,
        teachername: form.teachername,
        schoolid: preference.get('manager').schoolid
      })
    }
    if (res) {
      if (res.code === 200) {
        Message.success(res.msg)
        await router.replace({ name: 'CourseTable' })
      } else {
        Message.error(res.msg)
      }
    }
  } else {
    Message.error("课程名和任课教师不能为空")
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