import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    // For demo purposes so you can go to the IDE when clicking links in the browser.
    "import.meta.env.PROJECT_ROOT": JSON.stringify(resolve(__dirname)),
  },
});
