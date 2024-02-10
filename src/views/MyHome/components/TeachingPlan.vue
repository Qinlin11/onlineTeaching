<script setup>
import { onMounted, ref } from 'vue'
import { getResource } from '@/apis/myhome'

const emits = defineEmits(['routeChange'])

const resourceData = ref([]);
const GetResource = async () => {
    const response = await getResource(31, 1);
    resourceData.value = response.data;
}


const deleteDocument = (tableData) => {

}

const updateDocument = (tableData) => {

}
onMounted(() => {
    GetResource();
})

</script>

<template class="body">
    <el-row class="row" v-for="resource in resourceData" :key="resource.id">
        <div class="document-box">
            <el-col :span="6">{{ resource.resource_name }}</el-col>
            <el-col :span="12">{{ resource.create_time }}</el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple"/>
                <el-button type="primary" @click="updateDocument(resource.id)">修改</el-button>
                <el-button id="debtn" type="danger" @click="deleteDocument(resource.id)">删除</el-button>
            </el-col>
        </div>
    </el-row>
</template>

<style scoped>
.row {

    margin-top: 10px;
    margin-left: 10px;
}

.document-box {
    display: flex;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果，根据需要调整参数 */
    padding: 10px; /* 根据需要调整内边距 */
    border-radius: 5px; /* 根据需要调整边框圆角 */
    margin-bottom: 10px; /* 根据需要调整底部间距 */
    width: 100%;
}

</style>
