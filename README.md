## 安装
npm i webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-prese
t-stage-0 style-loader css-loader less-loader file-loader url-loader html-webpack-plugin -S
 在安装一个 babel-preset-react -S
 ## 入口文件
 1. 单入口文件src下的index.js
Webpack需要一个入口文件。它指明了Webpack从哪一个模块开始打包。它的默认值如下：

module.exports = {
  entry: './src/index.js'
};

它意味着Webpack会找到’./src/index.js’这个文件，从它开始打包。你在index.js中使用的任何导入，Webpack都会处理它们。但对于单页应用（single page applications），它通常只有一个入口。
你可以有超过一个的入口起点，多入口文件

entry: {
        index: './src/index.js',
        list: './src/list.js'
    },
index和list是键值，可以用这个键值生成出口文件的名字，并且使用HtmlWebpackPlugin的chunks属性引入。

2. output
output是用来配置Webpack把你的包输出到哪儿的。它默认输出到’./dist/main.js’。

// webpack.config.js

const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};

1. output的多入口文件
// webpack.config.js

const path = require('path');
module.exports = {
  entry: {
        index: './src/index.js',
        list: './src/list.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
};


2. output的hash
hash一般是结合缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应打包文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发服务器从源服务器上拉取对应数据，进而更新本地缓存。
三种hash类型hash、chuckhash、contenthash

hash： hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值。（the hash of the module identifier）
chuckhash： 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。（the hash of the chunk content），
contentHash： 对抽离出来的文件生成对应的hash。（the hash of extracted content）
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
let pathToClean = ['dist']

module.exports = {
    entry: {
        index: './src/index.js',
        list: './src/list.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: ['style-loader', 'css-loader']
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            chunks:['index'],
            filename:'index.html',
            minify:{
                collapseWhitespace:true 
            },
            template: './index.html' 
        }),
        new HtmlWebpackPlugin({ 
            chunks:['list'],
            filename:'index2.html',
            minify:{
                collapseWhitespace:true 
            },
            template: './index2.html' 
        }),
        new CleanWebpackPlugin(pathToClean)
      ]
