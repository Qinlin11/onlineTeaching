<script setup>

</script>

<template>
  <div class="seminar-centre">
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/seminarcentre">
        <template #title>
          <span>我的教研组</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/seminarcentre/document">
        <template #title>
          <span>协作文档</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/seminarcentre/resources">
        <template #title>
          <span>组内资源</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/seminarcentre/onlinemeeting">
        <template #title>
          <span>在线会议</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div>
      <router-view />
  </div>
</template>

<style scoped lang="less">
.seminar-centre {
    //display: flex;
    .el-menu-demo {
        display: flex;
        justify-content: space-around;
    }
}
</style>
