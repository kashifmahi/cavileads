import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");

  return {
    plugins: [react()],
    // Keep the existing REACT_APP_* env vars working (platform-protected names)
    envPrefix: "REACT_APP_",
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      allowedHosts: true,
      hmr: { clientPort: 443 },
      watch: {
        ignored: ["**/node_modules/**", "**/.git/**", "**/build/**", "**/dist/**"],
      },
    },
    build: {
      // Keep the same output folder as CRA so VPS nginx config keeps working
      outDir: "build",
      emptyOutDir: true,
    },
  };
});
