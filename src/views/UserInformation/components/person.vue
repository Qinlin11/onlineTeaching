<script setup>
import { useUserStore } from "@/stores/userStore"
import { useRouter } from 'vue-router';
import { LogoutAPI, PhoneAPI, PasswordAPI } from "@/apis/user";
import { ref, computed } from 'vue'
const router = useRouter();

const dialogVisible = ref(false)
const passwindow = ref(false)
const phonewindow = ref(false)

const userStore = useUserStore()

const { userInfo } = userStore
console.log(userInfo)



const form = ref({
  username: userInfo.username,
})

const confirmEvent = async() => {
    const response = await LogoutAPI();
    ElMessage({ type: 'success', message:response.message });
    router.push('/login')
}

const changebase = async() => {
    const  res2 = await userStore.getUserBase(form.value);
    ElMessage({ type: 'success', message:res2.message });

}

const changephone = async() => {
    const  res1 = await PhoneAPI(form.value);
    ElMessage({ type: 'success', message:res1.message });
    userInfo.phone = form.value.phone

}
const changepass = async() => {
    const  res3 = await PasswordAPI(form.value);
    ElMessage({ type: 'success', message:res3.message });

}


const avatar = computed(() => userStore.userInfo.avatar)

</script>

<template>
<div class="page">
    <div>
        <div class="top">
            <el-avatar class="ava">
                <img :src="avatar"/>
            </el-avatar>
            <div style="margin:35px 10px auto 20px">
                <div style="margin-bottom: 5px;">用户昵称:{{ userInfo.username }}</div>
            </div>
        </div>

        <div style="margin: 20px 10px;">
            <div class="distance">性  别: {{ userInfo.gender  }}</div>
            <div class="distance">手机号：{{ userInfo.phone }}</div>
            <div class="distance">单  位：{{ userInfo.organization  }}</div>
        </div>
    </div>


    <div style="margin-left: auto;">


        <div class="distance">
            <el-button type="primary" style="width: 101px;" plain @click="dialogVisible = true">修改基本信息</el-button>

            <!-- 编辑资料弹窗 -->
            <el-dialog
            v-model="dialogVisible"
                title="编辑资料"
                width="30%"
                center
                >
                <div class="inside">
                <el-form :model="form">
                    <div style="margin-bottom: 8px;">用户昵称：</div>
                    <el-form-item>
                        <el-input v-model="form.username"/>
                    </el-form-item>
                    <div>性别：</div>
                    <el-radio-group v-model="form.gender" style="margin-bottom: 8px;">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                    <div style="margin-bottom: 8px;">单位：</div>
                    <el-form-item>
                        <el-input v-model="form.organization" style="margin-bottom: 20px;"/>
                    </el-form-item>
                </el-form>
                </div>
                <span slot="footer">
                <el-button @click="dialogVisible = false" style="margin-left: 53%;">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false; changebase()">确 定</el-button>
                </span>
            </el-dialog>

        </div>

        <div class="distance">
        <el-button type="primary" plain @click="phonewindow = true">修改手机号</el-button>

            <!-- 更改手机号弹窗 -->
            <el-dialog
            v-model="phonewindow"
                title="更改手机号"
                width="30%"
                center
                >
                <div class="inside">
                <el-form :model="form">
                    <div style="margin-bottom: 8px;">新手机号：</div>
                    <el-form-item>
                        <el-input v-model="form.phone"/>
                    </el-form-item>
                    <div>密码：</div>
                    <el-form-item>
                        <el-input type="password" v-model="form.password"/>
                    </el-form-item>
                </el-form>
                </div>
                <span slot="footer">
                <el-button @click="phonewindow = false" style="margin-left: 53%;">取 消</el-button>
                <el-button type="primary" @click="phonewindow = false; changephone()">确 定</el-button>
                </span>
            </el-dialog>

        </div>


        <div class="distance">
            <el-button type="primary" style="width: 101px;" plain @click="passwindow = true">修改密码</el-button>

             <!-- 修改密码弹窗 -->
            <el-dialog
                v-model="passwindow"
                title="修改密码"
                width="30%"
                center
                >
                <div class="inside">
                <el-form :model="form">
                    <div>旧密码：</div>
                    <el-form-item >
                        <el-input type="password" v-model="form.oldPassword"/>
                    </el-form-item>
                    <div>新密码：</div>
                    <el-form-item>
                        <el-input id="" type="password" v-model="form.newPassword"/>
                    </el-form-item>
                    <div>确认密码：</div>
                    <el-form-item>
                        <el-input id="" type="password" v-model="form.twoPassword"/>
                    </el-form-item>
                </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button @click="passwindow = false" style="margin-left: 53%;">取 消</el-button>
                <el-button type="primary" @click="passwindow = false; changepass()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div style="margin-top: 400px;">
            <a href="/"></a>
            <el-popconfirm width="220"
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="确认退出登录?"
                @confirm="confirmEvent"
            >
            <template #reference>
                <el-button type="danger" style="width: 101px;" plain>退出登录</el-button>
            </template>
            </el-popconfirm>
        </div>
    </div>

</div>
</template>

<style>
.page{
    margin: 50px 100px;
    display: flex;
}
.top{
    display: flex;
}
.ava{
    width: 100px;
    height: 100px;
}
.distance{
    margin-bottom: 10px;
}
.inside{
    width: 80%;
    margin-left: 10%;
}
</style>
