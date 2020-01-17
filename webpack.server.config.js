//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const nodeExternals = require('webpack-node-externals');

/** @type WebpackConfig[] */
const configs = [
  {
    entry: {
      server: './src/server/server.tsx',
    },
    output: {
      path: __dirname + '/build',
      filename: '[name].js',
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.scss$/,
          use: [
            'isomorphic-style-loader',
            "css-loader", // 将 CSS 转化成 CommonJS 模块
            "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            // {
            //   loader: 'css-loader/locals',
            //   options: {
            //     modules: true,
            //     localIdentName: '[name]__[local]--[hash.base64:5]'
            //   }
            // },
            // 'sass-loader'
          ]
        }
      ],
    },
    target: 'node',
    externals: [nodeExternals()],
  },
];

module.exports = configs;