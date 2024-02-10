<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')

const checked1 = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(true)
const checked5 = ref(true)
const checked6 = ref(true)
const checked7 = ref(true)
const radio1 = ref('1')
const radio2 = ref('2')
const radio3 = ref('3')
const value = ref(new Date())
const value1 = ref<[Date, Date]>([
    new Date(2016, 9, 10, 8, 40),
    new Date(2016, 9, 10, 9, 40),
])
</script>


<template>
    <form class="form" >sour</form>
    <div class="item">主题：<el-input v-model="input" placeholder="请输入主题" required /></div>
    <div class="item">开始时间： <el-calendar v-model="value" />
      <div class="demo-range">
        <el-time-picker v-model="value1" is-range range-separator="To" start-placeholder="Start time"
          end-placeholder="End time" />
      </div>
    </div>
    <div class="item">时区<el-input v-model="input" placeholder="请选择时区" /></div>
    <div class="item"> 是否重复？
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio label="1" size="large">是</el-radio>
        <el-radio label="2" size="large">否</el-radio>
      </el-radio-group>
    </div>
    <div class="item">日历
      <div><el-checkbox v-model="checked1" label="添加到日历" size="large" />
        <div class="my-2 flex items-center text-sm">
          <el-radio-group v-model="radio2" class="ml-4">
            <el-radio label="3">Outlook</el-radio>
            <el-radio label="4">其他日历</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="item">安全
      <div>
        <el-checkbox v-model="checked2" label="入会密码" size="large" />
        <el-checkbox v-model="checked3" label="开启等候室" size="large" />
        <el-checkbox v-model="checked4" label="允许成员在主持人加入会议时进入" size="large" />
        <el-checkbox v-model="checked5" label="开启会议水印" size="large" />
      </div>
    </div>
    <div class="item">静音
      <div>成员入会时静音</div>
      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="radio3" class="ml-4">
          <el-radio label="5" size="large">是</el-radio>
          <el-radio label="6" size="large">否</el-radio>
          <el-radio label="7" size="large">超过六人自动开启静音</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="item">录制
      <div>
        <el-checkbox v-model="checked6" label="自动云录制" size="large" />
      </div>
    </div>
    <div class="item">文档
      <div>
        <el-checkbox v-model="checked7" label="允许成员上传文档" size="large" />
      </div>
    </div>
    <el-button type="primary">创建会议</el-button>
  
</template>
<style scoped>
.item{
    margin-top:20px;
    font-size: 22px;
    margin-left:50px;
}
.form{
    width:500px;
    height: 500px;
    
}

</style>