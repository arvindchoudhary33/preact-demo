import CopyWebpackPlugin from "copy-webpack-plugin";

import { resolve } from "path";
/* var chokidar = require("chokidar"); */
/* var watcher = chokidar.watch("./public", { ignored: /^\./, persistent: true }); */
/* watcher.on("add", function(path) { */
/*   console.log("File", path, "has been added"); */
/* }); */
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
var path = require("path");

export default (config, env, helpers) => {
  /* const { plugin } = helpers.getPluginsByName(config, "DefinePlugin")[0]; */
  /* plugin.definitions[process.env.SOME_VAR] = JSON.stringify("192.168.1.1"); */

  config.watchOptions = {
    ignored: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "./public"),
    ],
  };
  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      "process.env.IP_ADDRESS": JSON.stringify(process.env.IP_ADDRESS),
      "process.env.HI": JSON.stringify(process.env.HELLO),
    }),
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
