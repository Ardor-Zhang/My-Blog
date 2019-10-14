const context = require.context('./', false, /\.js$/);  // false 表示不遍历文件夹

export default context
    .keys()
    .filter(item => item !== './index.js')
    .map(key => context(key));