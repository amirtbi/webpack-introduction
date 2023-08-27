const path = require("path");
// const TerserPLugin = require("terser-webpack-plugin");
// const MiniCssExtractPLugin = require("mini-css-extract-plugin");
// Clean webpack dist
// Approach 1 --- using cleanWebpackPlugin
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

const entries = ["gallery"];
const webpackPlugins = [
  ...entries.map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        minify: false,
        chunks: [`${entry}`],
        title: "Gallery",
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
    publicPath: "http://localhost:9001/",
  },

  devServer: {
    port: 9001,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "gallery.html",
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
      name: "GalleryApp",

      filename: "remoteEntry.js",
      exposes: {
        "./GalleryAppPage": "./src/pages/gallery/index.js",
      },
      remotes: {
        ImageCaption: "ImageCaption@http://localhost:9004/remoteEntry.js",
      },
    }),
  ],
};
