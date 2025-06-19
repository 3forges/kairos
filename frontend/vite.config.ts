import path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import mkcert from "vite-plugin-mkcert" // awesome guys // https://stackoverflow.com/questions/69417788/vite-https-on-localhost

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: '0.0.0.0'
    host: '192.168.1.12'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), TanStackRouterVite(), mkcert()],
})
