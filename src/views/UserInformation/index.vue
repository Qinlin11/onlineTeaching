<script>
</script>

<template>
    <div class="user">
        <el-menu class="el-menu-demo" mode="horizontal">
            <router-link to="/UserInformation" target="_blank">
                <el-menu-item index="/UserInformation">
                    <template #title>
                        <span>账号管理</span>
                    </template>
                </el-menu-item>
            </router-link>
            <router-link to="/UserInformation/administrator" target="_blank">
                <el-menu-item>
                    <template #title>
                        <span>后台管理</span>
                    </template>
                </el-menu-item>
            </router-link>
        </el-menu>
  </div>
  <div>
      <router-view />
  </div>
</template>

<style scoped lang="less">
.user {
  .el-menu-demo {
    display: flex;
    justify-content: space-around;
  }
}
</style>
