<template>
    <div class="container">
        <el-card>
            <div class="button-container">
                <el-button type="primary" @click="creteSeminar()">添加教研组</el-button>
            </div>
            <div class="table-container">
                <el-table :data="SeminarData" style="width: 100%">
                    <el-table-column label="教研组主题" prop="title"></el-table-column>
                    <el-table-column label="教研组名称" prop="seminar_name"></el-table-column>
                    <el-table-column label="组长" prop="host_name">
                        <template v-slot:default="{ row }">
                            <span v-if="row.host_name">{{ row.host_name }}</span>
                            <span v-else>暂无设置名称</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template v-slot="scope">
                            <el-button link  @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button link  type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog
                v-model="dialogVisible"
                title="添加教研组"
                :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
                <el-form-item label="主题" prop="groupTitle">
                    <el-input  v-model="form.groupTitle" placeholder="请输入教研组主题"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="groupName">
                    <el-input v-model="form.groupName" placeholder="请输入教研组名称"></el-input>
                </el-form-item>
                <el-form-item label="成员" prop="members">
                    <el-select v-model="form.members" multiple placeholder="请选择成员">
                        <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.id"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" style="text-align: right">
                <el-button @click="cancelCreate">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="教研组详情" center v-model="editDialogVisible" width="30%">
            <div class="vertical-table" style="font-size: 16px">
                <el-row style="margin: 5px 0">
                    <el-col :span="8">
                        <span>教研组主题:</span>
                    </el-col>
                    <el-col :span="16">
                        <SpanInput v-model="seminarForm.title" />
                    </el-col>
                </el-row>
                <el-row style="margin: 5px 0">
                    <el-col :span="8">
                        <span>教研组名称:</span>
                    </el-col>
                    <el-col :span="16">
                        <SpanInput v-model="seminarForm.seminar_name" />
                    </el-col>
                </el-row>
                <el-row style="margin: 5px 0">
                    <el-col :span="8">
                        教研组组长：
                    </el-col>
                    <el-col :span="16">
                        <el-tag>{{seminarMembers.seminarInfer?.username || '未设置名字'}}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">教研组成员：</el-col>
                    <el-col :span="16">
                        <div class="Seminar_mem">
                            <el-tag
                                v-for="member in seminarMembers.seminarMember"
                                :key="member.id"
                                class="mx-1"
                                closable
                                @close="deleteMember(member)"
                            >
                                {{member.username || '未设置名字'}}
                            </el-tag>
                            <el-input
                                v-if="inputVisible"
                                ref="InputRef"
                                v-model="inputValue"
                                class="ml-1 w-20"
                                size="small"
                                placeholder="请输入电话号码"
                                @keyup.enter="handleInputConfirm(seminarForm.id)"
                                @blur="handleInputConfirm(seminarForm.id)"
                            />
                            <el-button v-else class="button-new-tag ml-1" size="small" style="margin-top: 5px" @click="showInput()">
                                + 添加用户
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancelButton()">取消</el-button>
                <el-button type="primary" @click="confirmEdit()">
                  Confirm
                </el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
    addMemberForPhoneAPI,
    createSeminarAPI, deleteMemberAPI,
    deleteSeminarAPI,
    editSeminarAPI,
    getSeminarAllAPI,
    getUserSeminarAPI
} from "@/apis/SeminarCentre";
import SpanInput from '@/components/SpanInput/index.vue'
import { ElMessage } from "element-plus";
import { getUserALLAPI } from "@/apis/user";

//获取用户加入的教研组
const SeminarData = ref([]);
const getUserSeminarData = async () => {
    let res = await getUserSeminarAPI()
    SeminarData.value = res.data
}


//添加教研组
const dialogVisible = ref(false);
const editDialogVisible = ref(false)
const formRef = ref(0)
// const members = ref([])
const form = ref({
    groupTitle: '',
    groupName: '',
    members: []
});
const options = ref([]); //选择用户
//表单校验规则
const rules = {
    groupTitle: [
        { required: true, message: '请输入教研组主题', trigger: 'blur' }
    ],
    groupName: [
        { required: true, message: '请输入教研组名称', trigger: 'blur' }
    ],
    members: [
        { required: true, type: 'array', message: '请选择成员', trigger: 'change' }
    ]
};
const creteSeminar = async () => {
    dialogVisible.value= true
    let res = await getUserALLAPI()
    options.value = res.data
}
//关闭dialog
const handleClose = (done) => {
    if (dialogVisible.value) {
        if (window.confirm('确认关闭？')) {
            dialogVisible.value = false; // 将 dialogVisible 的值设置为 false
            form.value.groupTitle = '';
            form.value.groupName = '';
            form.value.members = [];
            done(); // 关闭对话框
        }
    } else {
        done();
    }
};
const cancelCreate = () => {
    dialogVisible.value= false
    form.value.groupTitle = '';
    form.value.groupName = '';
    form.value.members = [];
}
const handleSubmit = () => {
    formRef.value.validate( async (valid) => {
        if (valid) {
            const { groupTitle, groupName, members } = form.value;
            await createSeminarAPI({ groupTitle, groupName, members })
            await getUserSeminarData()
            form.value.groupTitle = '';
            form.value.groupName = '';
            form.value.members = [];
            dialogVisible.value = false;
            ElMessage({
                message: '添加成功！',
                type: 'success',
            });
        } else {
            ElMessage({
                message: '请填写完整信息！',
                type: 'error',
            });
            return false;
        }
    });
};

//点击编辑
const seminarMembers = ref([])
const seminarForm = ref({
    id: '',
    title: '',
    seminar_name: ''
})

const getSeminarUser = async (id) => {
    let res = await getSeminarAllAPI(id)
    seminarMembers.value = res.data
    seminarForm.value.id = seminarMembers.value.seminarInfer.id
    seminarForm.value.title = seminarMembers.value.seminarInfer.title
    seminarForm.value.seminar_name = seminarMembers.value.seminarInfer.seminar_name
}

const handleEdit = (row) => {
    ElMessage({ message: '点击主题和名称可以修改' })
    editDialogVisible.value = true
    getSeminarUser(row.id)

};

const handleDelete = (index, row) => {
    console.log(row)
    // 显示一个带有消息 '确认删除该教研组？' 的确认对话框
    if (window.confirm('确认删除该教研组？')) {
        // 用户点击确认，执行异步操作
        Promise.resolve()
            .then(async () => {
                await deleteSeminarAPI(row.id)
                await getUserSeminarData()
                // 使用 message 函数显示成功消息
                ElMessage({
                    message: '删除成功！',  // 成功消息的内容
                    type: 'success',       // 成功消息的类型（假设为成功消息）
                });
            })
            .catch((e) => {
                // 处理错误
                ElMessage({
                    message: `删除失败 ${e}`,
                    type: 'warning'
                })
            });
    } else {
        // 用户点击取消，不执行任何操作
    }
};

//取消
const cancelButton = async () => {
    const result = window.confirm('确定要执行此操作吗？');
    if (result) {
        // 用户点击了确认按钮
        editDialogVisible.value = false

        // 执行操作
        console.log('执行操作');
    } else {
        // 用户点击了取消按钮
        // 不执行操作
        console.log('取消操作');
    }


}
//确认编辑主题
const confirmEdit = async () => {
    const { id, title, seminar_name } = seminarForm.value
    await editSeminarAPI({ id, title, seminar_name })
    await getUserSeminarData()
    editDialogVisible.value = false
}

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(0)
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}
const handleInputConfirm = async (id) => {
    if (inputValue.value) {
        //添加请求
        const phone = inputValue.value
        await addMemberForPhoneAPI({ id, phone })
        await getSeminarUser(id)
    }
    inputVisible.value = false
    inputValue.value = ''
}

//删除用户
const deleteMember = async (member) => {
    if(member.is_leader === 0) {
        ElMessage({
            message: '组长无法删除',
        })
        return
    }
    const ids = [member.id]
    const seminarId = seminarForm.value.id
    await deleteMemberAPI({ seminarId, ids })
    await getSeminarUser(seminarId)
    ElMessage({
        message: '删除成功',
        type: 'success'
    })

}

onMounted(() => {
    getUserSeminarData()
})
</script>

<style>
.container {
    padding: 20px;
}

.table-container {
    margin-top: 20px;
}

.button-container {
    margin-top: 20px;
    text-align: left;
}

.el-dialog--center .el-dialog__footer {
    text-align: right !important;
}


.vertical-table {
    margin-top: 20px;
}

.mx-1 {
    margin: 10px 5px 5px 0;
}
</style>
