const path = require("path");
const TerserPLugin = require("terser-webpack-plugin");
const MiniCssExtractPLugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// Clean webpack dist
// Approach 1 --- using cleanWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  entry: {
    home: "./src/home.js",
    gallery: "./src/gallery.js",
  },
  output: {
    filename: "[name].[contenthash].js",
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
        test: /\.(png|jpg|jpeg)$/,
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
      {
        test: /\.hbs/,
        use: ["handlebars-loader"],
      },
    ],
  },

  plugins: [
    new TerserPLugin(),
    new MiniCssExtractPLugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "Home page",
      template: "src/page-template.hbs",
      filename: "home.html",
      chunks: ["home"],
      description: "Home page ",
      minify: false,
    }),
    new HTMLWebpackPlugin({
      title: "Gallery page",
      template: "src/page-template.hbs",
      filename: "gallery.html",
      chunks: ["gallery"],
      description: "Gallery page",
      minify: false,
    }),
  ],
};
