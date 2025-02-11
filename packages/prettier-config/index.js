export default {
  // Standard prettier options
  singleQuote: false,
  semi: true,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // This plugin's options
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^[.]",
    "",
    "^@workspace/ui/(.*)$",
    "^@workspace/routing",
    "^@workspace/data",
    "",
    "^#(.*)$",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
};
