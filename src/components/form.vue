<script setup> {
    
}
import { ref } from 'vue'

const value1 = ref<[Date, Date]>([
    new Date(2000, 10, 10, 10, 10),
    new Date(2000, 10, 11, 10, 10),
])
</script>

<template>
    <form>
        <div type="text">作业名称：</div>
        <input type="text" />
        <div class="block">
            <el-date-picker v-model="value1" type="datetimerange" range-separator="To" start-placeholder="Start date"
                end-placeholder="End date" />
        </div>
    </form>
</template>
<style scoped>
.date-picker-container .el-date-picker__header {
    display: flex;
    flex-direction: column;
}

.date-picker-container .el-date-picker__header .el-date-picker__header-label {
    margin-bottom: 10px;
}

.block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.block:last-child {
    border-right: none;
}

.block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>