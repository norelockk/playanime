import { sentryVitePlugin } from '@sentry/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig, splitVendorChunkPlugin } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    minify: 'esbuild',
    modulePreload: {
      polyfill: false
    },

    rollupOptions: {
      output: {
        sourcemap: true,
        chunkFileNames: 'js/production-[hash].js',
        entryFileNames: 'js/production-[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `${extType}/production-[hash][extname]`;
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