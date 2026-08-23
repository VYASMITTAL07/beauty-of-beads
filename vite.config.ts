import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The deployed backend. Only used by the dev-server proxy below — the built
// bundle still talks to it directly via API_BASE in src/lib/api.ts.
const BACKEND = "https://beauty-of-beads-api.vyasmittal1206.workers.dev";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // DEV ONLY — has no effect on `npm run build` or the deployed site.
  //
  // The Worker sets CORS_ORIGIN to the production storefront origin, so a
  // browser on http://localhost:5173 gets its /api calls rejected by CORS.
  // Proxying them through the dev server makes them same-origin from the
  // browser's point of view, which lets local dev run against real data
  // without loosening CORS on the live API. Point VITE_API_BASE at the dev
  // server (see .env.local) to route through this.
  server: {
    proxy: {
      "/api": {
        target: BACKEND,
        changeOrigin: true,
        // The API's session cookies are Secure, which browsers refuse to
        // store over plain http://localhost — strip that one attribute so
        // logged-in flows can be exercised locally. Dev server only.
        cookieDomainRewrite: "localhost",
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              proxyRes.headers["set-cookie"] = cookies.map((c) =>
                c.replace(/;\s*Secure/gi, "")
              );
            }
          });
        },
      },
      "/media": { target: BACKEND, changeOrigin: true },
    },
  },
  build: {
    // Multi-page build: the storefront (index.html) and the admin panel
    // (admin.html) are separate entry points, so the admin dashboard code
    // never ships as part of the public storefront bundle.
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        admin: path.resolve(__dirname, "admin.html"),
      },
    },
  },
});
