import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "dist/**/*",
      "build/**/*",
      ".turbo/**/*",
      "coverage/**/*",
    ],
  },
  {
    plugins: {
      next: nextPlugin,
    },
    rules: {
      // Thêm các quy tắc tùy chỉnh nếu cần
    },
  },
];

export default eslintConfig;
