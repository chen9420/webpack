let path=require('path');
let HtmlWebpackPlugin =require('html-webpack-plugin');
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve('./dist')
  },
  module:{
    rules:[
      {test:/\.js$/,use:'babel-loader',exclude:/node_modeles/},
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},

    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]

}