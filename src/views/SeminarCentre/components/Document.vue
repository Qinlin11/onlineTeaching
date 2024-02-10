<template>
    <el-container>
        <el-header class="head_box">
            <el-row :gutter="24" class="btn">
                <el-col :span="18">
                    <el-button type="primary" @click="showForm()">
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        新建文档
                    </el-button>
                </el-col>
                <el-col :span="6">
                    <el-input :suffix-icon="Search" placeholder="搜索" v-model="searchTopic"></el-input>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="main_box" style="margin-top: 10px">
            <div class="ss">
                    <el-row :gutter="24" v-for="document in documents" :key="document.id">
                        <div class="document-box">
                            <el-col :span="6">
                                <span>文章标题：{{ document.title }}</span>
                            </el-col>
                            <el-col :span="12">
                                <span>更新时间： {{ document.updated_at }}</span>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" @click="updateDocument(document.id)">修改</el-button>
                                <el-button id="debtn" type="danger"  @click="deleteDocument(document.id)">删除</el-button>
                            </el-col>
                        </div>
                    </el-row>
                    <div class="pagination-block" style="margin: 20px 10px 0 10px">
                        <el-pagination
                            background
                            v-model:current-page="pagination.page"
                            :page-size="8"
                            :pager-count="5"
                            layout="prev, pager, next, ->, jumper,total"
                            :total="pagination.total"
                            @current-change="getDocumentsData"
                        />
                    </div>

                <el-dialog v-model="isFormVisible" @close="cancelCreate()" :width="700">
                    <el-form v-if="isFormVisible" :model="createDocument" title="编辑文档" >
                        <el-form-item label="主题">
                            <el-input v-model="createDocument.title" placeholder="请输入主题" style="margin-left: 18px"/>
                        </el-form-item>
                        <el-form-item label="内容">
                            <edit v-model="createDocument.content" class="editor" required/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="cancelCreate()">Cancel</el-button>
                        <el-button type="primary" @click="submitForm()">
                          Confirm
                        </el-button>
                      </span>
                    </template>
                </el-dialog>

                <el-dialog v-model="isFormVisible1" @close="cancelEdit()" :width="700">
                    <form v-if="isFormVisible1" title="编辑文档" @submit.prevent="submitForm1" class="form">
                        <label>
                            <input class="input1" type="text" v-model="editDocument.editTitle" placeholder="请输入主题">
                        </label><br/>
                        <div class="content">
                            <p id="editor" ref="editor"></p>
                            <edit v-model="editDocument.editContent" class="editor" required/>
                        </div>
                        <el-button type="primary" plain class="concel" @click="cancelEdit()">取消</el-button>
                        <el-button type="primary" class="submit1" @click="saveDocument(editDocument.id)">保存</el-button>
                    </form>
                </el-dialog>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Plus, Search } from "@element-plus/icons-vue";
import Edit from "@/components/edit.vue";
import {
    createRichTextAPI,
    deleteDocumentAPI,
    getDocumentsAPI,
    getOneDocumentAPI,
    updateDocumentAPI
} from "@/apis/SeminarCentre";
import { ElMessage } from "element-plus";
//新增文章
const createDocument = ref({
    title: '',
    content: ''
})
const searchTopic = ref("");
const isFormVisible = ref(false);
const isFormVisible1 = ref(false);


const editDocument = ref({
    id: '', //修改标题id
    editTitle: '', //修改标题
    editContent: '' //修改文章
})
const documents = ref([]);
const pagination = ref({
    page: 0,
    total: 0,
    total_page: 0,
})
//获取所有文章
const getDocumentsData = async (page = 1) => {
    pagination.value.page = page
    const res = await getDocumentsAPI(page)
    documents.value = res.data.list
    pagination.value.page = parseInt(res.data.pagination.page)
    pagination.value.total = res.data.pagination.total
    pagination.value.total_page = res.data.pagination.total_page
}



//修改文章
const updateDocument = async (id) => {
    isFormVisible1.value = true
    const res = await getOneDocumentAPI(id)
    editDocument.value.id = res.data.id
    editDocument.value.editTitle = res.data.title
    editDocument.value.editContent = res.data.content
}

const saveDocument = async (id) => {
    console.log(editDocument.value)
    const { editTitle, editContent } = editDocument.value
    await updateDocumentAPI({ id, editTitle, editContent })
    await getDocumentsData()
    ElMessage({ message:'修改成功', type: 'success' })
    editDocument.value.editTitle = ''
    editDocument.value.editContent = ''
    editDocument.value.id = ''
    isFormVisible1.value = false

}


const showForm = () => {
    isFormVisible.value = true;
};

const cancelCreate = () => {
    createDocument.value.title = ''
    createDocument.value.content = ''
    isFormVisible.value = false
}

const submitForm = async () => {
    if (createDocument.value.title.length < 5) {
        alert("主题不少于五个字");
        return;
    }
    const { title, content } = createDocument.value
    await createRichTextAPI({ title, content })
    await getDocumentsData()
    createDocument.value.title = ''
    createDocument.value.content = ''
    ElMessage({ message:'添加成功', type: 'success' })
    isFormVisible.value = false;
};


const submitForm1 = () => {
    isFormVisible1.value = false;
};
//取消编辑
const cancelEdit = () => {
    isFormVisible1.value = false;
    editDocument.value.editTitle = ''
    editDocument.value.editContent = ''
};
//删除文章
const deleteDocument = async (id) => {
    await deleteDocumentAPI(id)
    ElMessage({ type: 'success', message: '删除成功' })
}

watch(searchTopic, (newValue) => {
    console.log("搜索关键字变化为：", newValue);
});
onMounted(() => {
    getDocumentsData()
})
</script>


<style scoped>
.document-box {
    display: flex;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果，根据需要调整参数 */
    padding: 10px; /* 根据需要调整内边距 */
    border-radius: 5px; /* 根据需要调整边框圆角 */
    margin-bottom: 10px; /* 根据需要调整底部间距 */
    width: 100%;
}

.head_box {
    background-color: #F2F2F2;
    width: 100%;
}

.btn {
    margin-top: 15px;
}


.main_box {
    padding: 0;
    overflow: hidden;
}



.move {
    font-size: 40px;
    width: 700px;
    height: 10px;
}

.form {
    position: absolute;
    margin-left: -20px;
    margin-top: -23px;
    width: 700px;
    height: 550px;
    background: #F2F2F2;
}

.button_size {
    color: #000000;
    background-color: aqua;
}

.input1 {
    margin-left: 20px;
    margin-top: 20px;
    width: 300px;
    height: 22px;
}

.editor {
    width: 650px;
    margin-left: 20px;
    margin-top: 20px;
    color: #000000;
}

.submit {
    width: 65px;
    height: 30px;
    margin-left: 600px;
    margin-top: 10px;
}

.concel {
    width: 65px;
    height: 30px;
    margin-left: 490px;
    margin-top: 10px;
}

.submit1 {
    width: 65px;
    height: 30px;
    margin-left: 50px;
    margin-top: 10px;
}


</style>
