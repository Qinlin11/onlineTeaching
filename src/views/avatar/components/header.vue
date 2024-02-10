<template>
    <div class="page-header">
        <div class="left-section">
            <!-- 显示当前页面路径 -->
            <span>{{ currentPath }}</span>
        </div>
        <div class="right-section">
            <!-- 显示消息提示 -->
            <span>{{ notification }}</span>
        </div>
    </div>
</template>

<script setup>
// 通过路由获取当前页面路径，这里使用了 vue-router
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPath = route.path;

// 模拟消息提示
const notification = '新消息：您有一条未读消息';
</script>

<style scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: default; /* 你的页头背景色 */
    color:black; /* 你的文字颜色 */
}

.left-section {
    left: 10px;
}

.right-section {
    text-align: right;
}
</style>
