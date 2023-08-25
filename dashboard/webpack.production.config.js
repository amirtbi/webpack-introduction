const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPLugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const entries = ["dashboard"];

module.exports = {
  mode: "production",

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3 * 1024,
    },
  },

  entry: () => {
    let entriesList = {};
    for (const entry of entries) {
      entriesList[entry] = path.resolve(__dirname, "src", `${entry}.js`);
    }
    return entriesList;
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    publicPath: "http://localhost:9003/",
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js)$/,
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
    new TerserPLugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),

    ...entries.map(
      (entry) =>
        new HtmlWebpackPlugin({
          filename: "dashboard.html",
          title: "Dashboard",
        })
    ),
    new ModuleFederationPlugin({
      name: "DashboardApp",
      remotes: {
        HomeApp: "HomeApp@http://localhost:9000/remoteEntry.js",
        GalleryApp: "GalleryApp@http://localhost:9001/remoteEntry.js",
      },
    }),
  ],
};
