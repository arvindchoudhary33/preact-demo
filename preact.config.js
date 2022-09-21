import CopyWebpackPlugin from "copy-webpack-plugin";

import { resolve } from "path";
var chokidar = require("chokidar");
var watcher = chokidar.watch("./public", { ignored: /^\./, persistent: true });
watcher.on("add", function(path) {
  console.log("File", path, "has been added");
});
var path = require("path");
/**
 * @param {import('preact-cli').Config} config - Original webpack config
 * @param {import('preact-cli').Env} env - Current environment info
 * @param {import('preact-cli').Helpers} helpers - Object with useful helpers for working with the webpack config
 */
export default (config, env, helpers) => {
  /* (config.watch = true), */
  config.watchOptions = {
    /* aggregateTimeout: 100, */
    ignored: [
      /* path.resolve(__dirname, "dist"), */
      path.resolve(__dirname, "node_modules"),
      // TODO : Comment the below line to see the difference
      path.resolve(__dirname, "./public"),
    ],
  };
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*",
          context: resolve(__dirname, "./public"),
          noErrorOnMissing: true,
        },
        /* from: "*", */
        /* to: "./src/assets", */
        /* context: resolve(__dirname, "./public"), */
        /* noErrorOnMissing: true, */
      ],
    })
  );
};
