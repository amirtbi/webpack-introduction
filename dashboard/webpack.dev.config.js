const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/dashboard.js",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "http://localhost:9003/",
  },

  devServer: {
    port: 9003,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "dashboard.html",
      // writetoDisk: true,
    },
    historyApiFallback: {
      index: "dashboard.html",
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new TerserWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "dashboard page",
    }),
    new ModuleFederationPlugin({
      name: "DashboardApp",
      remotes: {
        HomeApp: "HomeApp@http://localhost:9000/remoteEntry.js",
        GalleryApp: "GalleryApp@http://localhost:9001/remoteEntry.js",
      },
    }),
  ],
};
