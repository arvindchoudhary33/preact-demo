import CopyWebpackPlugin from "copy-webpack-plugin";
import { resolve } from "path";
var path = require("path");
/**
 * @param {import('preact-cli').Config} config - Original webpack config
 * @param {import('preact-cli').Env} env - Current environment info
 * @param {import('preact-cli').Helpers} helpers - Object with useful helpers for working with the webpack config
 */
export default (config, env, helpers) => {
  config.watchOptions = {
    ignored: [
      /* path.resolve(__dirname, "dist"), */
      /* path.resolve(__dirname, "node_modules"), */
      path.resolve(__dirname, "./public"), // image folder path
    ],
  };
  /*  config.devServer= [ */
  /*    watchOptions: { */
  /* }]; */
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*",
          context: resolve(__dirname, "./public"),
          noErrorOnMissing: true,
        },
      ],
    })
  );
};
