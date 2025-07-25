const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx"], // so imports can omit extensions
  },
  devServer: {
    port: 3004,
    liveReload: true,
    historyApiFallback: true,
    // server: 'https'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "mf-shell/icons" }, // optional: copy icons folder
      ],
    }),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        LoginPage:
          "loginPage@https://cleanui0011.github.io/mf-login-page/remoteEntry.js",
        // LeftNav: "leftNavigation@https://cleanui0011.github.io/mf-left-nav/remoteEntry.js",
        TopNav:
          "topNavigation@https://cleanui0011.github.io/mf-top-nav/remoteEntry.js",
        ItemDetails:
          "itemDetails@https://cleanui0011.github.io/mf-item-details/remoteEntry.js",
        Shell: "shell@https://cleanui0011.github.io/mf-shell/remoteEntry.js",
        SharedModules:
          "sharedModules@https://cleanui0011.github.io/mf-shared-modules/remoteEntry.js",
      },
      exposes: {
        "./store": "./src/redux/store.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB if needed
    }),
  ],
};
