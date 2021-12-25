<template>
  <div class="school-editor">
    <a-form layout="vertical" :model="form">
      <a-form-item field="name" label="学校名称">
        <a-input v-model="form.name" placeholder="学校名称..."/>
      </a-form-item>
      <a-form-item field="address" label="学校地址">
        <a-input v-model="form.address" placeholder="请输入学校地址..."/>
      </a-form-item>
      <a-form-item content-class="search-btn" v-if="!updateMode">
        <a-button type="primary" shape="round" @click="submit">新增</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>

import { reactive, watch } from "vue"
import { addSchool, login, updateSchool } from "../../../common/api"
import { Message } from "@arco-design/web-vue"
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
  address: null,
})


watch(() => props.formData, (val) => {
  Object.assign(form, val)
})


const submit = async () => {
  if (form.name && form.address) {
    let res
    if (props.updateMode) {
      res = await updateSchool({
        id: props.formData.id,
        name: form.name,
        address: form.address,
      })
    } else {
      res = await addSchool({
        name: form.name,
        address: form.address,
      })
    }

    if (res) {
      if (res.code === 200) {
        Message.success(res.msg)
        await router.replace({ name: 'SchoolTable' })
      } else {
        Message.error(res.msg)
      }
    }
  } else {
    Message.error("学校名和地址不能为空")
  }
}

defineExpose({
  submit,
})
</script>

<style scoped>

</style>