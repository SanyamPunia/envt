import { parseConfigFromAST } from "../../src/core/ast-parser";

console.log("🧪 Testing AST Parser...\n");

try {
  const testConfig = `
export const config = {
  DATABASE_URL: {
    type: "string",
    required: true,
    description: "PostgreSQL connection string"
  },
  PORT: {
    type: "number",
    default: 3000,
    description: "Server port"
  },
  NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    default: "development",
    description: "Environment mode"
  }
};
`;

  const config = parseConfigFromAST(testConfig);
  console.log("✅ AST parsing successful!");
  console.log("Parsed config:", JSON.stringify(config, null, 2));
} catch (error) {
  console.error("❌ AST parsing failed:", error.message);
  process.exit(1);
}
