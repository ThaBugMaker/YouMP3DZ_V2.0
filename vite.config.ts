import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "YouMP3DZ Pwa",
          short_name: "YouMP3DZ",
          description: "YouMP3DZ v3.0 - A fast YouTube MP3 converter.",
          theme_color: "#ff4242",
          icons: [
            {
              src: "/assets/images/YouMP3120.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/assets/images/YouMP3120.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_API_URL, // Use the loaded environment variable
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
