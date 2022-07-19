import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  srcDir: "src",
  filename: "sw.ts",
  includeAssets: ["favicon.svg", "assets/*"],
  strategies: "generateSW",
  manifest: {
    name: "Rezeptdatenbank",
    short_name: "RezeptDB",
    theme_color: "#ffffff",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/recipedb-api\.heidenblut\.eu\/media\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "recipedb-media",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        }
      },
      {
        urlPattern: /^https:\/\/recipedb-api\.heidenblut\.eu\/api\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "recipedb-api",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 5,
          },
        }
      }
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [Vue(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
