import { Options, defineConfig } from "tsup";

const baseConfigOptions = {
  entryPoints: ["src/index.ts"],
  format: ["esm"],
  platform: "node",
  target: "es5",
  clean: true,
} satisfies Options;

const productionConfig = defineConfig({
  ...baseConfigOptions,
  minify: true,
  sourcemap: false,
  splitting: true,
  watch: false,
  outDir: "dist",
});

const developmentConfig = defineConfig({
  ...baseConfigOptions,
  minify: false,
  sourcemap: true,
  splitting: false,
  outDir: "dist",
  watch: true,
  onSuccess: "node dist/index.js",
});

console.log(`Running in ${process.env.NODE_ENV || "development"} environment`);

const config =
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

export default config;
