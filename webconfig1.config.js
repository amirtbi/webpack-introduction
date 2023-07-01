const path = require("path");

module.exports = {
  output: {
    filename: "bundle",
    path: path.resolve(__dirname, "/dist"),
    assetModuleFilename: "images/[static][ext][query]",
    publicPath: "./dist/",
  },

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {},

      {
        test: /\.(jpg|png)/,
        type: "asset/resource",
      },
      {
        test: /\.(svg)/,
        type: "asset/inline",
      },
      {
        test: /\.html/,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
    ],
  },
};
