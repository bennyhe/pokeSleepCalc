module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'plugin:vue/vue3-essential'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  rules: {
    // 'vue/multi-word-component-names': 'off',
    'vue/html-closing-bracket-newline': 'off', // 不强制换行
    'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 5 }
    }], // vue template模板元素第一行最多5个属性

    'no-var': 'error', // 禁止使用 var
    'no-console': 'warn', //警告console
    'semi': ['error', 'never'], // 禁止每行结尾带;分号
    'indent': ['error', 2], // 缩进2格
    'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
    'quotes': [2, 'single'], // 使用单引号
    'no-shadow': 'error', // 禁止局部变量和全局变量重名
    'prefer-const': 'error', // 无需重新赋值的变量转成const定义
    'comma-dangle': [2, 'never'], // 禁止使用拖尾逗号
    'arrow-parens': ['error', 'as-needed'], // =>链式时多参数必须括号，单参数省略括号
    'no-confusing-arrow': 'error', // 避免混淆箭头函数语法（=>）和比较运算符（<=， >=）
    'array-callback-return': 'error', //array方法(map, filter, reduce等)强制检查return
    'no-nested-ternary': 'error', //不允许嵌套的三元表达式
    'no-lonely-if': 'error' // 不允许将if语句作为else块中的唯一语句。
  }
}
