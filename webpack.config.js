const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry:{
    index: path.resolve(__dirname, './src/index.js')
  },
  output:{
   path: path.resolve(__dirname, 'dist'),
   filename: 'bundle.js'
  },
  devServer:{
   contentBase: path.join(__dirname, '/'),
   compress: true,
   port: 9000
  },
  plugins:[
   new MiniCssExtractPlugin({
    filename: '[name].css'
   }),
   new HtmlWebpackPlugin({
    title: 'API GitHub',
    filename: './index.html',
    template: path.resolve(__dirname, './index.html'),
  })
  ],
  module:{
   rules:[
    {
     test: /\.(js|jsx)$/,
     exclude: /(node_modules)/,
     use:{
      loader: 'babel-loader',
      options:{
          presets: ['@babel/preset-env','@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
      }
     }
    },
    {
     test: /\.css$/i,
     use: [
      {
       loader: MiniCssExtractPlugin.loader,
       options:{
        publicPath: path.resolve(__dirname, 'dist'),
      },
    },
    'css-loader'
    ],
   }
  ]
 }
}
