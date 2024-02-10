<template>
  <!-- 上传文件输入框 -->
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="命名：" class="label1" :error="nameError">
      <el-input v-model="form.name" class="input1"></el-input>
    </el-form-item>
    <el-form-item label="上传到：" :error="docError">
      <el-select v-model="form.doc" placeholder="选择文件夹">
        <el-option label="教案" value="1"></el-option>
        <el-option label="导学案" value="2"></el-option>
        <el-option label="课件" value="3"></el-option>
        <el-option label="试题" value="4"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <!-- 富文本编辑器 -->
  <div class="edit_box">
    <ElementTiptap v-model:content="content" :extensions="extensions" lang="zh" />
  </div>
  <el-button  class="submit-button" @click="handlePublish($event)">发布</el-button>
</template>

<script>
import { upLoad } from '@/apis/management'
export default {
  data() {
    return {
      form: {
        name: '',
        doc: '',
      },
      content: '',
      nameError: '',
      docError: '',
      submitted: false,
    };
  },
  methods: {
    handlePublish(event) {
      // 如果已经提交过一次，则提前返回
      if (this.submitted) {
        return;
      }
      //标记已提交
      this.submitted = true;
      // 清空错误消息
      this.nameError = '';

      // 提交表单
      try {
        this.handleSubmit(event)
      } catch (error) {
        // 错误处理，这里可以根据具体情况进行适当的处理
        console.error('Error handling submit', error);
      } finally {
        // 重置已提交标志
        this.submitted = false;
      }

    },
    async handleSubmit(event) {
      // 阻止表单的默认提交行为
      event.preventDefault();

      // 检查 name 是否为空
      if (this.form.name.trim() === '') {
        // 设置错误消息
        this.nameError = '请输入命名';

        // 将 submitted 标志设置为 false，表示表单未提交
        this.submitted = false;

        // 提前返回，防止继续执行提交操作
        return;
      } else if (this.form.doc === '') {
        //检查文件夹是否为空
        this.docError = '请选择保存位置';
        // 将 submitted 标志设置为 false，表示表单未提交
        this.submitted = false;
        return;
      }
      // 清空错误消息
      this.nameError = '';
      this.docError = '';

      // 处理编辑器中的图片上传
      try {
        // 在这里添加安全性检查
        console.log(this.form.name, this.form.doc, this.content)
        const params = {
          resource_name: this.form.name,
          resource_type: this.form.doc,
          content: this.content
        }
        console.log(params)
        const response = await upLoad(params);
        console.log(response)
        if (response.code === 200) {
          this.$message.success('上传成功！');
          // 在延迟后刷新页面
          setTimeout(() => {
                location.reload();
            }, 1000); // 1000 毫秒，即 1 秒
        }
      } catch (error) {
        console.error('Error', error);
        this.$message.error('上传失败！');
        if (error.response.status === 500) {
          this.nameError = error.response.data.message
        }
      }
    },
  },
};
</script>

<script setup>

import { ref } from 'vue';
import { ElementTiptap } from 'element-tiptap-vue3-fixed';
// 导入 ElementTiptap 的样式
import 'element-tiptap-vue3-fixed/lib/style.css';
import {
  Bold,
  BulletList,
  Color,
  Doc,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  Image,
  Italic,
  Link,
  OrderedList,
  Paragraph,
  SelectAll,
  Strike,
  Table,
  TaskList,
  Text,
  Underline,
} from 'element-tiptap-vue3-fixed';


const extensions = [
  Doc,
  Text,
  Paragraph,

  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }), // 在气泡菜单中渲染命令按钮。
  Underline.configure({ bubble: true, menubar: false }), // 在气泡菜单中渲染命令按钮，但不在菜单栏中。
  Link,
  Italic,
  Image.configure({
    draggable: true,
  }),
  Strike,
  BulletList,
  OrderedList,
  Highlight,
  Table, TaskList, FontFamily,
  FontSize, Color, SelectAll, Fullscreen,
];

// 编辑器的内容

const handlePaste = async (e) => {
  // 阻止默认粘贴行为
  e.preventDefault();
  let clipboardData = e.clipboardData;
  let items = clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      let file = items[i].getAsFile();

      try {
        const imageUrl = await uploadImage(file);
        const editor = tiptap.value.editor;
        console.log(editor)
        editor.chain().setImage({ src: imageUrl }).run()
      } catch (error) {
        console.error('Error handling pasted image', error);
      }

      break;
    }
  }
};

async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/resource_pool/create_resource', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);  // 确保 result 中包含 data 字段
      return result.data.url; // 返回图片的 URL
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading image', error);
    throw error;
  }
}
</script>
<style lang="less" scoped>
.label1 {
  margin-top: 30px;

  .input1 {
    width: 220px;
  }
}

.edit_box {
  margin: 50px;
  position: relative;
}

.submit-button {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1;
}
</style>
