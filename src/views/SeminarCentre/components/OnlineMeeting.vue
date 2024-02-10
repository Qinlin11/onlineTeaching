<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid'
import { useRouter }  from "vue-router";

const value0 = ref("");


const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(true);
const checked5 = ref(true);
const checked6 = ref(true);
const checked7 = ref(true);
const radio1 = ref("1");
const radio2 = ref("2");
const radio3 = ref("3");
const activeName = ref("first");
const value = ref(new Date());
const formattedValue = computed(() => {
    const date = value.value;
    return date.toLocaleString(); // 将日期对象转换为字符串格式
});

const handleClick = (tab, event) => {
  console.log(tab, event);
};
const isFormVisible = ref(false);


const closeForm = () => {
    isFormVisible.value = false
    createFormData.value.roomId = ''
}

const isJoinVisible = ref(false)
// 创建会议表单数据
const createFormData = ref({
    roomId: '',
    password: ''
})
const showForm = () => {
    isFormVisible.value = true;
    createFormData.value.roomId = uuidv4()
};
const router = useRouter()
const submitForm = () => {
    router.push({
        path: '/online',
        query: {
            isCreate: true,
            roomId: createFormData.value.roomId
        }
    })
};
// 加入会议表单数据
const joinFormData = ref({
    meetingId: '',
    password: ''
})
const joinShow = () => {
    isJoinVisible.value = true
}
const joinMeeting = () => {
    router.push({
        path: '/online',
        query: {
            isJoin: true,
            joinId: joinFormData.value.meetingId
        }
    })
}
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" @click="handleClick">
    <el-tab-pane label="发起会议" name="first" class="open">
      <div class="start">
          <div class="main">
              <div class="card-box">
                  <span>创建会议</span>
                  <div class="add-button" @click="showForm">
                      <div class="cross"></div>
                  </div>
              </div>
              <div class="card-box">
                  <span>加入会议</span>
                  <div class="add-button" @click="joinShow">
                      <div class="cross"></div>
                  </div>
              </div>
          </div>
      </div>

    </el-tab-pane>

    <el-tab-pane label="历史会议" name="second" class="history">
      <div class="main-right-main">
        <div class="right-main-list">
          <div class="right-main-list-div">
            <div class="right-main-list-div-left">
              <div class="title">中秋主题班会</div>
              <div class="time">会议时间:2022-8-10</div>
            </div>
            <div class="right-main-list-div-right">观看回放</div>
          </div>
        </div>
        <div class="right-main-list">
          <div class="right-main-list-div">
            <div class="right-main-list-div-left">
              <div class="title">中秋主题班会</div>
              <div class="time">会议时间:2022-8-10</div>
            </div>
            <div class="right-main-list-div-right">观看回放</div>
          </div>
        </div>
        <div class="right-main-list">
          <div class="right-main-list-div">
            <div class="right-main-list-div-left">
              <div class="title">中秋主题班会</div>
              <div class="time">会议时间:2022-8-10</div>
            </div>
            <div class="right-main-list-div-right">观看回放</div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="isFormVisible" title="创建会议" @close="closeForm">
    <div class="form_container">
      <el-form
        ref="taskObj"
        style="max-height: 800px; overflow-y: scroll"
        class="form"
        title="发起会议"
      >
        <div class="item">
          主题
          <el-input
            class="input"
            v-model="createFormData.roomId"
            placeholder="请输入会议房间ID"
            required
          />
        </div>
        <div class="item">
          开始
          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model="value0"
                type="date"
                placeholder="Pick a day"
              />
            </div>
          </div>

          <el-time-select
            class="showtime"
            v-model="formattedValue"
            start="08:30"
            step="00:15"
            end="18:30"
            placeholder="Select"
          />
        </div>
        <div class="item">
          时区
          <select class="input">
            <option>（GMT-11:00)纽埃时间</option>
            <option>（GMT-11:00）萨摩亚标准时间</option>
            <option>（GMT-10:00）夏威夷-阿留申时间</option>
            <option>GMT-10:00）库克群岛标准时间</option>
            <option>（GMT-10:00）塔西提岛时间</option>
            <option>（GMT-09.30)马克萨斯群岛时间</option>
            <option>（GMT-09:00)阿拉斯加时间</option>
            <option>（GMT-09:00)甘比尔时间</option>
            <option>（GMT-08:00）北太平洋时间</option>
            <option>（GMT-08:00）皮特凯恩时间</option>
            <option>（GMT-07:00）北美山区标准时间</option>
            <option>（GMT-06:00）北美中部时间</option>
            <option>（GMT-06:00）加拉帕戈斯时间</option>
            <option>（GMT-05:00）北美东部标准时间</option>
            <option>（GMT-05:00）哥比亚标准时间</option>
            <option>（GMT-04:00）大西洋标准时间</option>
            <option>（GMT-04:00）亚马逊标准时间</option>
            <option>（GMT-03：30）纽芬兰时间</option>
            <option>（GMT-03：00）巴西利亚标准时间</option>
            <option>（GMT-03：00）阿根廷标准时间</option>
            <option>（GMT-03：00）巴拉圭时间</option>
            <option>（GMT-03：00）法属圭亚那标准时间</option>
            <option>（GMT-03：00）圣皮埃尔和米尔隆群岛时间</option>
            <option>（GMT-03：00）乌拉圭标准时间</option>
            <option>（GMT-03：00）格陵兰岛西部时间</option>
            <option>（GMT-03：00）苏里南时间</option>
            <option>（GMT-03：00）蓬塔阿雷纳斯时间</option>
            <option>（GMT-03：00）智利时间</option>
            <option>（GMT-03：00）帕默尔时间</option>
            <option>（GMT-03：00）罗瑟拉时间</option>
            <option>（GMT-03：00）福克兰群岛标准时间</option>
            <option>（GMT-02：00）费尔南多-迪诺罗尼亚岛标准时间</option>
            <option>（GMT-02：00）南乔治亚岛时间</option>
            <option>（GMT-01：00）格陵兰岛东部时间</option>
            <option>（GMT-01：00）亚速尔群岛时间</option>
            <option>（GMT-01：00）佛得角标准时间</option>
            <option>（GMT-00：00）格林尼治标准时间</option>
            <option>（GMT-00：00）特罗尔时间</option>
            <option>（GMT-00：00）西欧时间</option>
            <option>（GMT-00：00）爱尔兰时间</option>
            <option>（GMT-00：00）英国时间</option>
            <option>（GMT-00：00）协调世界时</option>
            <option>（GMT+01：00）中欧标准时间</option>
            <option>（GMT+01：00）摩洛哥时间</option>
            <option>（GMT+01：00）西撒哈拉时间</option>
            <option>（GMT+01：00）西部非洲标准时间</option>
            <option>（GMT+02：00）东欧标准时间</option>
            <option>（GMT+02：00）南非标准时间</option>
            <option>（GMT+02：00）中部非洲时间</option>
            <option>（GMT+02：00）法玛古斯塔时间</option>
            <option>（GMT+02：00）以色列时间</option>
            <option>（GMT+03：00）东部非洲时间</option>
            <option>（GMT+03：00）昭和时间</option>
            <option>（GMT+03：00）阿拉伯标准时间</option>
            <option>（GMT+03：00）土耳其时间</option>
            <option>（GMT+03：00）基洛夫时间</option>
            <option>（GMT+03：00）莫斯科标准时间</option>
            <option>（GMT+03：30）伊朗时间</option>
            <option>（GMT+04：00）阿塞拜疆标准时间</option>
            <option>（GMT+04：00）海湾标准时间</option>
            <option>（GMT+04：00）格鲁吉亚标准时间</option>
            <option>（GMT+04：00）亚美尼亚标准时间</option>
            <option>（GMT+04：00）阿斯特拉罕时间</option>
            <option>（GMT+04：00）萨马拉标准时间</option>
            <option>（GMT+04：00）萨拉托夫标准时间</option>
            <option>（GMT+04：00）乌里扬诺夫斯克时间</option>
            <option>（GMT+04：00）伏尔加格勒标准时间</option>
            <option>（GMT+04：00）塞舌尔时间</option>
            <option>（GMT+04：00）毛里求斯标准时间</option>
            <option>（GMT+04：00）留尼汪时间</option>
            <option>（GMT+04：30）阿富汗时间</option>
            <option>（GMT+05：00）莫森时间</option>
            <option>（GMT+05：00）艾萨克斯坦西部时间</option>
            <option>（GMT+05：00）土库曼斯坦标准时间</option>
            <option>（GMT+05：00）塔吉克斯坦时间</option>
            <option>（GMT+05：00）巴基斯坦标准时间</option>
            <option>（GMT+05：00）乌兹别克斯坦标准时间</option>
            <option>（GMT+05：00）叶卡捷琳堡标准时间</option>
            <option>（GMT+05：00）法属南方和南极领地时间</option>
            <option>（GMT+05：00）马尔代夫时间</option>
            <option>（GMT+05：30）印度时间</option>
            <option>（GMT+05：45）尼泊尔时间</option>
            <option>（GMT+06：00）沃斯托克时间</option>
            <option>（GMT+06：00）哈萨克斯坦东部时间</option>
            <option>（GMT+06：00）吉尔吉斯斯坦时间</option>
            <option>（GMT+06：00）孟加拉标准时间</option>
            <option>（GMT+06：00）鄂木斯克标准时间</option>
            <option>（GMT+06：00）不丹时间</option>
            <option>（GMT+06：00）印度洋时间</option>
            <option>（GMT+06：30）缅甸时间</option>
            <option>（GMT+06：30）科科斯群岛时间</option>
            <option>（GMT+07：00）戴维斯时间</option>
            <option>（GMT+07：00）中南半岛时间</option>
            <option>（GMT+07：00）马尔瑙尔时间</option>
            <option>（GMT+07：00）科布多标准时间</option>
            <option>（GMT+07：00）印度尼西亚西部时间</option>
            <option>（GMT+07：00）克拉斯诺亚尔斯克标准时间</option>
            <option>（GMT+07：00）新西伯利亚标准时间</option>
            <option>（GMT+07：00）托木斯克时间</option>
            <option>（GMT+07：00）圣诞岛时间</option>
            <option>（GMT+08：00）澳大利亚西部标准时间</option>
            <option>（GMT+08：00）文莱达鲁萨兰时间</option>
            <option>（GMT+08：00）乔巴山标准时间</option>
            <option>（GMT+08：00）中国标准时间</option>
            <option>（GMT+08：00）伊尔库茨克标准时间</option>
            <option>（GMT+08：00）马来西亚时间</option>
            <option>（GMT+08：00）印度尼西亚中部时间</option>
            <option>（GMT+08：00）菲律宾标准时间</option>
            <option>（GMT+08：00）新加坡标准时间</option>
            <option>（GMT+08：00）乌兰巴托标准时间</option>
            <option>（GMT+08：45）澳大利亚中西部标准时间</option>
            <option>（GMT+09：00）雅库茨克标准时间</option>
            <option>（GMT+09：00）东帝汶时间</option>
            <option>（GMT+09：00）印度尼西亚东部时间</option>
            <option>（GMT+09：00）朝鲜标准时间</option>
            <option>（GMT+09：00）韩国标准时间</option>
            <option>（GMT+09：00）日本标准时间</option>
            <option>（GMT+09：00）帕劳时间</option>
            <option>（GMT+09：30）澳大利亚中部标准时间</option>
            <option>（GMT+10：00）迪蒙迪尔维尔时间</option>
            <option>（GMT+10：00）海参崴标准时间</option>
            <option>（GMT+10：00）澳大利亚东部标准时间</option>
            <option>（GMT+10：00）楚克时间</option>
            <option>（GMT+10：00）查莫罗时间</option>
            <option>（GMT+10：00）巴布亚新几内亚时间</option>
            <option>（GMT+10：30）澳大利亚中部时间</option>
            <option>（GMT+11：00）麦夸里岛时间</option>
            <option>（GMT+11：00）马加丹标准时间</option>
            <option>（GMT+11：00）库页岛标准时间</option>
            <option>（GMT+11：00）中科雷姆斯克时间</option>
            <option>（GMT+11：00）澳大利亚东部时间</option>
            <option>（GMT+11：00）豪勋爵岛时间</option>
            <option>（GMT+11：00）布干维尔时间</option>
            <option>（GMT+11：00）瓦努阿图标时间</option>
            <option>（GMT+11：00）所罗门群岛时间</option>
            <option>（GMT+11：00）科斯雷时间</option>
            <option>（GMT+11：00）新喀里多尼亚标准时间</option>
            <option>（GMT+11：00）波纳佩时间</option>
            <option>（GMT+12：00）阿纳德尔标准时间</option>
          </select>
        </div>
        <div class="item">
          重复
          <select class="input">
            <option>不重复</option>
            <option>每天</option>
            <option>工作日</option>
            <option>周末</option>
          </select>
        </div>
        <div class="item">
          日历
          <div class="historic">
            <el-checkbox v-model="checked1" label="添加到日历" size="large" />
          </div>
          <div type="hidden">
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">Outlook</el-radio>
              <el-radio label="2" size="large">其他日历</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          安全
          <div class="safe">
            <li>
              <el-checkbox v-model="checked2" label="入会密码" size="large" />
                <el-input v-show="checked2" v-model="createFormData.password" />
            </li>
            <li>
              <el-checkbox v-model="checked3" label="开启等候室" size="large" />
            </li>
            <li>
              <el-checkbox
                v-model="checked4"
                label="允许成员在主持进会前加入会议"
                size="large"
              />
            </li>
            <li>
              <el-checkbox
                v-model="checked5"
                label="开启会议水印"
                size="large"
              />
            </li>
          </div>
        </div>
        <div class="item">
          静音
          <div class="quiet">成员入会时静音</div>
          <el-radio-group v-model="radio2" class="ml-4">
            <el-radio label="3" size="large">开启</el-radio>
            <el-radio label="4" size="large">关闭</el-radio>
            <el-radio label="5" size="large">超过6人后自动开启</el-radio>
          </el-radio-group>
        </div>
        <div class="item">
          录制
          <div class="code">
            <el-checkbox v-model="checked6" label="自动云录制" size="large" />
            <div class="solo">
              <el-radio-group v-model="radio3" class="ml-4">
                <el-radio label="6" size="large">主持人入会后开启</el-radio>
                <el-radio label="7" size="large">成员入会后开启</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="item">
          文档
          <div class="code">
            <el-checkbox
              v-model="checked7"
              label="允许成员上传文档"
              size="large"
            />
          </div>
        </div>
        <div class="btn-container">
          <el-button type="primary" class="btn" @click="submitForm()">创建会议</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>

  <el-dialog v-model="isJoinVisible" title="加入会议">
      <el-form ref="joinForm" :model="joinFormData" label-width="100px">
          <el-form-item label="会议号码" prop="meetingId">
              <el-input v-model="joinFormData.meetingId"></el-input>
          </el-form-item>
          <el-form-item label="会议密码" prop="password">
              <el-input v-model="joinFormData.password" placeholder="没有则无需填写"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="joinMeeting">加入会议</el-button>
          </el-form-item>
      </el-form>
  </el-dialog>
</template>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs {
  background-color: #ffffff;
}

.form_container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: -45px;
  //z-index: 0;
}

.form {
  background-color: #ffffff;
  width: 500px;
  height: 700px;
  margin-top: 50px;
}

.item {
  color: #000000;
  margin-left: 15px;
  margin-top: 5px;
}

.input {
  color: #000000;
  width: 350px;
  height: 22px;
  margin-left: 15px;
}

.demo-date-picker {
  margin-left: 45px;
  width: 250px;
  height: 22px;
}

.block {
  margin-left: 3px;
  margin-top: -20px;
  width: 250px;
  height: 22px;
}

.showtime {
  width: 130px;
  height: 22px;
  margin-top: -50px;
  margin-left: 270px;
}

.historic {
  margin-left: 50px;
  margin-top: -30px;
}

.safe {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-left: 50px;
  margin-top: -30px;
}

.safe .li {
  display: inline-block;
  margin-left: 50px;
}

.quiet {
  margin-top: -25px;
  margin-left: 50px;
}

.code {
  margin-left: 50px;
  margin-top: -30px;
}

.btn_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.btn {
  margin-left: 150px;
  align-items: center;
  height: 200vh;
  width: 200px;
  height: 50px;
}

.open {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start {
  color: #0c0b0b;
  font-weight: 100;
}

.main-right-main {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .right-main-list {
    width: 100%;
    height: 30%;
    background-color: #f2f2f2;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    .right-main-list-div {
      width: 90%;
      height: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right-main-list-div-left {
        height: 100%;
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
          font-weight: 600;
          font-size: 16px;
        }

        .time {
          font-size: 10px;
          color: #8f8a8a;
        }
      }

      .right-main-list-div-right {
        cursor: pointer;
        flex: 1;
        height: 60%;
        background-color: #00a159;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      }
    }
  }
}

.main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 一行4列，每列平分剩余空间 */
  grid-gap: 10px;

  /* 列与列之间的间距 */
  .card-box {
    width: 270px;
    height: 270px;
    border: 1px solid #999;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px 0 0 10px;
    box-shadow:
            5px 5px 5px #f0f0f0,
              /* 右下角阴影 */
              -5px -5px 5px #f0f0f0,
              /* 左上角阴影 */
            -5px 5px 5px #f0f0f0,
              /* 左下角阴影 */
              5px -5px 5px #f0f0f0;
    /* 右上角阴影 */

    .add-button {
      width: 50px;
      height: 50px;
      border: 1px solid #999;
      border-radius: 5px;
      cursor: pointer;

      .cross {
        position: relative;
        width: 100%;
        height: 100%;

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 2px;
          background-color: #333;
        }

        &:before {
          transform: translate(-50%, -50%);
        }

        &:after {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
  }
}
</style>
