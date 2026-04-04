import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  // ✅ Base must start and end with a slash /
  base: "/FinWave/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
