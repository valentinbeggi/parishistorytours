// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap"; // 👈 Ajout du plugin sitemap

// https://astro.build/config
export default defineConfig({
  site: "https://www.parishistorytours.com", // 👈 Obligatoire pour le sitemap
  integrations: [
    react(),
    sitemap(), // 👈 Activation du plugin sitemap ici
  ],

  // Needed for API routes later
  output: "server",

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
