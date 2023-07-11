const path = require("path");
// const TerserPLugin = require("terser-webpack-plugin");
// const MiniCssExtractPLugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// Clean webpack dist
// Approach 1 --- using cleanWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Configs

// Plugins
const webpackPlugins = [
  new HtmlWebpackPlugin({
    title: "some dummy title",
    description: "Some dummy description",
    filename: "subfolder/custom.html",
    template: "src/index.hbs",
  }),
];

// Rules and loader
const lodaerRules = [
  {
    test: /\.(txt)/,
    type: "asset/source",
  },
  {
    test: /.(ttf|woff(2)?)(\?[a-z0-9]+)?$/,
    type: "asset/resource",
    generator: {
      filename: "statics/fonts/[hash][ext][qeury]",
    },
  },
  {
    test: /\.(png|jpg)$/,
    type: "asset/resource",
    generator: {
      filename: "statics/images/[hash][ext][query]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1024 * 10,
      },
    },
  },

  {
    test: /\.svg/,
    type: "asset/inline",
  },

  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(scss)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  },
  {
    test: /\.hbs$/,
    use: ["handlebars-loader"],
  },
];

module.exports = {
  mode: "development",
  output: {
    filename: "bundle .js",
    path: path.resolve(__dirname, "./dist"),

    // clean: {
    //   dry: true,
    //   keep: /\.css/,
    // },
  },

  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "subfolder/custom.html",
      writeToDisk: true,
    },
  },

  module: {
    rules: [...lodaerRules],
  },

  plugins: [...webpackPlugins],
};
