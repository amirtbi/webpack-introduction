const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPLugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const entries = ["home"];

module.exports = {
  mode: "production",

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3 * 1024,
    },
  },
  //   entry: {
  //     home: "/scr/pages/home/index.js",
  //     gallery: "./src/pages/gallery/index.js",
  //   },
  entry: () => {
    let entriesList = {};
    for (const entry of entries) {
      entriesList[entry] = path.resolve(
        __dirname,
        "src",
        "pages",
        entry,
        "index.js"
      );
    }
    return entriesList;
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/static/",
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
        test: /\.(ttf|woff(2)?)(\?[a-z0-9]+)?$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs/,
        use: ["handlebars-loader"],
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
          filename: `${entry}.html`,
          template: "./src/page-template.hbs",
          minify: false,
          title: "dynamic title",
          description: "Home description",
        })
    ),
  ],
};
