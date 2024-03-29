
const path = require("path");
const webpack = require("webpack");
const appDirectory = path.resolve(__dirname, "../");

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve(appDirectory, "js"),
    path.resolve(appDirectory, "src/"),
    path.resolve(appDirectory, "package/"),
    path.resolve(appDirectory, "node_modules/@react-navigation"),
    path.resolve(appDirectory, "node_modules/react-native-gesture-handler"),
    path.resolve(appDirectory, "node_modules/react-navigation-stack"),
    path.resolve(appDirectory, "node_modules/react-navigation-tabs"),
    path.resolve(appDirectory, "node_modules/react-navigation-drawer"),
    path.resolve(appDirectory, "node_modules/react-native-screens"),
    path.resolve(appDirectory, "node_modules/react-native-rxsegment"),
    path.resolve(
      appDirectory,
      "node_modules/react-native-keyboard-aware-scroll-view"
    )
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ["react-native"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"]
    }
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 1,
        sourceMap: true
      }
    }
  ]
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "react-native-web-image-loader?name=[hash].[ext]"
  }
};

const webViewConfiguration = {
  test: /postMock.html$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]"
    }
  }
};

const tffLoaderConfiguration = {
  test: /\.ttf$/,
  loader: "url-loader",
  include: [path.resolve(appDirectory, "app")]
};

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(appDirectory, "index.web.js")
  ],
  output: {
    chunkFilename:"common."+new Date().getTime()+".js",
    filename: "bundle."+new Date().getTime()+".js",
    path: path.resolve(appDirectory, "docs"),
    // path: '/usr/local/Cellar/nginx/1.17.0/html/dist',
    devtoolModuleFilenameTemplate: info =>
      "file://" + path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',//本地模板文件的位置
      filename: 'index.html', //输出文件的文件名称
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      tffLoaderConfiguration,
      cssLoaderConfiguration,
      webViewConfiguration
    ]
  },
  performance: { hints: false },
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      "react-native$": "react-native-web",
      WebView: "react-native-web-webview",
    },
    modules: ["node_modules"],
    extensions: [".web.js", ".js",'.html']
  }
};
