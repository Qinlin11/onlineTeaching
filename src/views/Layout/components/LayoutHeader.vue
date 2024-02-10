<script setup>
import { computed, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import http from "@/utils/http";
import { useResourcesStore } from "@/stores/resourcesStore";
import { useUserStore } from "@/stores/userStore";

const form = ref({
    word: ''
})
const route = useRoute();
console.log(route.path)

// var avatar = document.getElementById("Infor")
// avatar.onclick = function(){
//   window.location.href="/user";
// }
// // function Infor()

const dialogVisible = ref(false);
const uploadFormRef = ref(0)
const uploadUrl = "seminar/upload"; // 替换为实际的文件上传接口地址
const uploadForm = ref({
    resource_name: "",
    type: "",
    file: null,
    progress: 0
});

const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];

function showUploadDialog() {
    dialogVisible.value = true;
    resetUploadForm();
}

const resetUploadForm =() => {
    nextTick(() => {
        Object.assign(uploadForm.value, {
            resource_name: "",
            type: "",
            file: null,
            progress: 0, // 重置上传进度为 0
        });
    });
}

function handleChange(file, fileList) {
    const fileType = file.raw.type;

    if (!allowedTypes.includes(fileType)) {
        ElMessage.error('只能上传 pdf、docx、xlsx、pptx 格式的文件')
        return false;
    }

    // 执行手动的文件上传操作，将文件加入上传队列
    uploadForm.value.file = file.raw;
    console.log(uploadForm.value.file )

}
const uploadFileRef = ref(null)
function handleUploadSuccess(response, file) {
    // 文件上传成功的回调函数
    console.log("文件上传成功:", response);

    uploadForm.value.progress = 0; // 重置进度条
    uploadForm.value.file = null; // 重置上传表单
    uploadForm.value.resource_name = '';
    uploadForm.value.type = '';

    uploadFileRef.value.clearFiles(); // 清空已选文件
    useResources.getFileALLData(); // 刷新文件列表
    dialogVisible.value = false; // 关闭文件上传对话框

    ElMessage({
        message: "上传成功",
        type: "success",
    });
}


function handleUploadError(error, file) {
    // 文件上传失败的回调函数
    console.error("文件上传失败:", error);
}
const useResources = useResourcesStore()

function submitUploadForm() {
    const formRef = uploadFormRef.value;

    formRef.validate((valid) => {
        if (valid) {
            // 执行文件上传操作
            const formData = new FormData();
            formData.append("resource_name", uploadForm.value.resource_name);
            formData.append("type", uploadForm.value.type);
            formData.append("file", uploadForm.value.file);
            formData.append('seminar_id', '1')

            const config = {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    uploadForm.value.progress = percentCompleted; // 更新上传进度
                },
            };

            // 发送文件上传请求
            // 替换为实际的文件上传请求
            http.post(uploadUrl, formData, config).then(
                (response) => {
                    // 文件上传成功的回调函数
                    console.log("文件上传成功:", response.data);
                    resetUploadForm()
                    uploadFileRef.value.clearFiles()
                    useResources.getFileALLData()
                    uploadForm.value.file = null
                    uploadForm.value.resource_name = ''
                    uploadForm.value.type = ''
                    ElMessage({
                        message: '上传成功',
                        type: 'success'
                    })
                    dialogVisible.value = false;
                },
                (error) => {
                    // 文件上传失败的回调函数
                    console.error("文件上传失败:", error);
                }
            );

        } else {
            console.log("表单校验失败");
            return false;
        }
    });
}

const userStore = useUserStore()
const avatar = computed(() => userStore.userInfo.avatar)
</script>

<template>
  <header class="app-header">
    <div class="container">
        <div class="avatar">
            <el-avatar size="large" >
                <a href="/UserInformation"><img :src="avatar" style="width: 56px; height: 56px;"/></a>
            </el-avatar>
        </div>
      <div class="search-header">
        <el-form class="el-form" :model="form">
          <el-form-item class="el-form-item" prop="word">
            <div class="search-item">
              <div class="search-input">
                <input class="nav-search-input" v-model="form.word" placeholder="搜索"/>
              </div>
              <div class="search-svg">
                <span class="icon iconfont icon-fenxiang"></span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <ul class="right-header">
        <template v-if="$route.path === '/myhome' ">
          <li>
            <div class="nav-recycle" style="height: 38px">
              <el-button style="background-color: #f1f2f3;border: none" class="custom">
                <span class="icon iconfont icon-lajixiang"></span>
                <span>回收站</span>
              </el-button>
            </div>
          </li>
          <li>
            <div class="nav-upload">
              <el-upload class="upload-demo" style="height: 38px;">
                <el-button class="custom" style="background-color: #f1f2f3;border: none" plain>
                  <span class="icon iconfont icon-yunshangchuan"
                        style="line-height: 26px;padding: 0 6px;"></span>
                  导入文件
                </el-button>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="new-built">
              <el-button class="custom" style="background-color: #f1f2f3;border: none" plain>
                <span class="icon iconfont icon-add" style="line-height: 26px;padding: 0 6px;"></span>
                新建文件
              </el-button>
            </div>
          </li>
        </template>
        <template v-else-if="$route.path === '/seminarcentre'">
          <li>
            <div class="new-built">
              <el-button class="custom" style="background-color: #f1f2f3;border: none" plain>
                <span class="icon iconfont icon-add"
                      style="line-height: 26px;padding: 0 6px;"></span>
                创建/或加入教研组
              </el-button>
            </div>
          </li>
        </template>
        <template v-else>
          <li>
            <div class="new-built">
              <el-button class="custom" style="background-color: #f1f2f3;border: none" plain @click="showUploadDialog">
                <span class="icon iconfont icon-add"
                      style="line-height: 26px;padding: 0 6px;"></span>
                上传资源
              </el-button>
            </div>
          </li>
        </template>
      </ul>

    </div>
  </header>
    <el-dialog
            title="上传文件"
            v-model="dialogVisible"
            :close-on-click-modal="false"
    >
        <el-form ref="uploadFormRef" :model="uploadForm" label-width="80px">
            <el-form-item label="资源名称" prop="resource_name">
                <el-input v-model="uploadForm.resource_name"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="uploadForm.type">
                    <el-option label="教案" value="1"></el-option>
                    <el-option label="导学案" value="2"></el-option>
                    <el-option label="课件" value="3"></el-option>
                    <el-option label="试题" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="uploadForm.progress" label="上传进度">
                <el-progress style="width: 100%;height: 100%;" :percentage="uploadForm.progress" :indeterminate="true" v-show="uploadForm.progress"/>
            </el-form-item>
            <el-form-item label="文件">
                <el-upload
                        ref="uploadFileRef"
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-success="handleUploadSuccess"
                        :on-error="handleUploadError"
                        :on-change="handleChange"
                        :auto-upload="false"
                >
                    <el-button size="small" type="primary">选择文件</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传pptx、pdf、excel、docx格式，最大为5M
                        </div>
                    </template>
                </el-upload>
            </el-form-item>

        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false" :disabled="uploadForm.progress === '' ">取消</el-button>
            <el-button type="primary" :disabled="uploadForm.progress === '' " @click="submitUploadForm()">
              上传
            </el-button>
          </span>
        </template>

    </el-dialog>
</template>

<style scoped lang="less">
.app-header {
  background: skyblue;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    .avatar {
      display: flex;
      align-items: center;
      padding: 0 20px;
    }


    .search-header {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      position: relative;
      left: 10%;
      //width: 30%;

      .el-form {
        padding: 0 16px;
        display: flex;
        align-items: center;
        height: 32px;


        .el-form-item {
          justify-content: flex-start;
          align-items: center;
          border: 1px solid #e3e5e7;
          background-color: #f1f2f3;
          border-radius: 6px;
          margin-bottom: 0;
          flex: 1;
          opacity: 9;
          height: 120%;

          .search-item {
            display: flex;
            align-items: center;
            border: 2px solid transparent;
            width: 100%;


            .search-input {
              list-style: none;
              //opacity: 0;
              display: flex;
              align-items: center;

              .nav-search-input {
                flex: 1;
                border: none;
                box-shadow: none;
                background-color: transparent;
                overflow: hidden;
                outline: none;
                line-height: 25px;
                font-size: 16px;
              }

              .nav-search-input:focus {
                //color: red;
                background-color: #ffffff;
                border-radius: 6px;
              }
            }

            .search-svg {
              display: flex;
              align-items: center;
              //text-align: center;
              width: 35px;
              height: 35px;
              padding: 0 7px;

              span {
                align-items: center;
                width: 100%;
                height: 100%;

              }
            }
          }
        }
      }

    }

    .right-header {
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      //width: 70%;
      flex: 1;

      li {

        border: 1px solid #e3e5e7;
        background-color: #f1f2f3;
        border-radius: 6px;

        .nav-recycle {
          display: flex;
          align-items: center;

          span {
            line-height: 26px;
            padding: 6px;
          }
        }

        .nav-upload {
          display: flex;
          align-items: center;
          height: 38px;

          .upload-demo {
            width: 100%;
            display: flex;
            align-items: center;

            .span {
              line-height: 32px;
            }
          }
        }

        .new-built {
          display: flex;
          align-items: center;
          height: 38px;
        }
      }
    }
  }


}

.upload-progress {
  width: 100%;
}
</style>
