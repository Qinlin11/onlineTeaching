/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 0, //不再强制要求组件名
    // Vue/ESLint 推荐的规则
    // 'vue/html-indent': ['error', 2], // HTML 缩进为 2 个空格
    'vue/attribute-hyphenation': 'error', // 属性名使用连字符形式
    'vue/html-self-closing': 'off', // 关闭自闭合标签要求，根据个人或团队喜好配置
    "object-curly-spacing": ["error", "always"],
    'no-undef': 'off', // 允许使用全局变量 global
  },
}
