import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@util", replacement: "/src/util" },
      { find: "@modals", replacement: "/src/modals" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@listComponents", replacement: "/src/listComponents" },
    ],
  },
});
