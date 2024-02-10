<template>
    <div class="content">
        <p  id="editor" ref="editor" style="z-index: -1" class="editor"></p>
        <el-input id="in" type="hidden" v-model="data.editorContent"></el-input>
    </div>
</template>

<script>
import EWangEditor from "wangeditor";
import { onMounted, reactive, watch } from "vue";
import http from "@/utils/http";
export default {
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        let data = reactive({
            editorContent: ''
        });
        let editor = null

        onMounted(() => {
            editor = new EWangEditor("#editor");
            editor.config.uploadImgShowBase64 = true;
            editor.config.onchangeTimeout = 400;

            editor.config.customAlert = (err) => {
                console.log(err);
            };

            editor.customConfig = editor.customConfig
                ? editor.customConfig
                : editor.config;

            editor.customConfig.onchange = (html) => {
                data.editorContent = html;
                emit('update:modelValue', html);
            };

            const menuItem = [
                "head",
                "bold",
                "fontSize",
                "fontName",
                "italic",
                "underline",
                "strikeThrough",
                "indent",
                "lineHeight",
                "foreColor",
                "backColor",
                "link",
                "list",
                "todo",
                "justify",
                "quote",
                "emoticon",
                "image",
                "video",
                "table",
                "code",
                "splitLine",
                "undo",
                "redo"
            ];

            editor.config.menus = [...menuItem];
            editor.config.colors = ["#000000", "#D8D8D8", "#1c487f", "#4d80bf"];
            editor.config.fontNames = [
                "黑体",
                "仿宋",
                "楷体",
                "标楷体",
                "华文仿宋",
                "华文楷体",
                "宋体",
                "微软雅黑"
            ];
            editor.config.height = 350;

            editor.customConfig.customUploadImg = function (files, insert) {
                const formData = new FormData();
                formData.append("file", files[0]);
                http({
                        method: 'post',
                        url: 'http://8.130.174.199/api/uploadimg',
                        data: formData,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(
                        (res) => {
                            // console.log(res.data.data.url)
                            insert(res.data.data.url);
                        },
                        (err) => {
                            console.log("上传图片失败" + err.data);
                        }
                    );
            };

            editor.create();
            // 设置编辑器内容
            editor.txt.html(props.modelValue);
            data.editorContent = props.modelValue;
            // console.log(props.modelValue)
        });

        watch(
            () => props.modelValue,
            (newValue) => {
                data.editorContent = newValue;
                editor.txt.html(props.modelValue);
                document.getElementById("in").value = newValue;
            }
        );

        return { data };
    }
};
</script>


<style scoped>
.content {
    width: 600px;
}
</style>
