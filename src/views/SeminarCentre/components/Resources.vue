<template>
    <div class="file-display">
        <el-scrollbar wrap-class="grid-container" height="625px">
        <div v-if="fileList.length === 0" class="no-resource">
            <el-empty description="description" />
        </div>
        <div v-else class="grid-container">
            <div v-for="(file, index) in fileList" :key="index" class="grid-item">
                <div class="file-top">
                    <span>{{resourcesType(file.resource_type)}}</span>
                    <div class="btn">
                        <el-button type="primary" :disabled="file.file_type === 'pptx'" link @click="previewFile(file)">预览</el-button>
                        <el-button type="primary" link @click="downloadFile(file)">下载</el-button>
                    </div>
                </div>
                <div class="file-icon">
                    <i class="iconfont" :class="getFileIcon(file.file_type)"></i>
                </div>
                <div class="file-type">{{ getFileType(file) }}</div>
                <div class="delete-btn">
                    <el-button type="danger" link @click="deleteFile(file)">删除</el-button>
                </div>
            </div>
        </div>
        </el-scrollbar>

    </div>

    <el-dialog v-model="dialogTableVisible"  title="文件" @close="closePreview()">
        <template v-if="isFileType === 'docx'">
            <vue-office-docx :src="fileForm.file_url" />
        </template>
        <template v-else-if="isFileType === 'xlsx'">
            <vue-office-excel :src="fileForm.file_url" />
        </template>
        <template v-else-if="isFileType === 'pdf'">
            <vue-office-pdf :src="fileForm.file_url" />
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, ref,computed } from "vue";
import { useResourcesStore } from "@/stores/resourcesStore";
import { deleteGroupFileAPI } from "@/apis/SeminarCentre";
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'

const useResources = useResourcesStore()
const getResourcesData = () => {
    useResources.getFileALLData()
}
const fileList = computed(() => useResources.List);
const getFileIcon = (fileName) => {
    const iconMap = {
        pdf: "icon-Pdf",
        docx: "icon-WORD",
        pptx: "icon-PPT",
        xlsx: "icon-Microsoft-Excel",
        // 添加更多文件类型的映射
    };
    return iconMap[fileName] || "icon-question";
};

const resourcesType = (resource_type) => {
    const Map = {
        1: '教案',
        2: '导学案',
        3: '课件',
        4: '试题'
    }

    return Map[resource_type]
}
const getFileType = (file) => {
    const typeMap = {
        pdf: ".pdf",
        docx: ".docx",
        xlsx: ".xlsx",
        pptx: '.pptx',
        // 添加更多文件类型的映射
    };
    return file.resource_name + (typeMap[file.file_type] || "");
};

//删除资源
const deleteFile = async (file) => {
    await deleteGroupFileAPI(file.id)
    getResourcesData()
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
}


//预览文件
const dialogTableVisible = ref(false)
const isFileType = ref('')
const fileForm = ref({})
const previewFile = (file) => {
    dialogTableVisible.value = true
    isFileType.value = file.file_type
    fileForm.value = file

    if(isFileType.value === 'pptx'){
        ElMessage({
            message: '咱不支持PPT预览',
        })

    }

}

const closePreview = () => {
    dialogTableVisible.value = false
    fileForm.value = {}
}

//下载按钮
const downloadFile = (file) => {
    // 创建一个隐藏的 <a> 标签
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = file.file_url;

    // 将传入的文件名设置为下载的文件名
    link.setAttribute('download', getFileType(file));

    // 将 <a> 标签添加到页面中
    document.body.appendChild(link);

    // 模拟点击 <a> 标签
    link.click();

    // 移除 <a> 标签
    document.body.removeChild(link);
}

onMounted(()=>{
    getResourcesData()
})
</script>

<style scoped lang="less">
.file-display {
    //display: flex;
    //justify-content: center;
    //align-items: center;
    height: 100%;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    max-width: 1280px;
    width: 100%;
    padding: 20px;
}

.grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.grid-item:hover {
    transform: translateY(-5px);
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
}

.file-icon i{
    font-size: 48px;
    color: #2d8cf0;
}

.file-top {
    width: 100%;
    display: flex;
    margin-top: -10px;
    justify-content: space-between;
}
.delete-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

</style>
