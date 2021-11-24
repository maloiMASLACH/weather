const path = require("path");
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
      open: true,
      port: 3000
    },
  };

module.exports =({develop})=> ({
  mode: develop? "development" : 'production',
  devtool: develop ? 'inline-source-map':false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve:{
    extensions: ['.js']
  },
  plugins:[
      new MiniCssExtractPlugin({
          filename:'[name].[contenthash].css'
      }),
    new HtmlWebpackPlugin({
        template:'./src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  ...devServer(develop)
});
