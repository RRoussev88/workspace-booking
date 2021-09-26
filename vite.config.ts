import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import reactJsx from 'vite-react-jsx';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({ build: { outDir: 'build' }, plugins: [reactRefresh(), reactJsx(), svgr()] });
