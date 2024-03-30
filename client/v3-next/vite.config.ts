import vue from '@vitejs/plugin-vue';
import path from 'path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

const environment: string = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias '@' to './src' folder
    }
  },

  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    modulePreload: {
      polyfill: true
    },

    rollupOptions: {
      output: {
        sourcemap: true,
        chunkFileNames: `assets/script/${environment}.[name]-[hash].js`,
        entryFileNames: `assets/script/${environment}.[name]-[hash].js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/css/i.test(extType)) {
            extType = 'assets/style';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'assets/image';
          }
          if (/ttf|woff|woff2|eot/i.test(extType)) {
            extType = 'assets/font';
          }
          return `${extType}/${environment}.[name]-[hash][extname]`;
        }
      }
    },
  },
  plugins: [vue(), splitVendorChunkPlugin(), sentryVitePlugin({
    release: {
      name: 'playanime',
    },
    org: 'na-9dz',
    project: 'playanime'
  })]
});