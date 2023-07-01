const path = require("path");
const TerserPLugin = require("terser-webpack-plugin");
const MiniCssExtractPLugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),

    publicPath: "./dist/",
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
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",

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
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
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
      filename: "styles.css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
  ],

  mode: "none",
};
