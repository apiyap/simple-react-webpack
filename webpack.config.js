const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, "/build"),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    watchContentBase: true,
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        //use : [ MiniCssExtractPlugin.loader , 'css-loader']
      },
      //  {
      //     test: /\.svg$/,
      //     use: ['@svgr/webpack', 'url-loader'],
      //   },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     "public/favicon.ico",
    //     "public/logo192.png",
    //     "public/logo512.png",
    //     "public/manifest.json",
    //     "public/robots.txt",
    //     { from: "**/*",  },
    //     // If absolute path is a `glob` we replace backslashes with forward slashes, because only forward slashes can be used in the `glob`
    //     path.posix.join(
    //       path.resolve(__dirname, "public").replace(/\\/g, "/"),
    //       "*.txt"
    //     ),
    //   ],
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to:".",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html", "**/ignored-directory/**"],
          },
        },
      ],
    }),
  ],
};
