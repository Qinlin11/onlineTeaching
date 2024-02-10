<script setup>
import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router';
import Edit from "@/components/edit.vue";
const form = ref({
    name: '',
    uploadTo: '',
    content: ''
})

const options = [
    {
        value: 'Option1',
        label: '教案',
    },
    {
        value: 'Option2',
        label: '导学案',
    }
]


const formData = ref({
    name: '',
    uploadTo: '',
    content: ''
});
const time = ref('');

const router = useRouter();

const getUpdateTime = () => {
    const now = new Date();
    return now.toLocaleString();
};

const submitForm = () => {
    // 获取表单数据
    const data = { ...formData.value };

    // 导航到目标页面，并传递表单数据作为参数
    if (data.uploadTo === 'Option1') {
        router.push({
            path: './myhome',
            query: data
        });
    } else if (data.uploadTo === 'Option2') {
        router.push({
            path: './myhome/tutorial',
            query: data
        });
    }
};

onMounted(() => {
    // 获取传递的参数值
    formData.value = router.currentRoute.value.query;

    // 获取当前时间并赋值给time字段
    time.value = getUpdateTime();
});
</script>

<template>
    <el-scrollbar height="640px">
        <form>
            <el-row class="row">
                <el-col :span='2' class="input-text" v-model="form.name">命名为：</el-col>
                <el-col :span="12">
                    <input class="input_text" v-model="form.name">
                </el-col>
                <el-col :span="8">
                </el-col>

            </el-row>
            <el-row class="row">
                <el-col :span='2' class="row-text">上传到：</el-col>
                <el-col :span="12">
                    <el-select v-model="form.uploadTo" class="m-2">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="8"></el-col>

            </el-row>
            <label class="content">
                <p name="editor" id="editor" ref="editor"></p>
                <edit v-model="form.content" class="editor" />
            </label>
            <button  class="btn" @click="submitForm">发布</button>
        </form>
    </el-scrollbar>
</template>

<style scoped>
.row {
    font-size: 18px;
    padding-top: 50px;
    padding-left: 100px;
    color: #3D3D3D;
}

.row-text {
    width: 72px;
    height: 35px;
}

.input_text {
    width: 210px;
    height: 30px;
    border-radius: 2px;
    border-color: #d9d5d5;
    border-width: 1px;
}

.content {
    margin: 50px 100px;
}

.btn {
    position: fixed;
    background-color: #ffffff;
    width: 100px;
    height: 50px;
    right: 50px;
    top: 140px;
    background-color: #B0D9F1;
    border: 1px;


}
</style>
