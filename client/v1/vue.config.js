const { defineConfig } = require('@vue/cli-service');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

const ENV = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const ASSET_DIR = 'web';

module.exports = defineConfig({
  configureWebpack: {
    output: {
      filename: `${ASSET_DIR}/script/${ENV}-[chunkhash:8].[hash:12].js`,
      chunkFilename: `${ASSET_DIR}/script/${ENV}-[chunkhash:8].[hash:12].js`
    },
    optimization: {
      chunkIds: 'deterministic',
      runtimeChunk: {
        name: 'rt'
      },
      // mangleExports: true,
    },
    plugins: [
      sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'na-9dz',
        project: 'playanime',
      }),
    ]
  },

  css: {
    extract: {
      filename: `${ASSET_DIR}/style/${ENV}-[chunkhash:8].[hash:12].css`,
      chunkFilename: `${ASSET_DIR}/style/${ENV}-[chunkhash:8].[hash:12].css`
    }
  },

  chainWebpack: config => {
    config.module
      .rule('images')
      .set('parser', {
        dataUrlCondition: {
          maxSize: -1
        }
      })

    config.plugin('html').tap(args => {
      args[0].inject = 'body';
      return args;
    })
  },

  assetsDir: ASSET_DIR,
  // integrity: ENV === 'production',
  publicPath: '',
  runtimeCompiler: true,
  transpileDependencies: true,
});
