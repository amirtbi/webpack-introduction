const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// Configs

// Plugins

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
    test: /\.(png|jpg|jpeg)$/,
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

const entries = ["home"];
const webpackPlugins = [
  ...entries.map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        template: "./src/page-template.hbs",
        minify: false,
        chunks: [`${entry}`],
        title: "Home ",
        description: "Dynamic description",
      })
  ),
];

module.exports = {
  mode: "development",
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
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9000/",
  },

  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "home.html",
      writeToDisk: true,
    },
  },

  module: {
    rules: [...lodaerRules],
  },

  plugins: [
    ...webpackPlugins,
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "HomeApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HomeBaseButton": "./src/components/BaseButtons/BaseButton.js",
        "./HomeBaseList": "./src/components/BaseList/BaseListContainer.js",
        "./HomeBaseHeader": "/src/components/BaseHeader/BaseHeader.js",
      },
    }),
  ],
};
