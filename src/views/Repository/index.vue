<script setup>

</script>

<template>
  <div class="repository">
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/repository">
        <template #title>
          <span>全部</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/repository/classification">
        <template #title>
          <span>分类</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/repository/upload">
        <template #title>
          <span>上传资源</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div>
      <router-view />
  </div>
</template>

<style scoped lang="less">
.repository {
  .el-menu-demo {
    display: flex;
    justify-content: space-around;
  }
}
</style>
