import react from '@vitejs/plugin-react';
import { createServer } from 'vite';

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
  },
});

await server.listen();
server.printUrls();

setInterval(() => {}, 1 << 30);
