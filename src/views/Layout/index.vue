<script setup>
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutAside from "@/views/Layout/components/LayoutAside.vue";
</script>

<template>
    <div class="common-layout" style="margin: 0; padding: 0">
        <el-container>
            <el-header height="60px" style="margin: 0;padding: 0;">
                <layout-header/>
            </el-header>
            <el-container>
                <el-aside width="250px" style="background-color: skyblue; overflow: hidden;">
                    <LayoutAside/>
                </el-aside>
                <el-main style="padding: 0;">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  //transform: translateY(-10%);
  //opacity: 0;
}
</style>
