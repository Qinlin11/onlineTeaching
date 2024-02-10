<script setup>
import { ref } from "vue";
import { registerAPI } from "@/apis/user";
import { ElMessage } from 'element-plus'
const user = ref({
    phone: "",
    password: ""
})
const onRegister = async () => {
    const { phone, password } = user.value
    const res = await registerAPI({ phone, password })
    if(res.code === 200) {
        ElMessage({ type:'success', message:'注册成功' })
    }else {
        ElMessage({ type:'warning', message: res.data.message })
    }
}
</script>

<template>
  <div class="bg">
    <div class="register">
    <div class="register-wrap">
      <span>注册</span>
      <el-row class="register-form">
        <el-form ref="loginForm" :model="user" status-icon label-width="80" label-position="top">
          <el-form-item prop="phone" label="手机号">
            <el-input  placeholder="请输入手机号" v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input show-password placeholder="请输入密码" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex; flex-wrap: nowrap; align-items: flex-start; justify-content: flex-start;margin-bottom: 5px;margin-top: 3px;" >
              <span style="white-space: nowrap; margin-right: 5px;">验证码</span>
              <el-input style="width: 60%" placeholder="验证码"/>
              <div style="margin-left: 5px; width: 60%;display: flex; align-items: center;">
                <el-image src="http://localhost:8000/index/verify" fit="contain" style="border-radius: 6px;height: 100%; width: 120px; "/>
              </div>
            </div>
          </el-form-item>
          <div style="display: flex">
            <el-button style="flex-grow: 1" type="primary" round @click="onRegister">注册</el-button>
          </div>
          <div style="display: flex; align-items: flex-end; flex-direction: column;margin-top: 5px">
            <el-form-item>
              <span>已有账号？<router-link to="/" style="color: skyblue">前往登录</router-link></span>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
    </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
    width: 100%;
    height: 100%;
    background: url("../../assets/loginbg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 0px;
    top: 0px;
}
.register {
    width: 600px;
    height: 371px;
    background-color:rgb(230, 244, 255);
    text-align: center;
    position: relative;
    top: 25%;
    left: 30%;
    border-radius: 10px;

    .register-wrap {
      width: 285px;
      height: 100%;
      float: left;
      left:27%;
      position: relative;

      >span {
                text-align: left;
                position: absolute;
                top: 15px;
                left: -5px;
                font-size: 24px;
                font-weight: 700;

              }
        .register-form {
          margin-top: 66px;
          width: 100%;
          height: 100%;
        }
    }
}
@media screen and (max-width: 670px) {
    .register {
    width: 350px;
    height: 371px;
    background-color:rgb(230, 244, 255);
    text-align: center;
    position: relative;
    top: 25%;
    left: 5%;
    border-radius: 10px;

  .register-wrap {
    width: 285px;
    height: 100%;
    float: left;
    left:10%;
    position: relative;
    }
  }
}
@media screen and (max-width: 1000px) and(min-width: 670px){
    .register {
        width: 500px;
        height: 371px;
        background-color:rgb(230, 244, 255);
        text-align: center;
        position: relative;
        top: 25%;
        left: 25%;
        border-radius: 10px;

    .register-wrap {
        width: 285px;
        height: 100%;
        float: left;
        left:20%;
        position: relative;
    }
    }
}
</style>
