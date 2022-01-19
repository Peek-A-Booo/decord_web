import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default () => {
  return {
    resolve: {
      alias: {
        '@': pathResolve('src') + '/',
        '@hooks': pathResolve('src') + '/hooks/',
        '@assets': pathResolve('src') + '/assets/',
      },
      dedupe: ['vue'],
    },
    plugins: [vue()],
  };
};
