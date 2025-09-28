import { parseConfig } from "../../src/core/config-parser";
import { generateTypes } from "../../src/core/type-generator";

console.log("�� Testing type generator...\n");

try {
  const config = parseConfig("env.config.ts");
  console.log("✅ Config loaded");

  const typeDefinitions = generateTypes(config);
  console.log("✅ Type definitions generated");
  console.log("\nGenerated TypeScript declarations:");
  console.log("=".repeat(60));
  console.log(typeDefinitions);
  console.log("=".repeat(60));

  const fs = require("fs");
  fs.writeFileSync("demo-env.d.ts", typeDefinitions);
  console.log("\n✅ Written to demo-env.d.ts");
} catch (error) {
  console.error("❌ Type generator test failed:", error.message);
  process.exit(1);
}
