<template>
  <div class="login">
    <div class="login-container">
      <div class="login-user-switch">
        <a-radio-group type="button" size="large" v-model="userType">
          <a-radio value="student">学生</a-radio>
          <a-radio value="admin">管理员</a-radio>
        </a-radio-group>
      </div>
      <h1 class="login-title">
        {{ userType === 'admin' ? '管理员登录' : '学生登录' }}
      </h1>
      <a-form :model="loginInfo" class="login-form" :wrapper-col-props="rolProps">
        <a-form-item field="username" hide-label>
          <a-input v-model="loginInfo.name" placeholder="请输入用户名..."/>
        </a-form-item>
        <a-form-item field="password" hide-label>
          <a-input v-model="loginInfo.post" placeholder="请输入密码..." type="password"/>
        </a-form-item>
        <a-form-item hide-label>
          <a-button type="primary" long>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

const userType = ref('student')

const rolProps = {
  span: 24,
  offset: 0,
}

const loginInfo = reactive({
  username: null,
  password: null,
})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .login-container {
    background-color: white;
    padding: 24px 24px 0 24px;
    border-radius: 6px;
    margin-top: 30vh;

    .login-user-switch {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    .login-title {
      text-align: center;
      width: 100%;
    }

    .login-form {
      width: 480px;
    }
  }
}
</style>