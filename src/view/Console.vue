<template>
  <a-layout class="console">
    <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="collapsed"
    >
      <div class="logo">
        <!--        <span>SIMS</span>-->
      </div>
      <a-menu
          :defaultOpenKeys="[]"
          :defaultSelectedKeys="['系统概览']"
          :style="{ width: '100%' }"
          @sub-menu-click="onClickSubMenu"
          @menuItemClick="onClickMenuItem"
          accordion
      >
        <div v-for="menu in menuConfigs">
          <a-menu-item v-if="menu.children===undefined" :key="menu.text + '-' + menu.route">
            <IconMindMapping/>
            {{ menu.text }}
          </a-menu-item>
          <a-sub-menu v-else :key="menu.text">
            <template #title>
              <span>
                <IconMindMapping/>
                {{ menu.text }}
              </span>
            </template>
            <a-menu-item v-for="subMenu in menu.children" :key="subMenu.text + '-' + subMenu.route">
              <IconSubscribe/>
              {{ subMenu.text }}
            </a-menu-item>
          </a-sub-menu>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;padding-right: 20px;">
        <a-row justify="space-between" align="center" style="height: 100%;">
          <a-button shape="round" @click="onCollapse">
            <IconCaretRight v-if="collapsed"/>
            <IconCaretLeft v-else/>
          </a-button>
          <a-dropdown trigger="hover">
            <a-button shape="round">用户名</a-button>
            <template #content>
              <a-doption>退出登录</a-doption>
            </template>
          </a-dropdown>
        </a-row>
      </a-layout-header>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item v-for="(bread,index) in breadcrumb" :key="index">{{ bread }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
        <a-layout-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const collapsed = ref(false)

const menuConfigs = [
  {
    text: '系统概览',
    route: 'SystemOverview',
  },
  {
    text: '学校管理',
    children: [
      {
        text: '学校列表',
        route: 'SchoolTable',
      },
      {
        text: '新增学校',
        route: 'SchoolEditor',
      }
    ]
  },
  {
    text: '学生管理',
    children: [
      {
        text: '学生列表',
        route: 'StudentTable',
      },
      {
        text: '导入学生',
        route: 'StudentEditor',
      }
    ]
  },
  {
    text: '成绩管理',
    children: [
      {
        text: '成绩列表',
        route: '',
      },
      {
        text: '录入成绩',
        route: '',
      }
    ]
  }
]
const breadcrumb = ref([ '系统概览' ])

const router = useRouter()

const onCollapse = () => {
  collapsed.value = !collapsed.value
}

const onClickSubMenu = (key) => {
  breadcrumb.value = [
    key,
  ]
}

const onClickMenuItem = (key) => {
  const [ text, route ] = key.split('-')
  if (route) {
    router.push({ name: route })
  }
  breadcrumb.value = [
    ...breadcrumb.value.slice(0, 1),
    text,
  ]
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