const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { getWebpackEntryPoints } = require("@wordpress/scripts/utils");

const blockEntry = getWebpackEntryPoints();

module.exports = [
  {
    ...defaultConfig,
    entry: {
      ...blockEntry,
      app: ["./src/js/front-end/app.js", "./src/style/front-end/app.scss"],
      admin: ["./src/js/back-end/admin.js", "./src/style/back-end/admin.scss"],
      customizer: ["./src/js/back-end/customizer.js"],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          ...defaultConfig.optimization.splitChunks.cacheGroups,
          commons: {
            test: /[\\/]node_modules[\\/]\@glide/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item);

              const name = moduleFileName.substring(
                0,
                moduleFileName.length - 3
              );
              return `common/${name}`;
            },
            chunks: "all",
          },
        },
      },
    },
  },
  {
    ...defaultConfig,
    entry: {
      cascade: ["./src/js/front-end/cascade.js"],
    },
  },
];
