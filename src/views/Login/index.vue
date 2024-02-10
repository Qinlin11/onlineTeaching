<script setup>
import { ref } from "vue";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from "@/stores/userStore";

const form = ref({
  phone: '13794133816',
  password: '874958120',
})
const route = useRoute()
const router = useRouter()
//有后端连接
const isChecked = ref(false)
const onLogin = async () => {
    if(isChecked.value){
        let toPath = route.query.redirect || '/';
        const { phone, password } = form.value
        const userStore = useUserStore()
        await userStore.getUserInfo({ phone, password })
        router.push(toPath)
        ElMessage({ type: 'success', message: '登录成功' })
    }else {
        ElMessage({ type: 'warning', message: '请先同意隐私条款和服务条款' })
    }
}

</script>

<template>
  <div class="bg">
    <div class="login">
      <div class="login-right">
        <div class="form">
          <span>登录</span>
          <el-form :model="form" label-position="top" label-width="80" class="el-form">
            <el-form-item prop="phone" label="手机号">
              <el-input id="phone" placeholder="手机号" v-model="form.phone" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input id="password" type="password" placeholder="密码" v-model="form.password" />
            </el-form-item>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label-width="22px" class="custom-form-item">
                <el-checkbox v-model="isChecked" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <a class="reset">忘记密码</a>
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-button style="flex-grow: 1" type="primary" id="submit" round @click="onLogin">登录</el-button>
            </div>
            <div style="display: flex; align-items: flex-end; flex-direction: column;margin-top: 5px">
              <el-form-item>
                <span>首次使用？<router-link to="/register" style="color: skyblue">前往注册</router-link></span>
              </el-form-item>
            </div>

          </el-form>

        </div>

      </div>


    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background: url("../../assets/loginbg.png") no-repeat;
  position: absolute;
  left: 0px;
  top: 0px;
}

.login {
  width: 600px;
  height: 371px;
  background-color: rgb(230, 244, 255);
  text-align: center;
  position: relative;
  top: 25%;
  left: 30%;
  border-radius: 10px;

  .login-right {
    width: 285px;
    height: 100%;
    float: left;
    left: 27%;
    position: relative;

    .form {
      margin-top: 66px;
      width: 100%;
      height: 100%;

      .el-form {
        text-align: center;
      }

      >span {
        text-align: left;
        position: absolute;
        top: 15px;
        left: -5px;
        font-size: 24px;
        font-weight: 700;
      }
    }
  }

}

.reset {
  color: skyblue;
  margin-top: 5px;
}

@media screen and (max-width: 670px) {
  .login {
    width: 350px;
    height: 371px;
    background-color: rgb(230, 244, 255);
    text-align: center;
    position: relative;
    top: 25%;
    left: 5%;
    border-radius: 10px;

    .login-right {
      width: 285px;
      height: 100%;
      float: left;
      left: 10%;
      position: relative;
    }
  }
}

@media screen and (max-width: 1000px) and(min-width: 670px) {
  .login {
    width: 500px;
    height: 371px;
    background-color: rgb(230, 244, 255);
    text-align: center;
    position: relative;
    top: 25%;
    left: 25%;
    border-radius: 10px;

    .login-right {
      width: 285px;
      height: 100%;
      float: left;
      left: 20%;
      position: relative;
    }
  }
}</style>
