<template>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="会议主题">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="会议时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

  <el-row>
  <el-col :span="12">
    <el-form-item label="会议设置：" label-width="110px" style="width:200px;">
      <el-checkbox-group v-model="form.checkList">
        <el-form-item >
          <el-checkbox label="自动连接音频" name="checkList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启摄像头" name="checkList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启麦克风" name="checkList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启美颜" name="checkList"></el-checkbox>
        </el-form-item>
      </el-checkbox-group>
    </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item label="安全设置：" style="width:200px;">
      <el-checkbox-group v-model="form.scheckList">
        <el-form-item>
          <el-checkbox label="入会开启麦克风" name="scheckList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启美颜" name="scheckList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启麦克风" name="scheckList"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="入会开启美颜" name="scheckList"></el-checkbox>
        </el-form-item>
      </el-checkbox-group>
    </el-form-item>
  </el-col>
</el-row>
 <el-row >
  <el-col :span="12">
    <el-form-item label="静音设置：" label-width="110px"  style="width: 100px">
        <el-form-item label="成员入会是静音" label-width="120px">
      <el-radio-group v-model="form.slientList">
        <el-form-item >
          <el-radio label="符合" name="slientList"></el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio label="关闭" name="slientList"></el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio label="超过六人自动开启" name="slientList" style="width: 50px"></el-radio>
        </el-form-item>
      </el-radio-group>
        </el-form-item>
    </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item label="录制设置：" style="width:200px;">
      <el-radio v-model="form.radio">自动云录制</el-radio>
    </el-form-item>
    <el-form-item label="文档设置：" style="width:200px;">
      <el-radio v-model="form.doc">允许成员上传文档</el-radio>
    </el-form-item>
  </el-col>
</el-row>
  <el-form-item>
    <el-button type="primary" @click="onSubmit" >立即创建</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          checkList: [],
          scheckList: [],
          slientList:1,
          radio:0,
          doc:0,
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

    }
}
</script>

<style>

</style>