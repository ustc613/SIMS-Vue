<template>
  <a-layout class="console">
    <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="collapsed"
    >
      <div class="logo">
<!--        <span>学生信息管理系统</span>-->
      </div>
      <a-menu
          :defaultOpenKeys="['1']"
          :defaultSelectedKeys="['systemOverview']"
          :style="{ width: '100%' }"
          @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="systemOverview">
          <IconHome/>
          系统概览
        </a-menu-item>
        <a-sub-menu key="schoolManagement">
          <template #title>
            <span><IconCalendar/>学校管理</span>
          </template>
          <a-menu-item key="schoolList">学校列表</a-menu-item>
          <a-menu-item key="addSchool">新增学校</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="studentManagement">
          <template #title>
            <span><IconCalendar/>学生管理</span>
          </template>
          <a-menu-item key="studentList">学生列表</a-menu-item>
          <a-menu-item key="addStudent">导入学生</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        <a-button shape="round" @click="onCollapse">
          <IconCaretRight v-if="collapsed"/>
          <IconCaretLeft v-else/>
        </a-button>
      </a-layout-header>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
}
const onClickMenuItem = (key) => {
  Message.info({ content: `You select ${ key }`, showIcon: true });
}
</script>
<style scoped lang="less">
.console {
  height: 100%;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);

  :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: rgba(black, .8);
  }

  :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
  }

  :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
  }

  :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
  }

  :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
  }

  :deep(.arco-layout-footer),
  :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
  }
}

</style>