// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import PurgeIcons from 'vite-plugin-purge-icons';

export default defineConfig({
  plugins: [react(), PurgeIcons()],
});
