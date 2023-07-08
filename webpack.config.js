const path = require("path");
const TerserPLugin = require("terser-webpack-plugin");
const MiniCssExtractPLugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// Clean webpack dist
// Approach 1 --- using cleanWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),

    // clean: {
    //   dry: true,
    //   keep: /\.css/,
    // },
  },

  module: {
    rules: [
      {
        test: /\.(txt)/,
        type: "asset/source",
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
      {
        test: /.(ttf|woff(2)?)(\?[a-z0-9]+)?$/,
        type: "asset/resource",
        generator: {
          filename: "statics/fonts/[hash][ext][query]",
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
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPLugin.loader, "css-loader"],
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },

      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPLugin.loader, "css-loader", "sass-loader"],
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
    ],
  },

  plugins: [
    new TerserPLugin(),
    new MiniCssExtractPLugin({
      filename: "styles.[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "New webpack html page",
      filename: "subfolder/custom-html.html",
      meta: {
        description: "some descriptions",
      },
    }),
  ],

  mode: "none",
};
