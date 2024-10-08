import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import {varStylesConfig} from "./variables.style.less.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      apps: `${path.resolve(__dirname, "./src/apps")}`,
      configs: `${path.resolve(__dirname, "./src/configs")}`,
      consts: `${path.resolve(__dirname, "./src/configs/consts")}`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: varStylesConfig,
        javascriptEnabled: true,
      },
    },
  },
});