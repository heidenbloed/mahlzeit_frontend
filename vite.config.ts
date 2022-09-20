import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { icons } from "./icons.json";

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  srcDir: "src",
  includeAssets: ["favicon.png", "assets/*"],
  strategies: "generateSW",
  manifest: {
    name: "Mahlzeit",
    short_name: "Mahlzeit",
    theme_color: "#E7E5E4",
    start_url: "/",
    display: "standalone",
    background_color: "#E7E5E4",
    icons: icons,
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,woff,woff2}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/recipedb-api\.heidenblut\.eu\/media\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "recipedb-media",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      {
        urlPattern: /^https:\/\/recipedb-api\.heidenblut\.eu\/api\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "recipedb-api",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 5,
          },
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [Vue(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  preview: {
    port: 3050,
    https: {
      key: "localhost+1-key.pem",
      cert: "localhost+1.pem",
    },
  },
});
