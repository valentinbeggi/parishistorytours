// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // Needed for API routes later
  output: "server",

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});