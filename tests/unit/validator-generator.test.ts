import { parseConfig } from "../../src/core/config-parser";
import { generateValidator } from "../../src/core/validator-generator";

console.log("🧪 Testing validator generator...\n");

try {
  const config = parseConfig("env.config.ts");
  const validatorCode = generateValidator(config);

  console.log("✅ Validator code generated successfully!");
  console.log("Generated code:");
  console.log("=".repeat(50));
  console.log(validatorCode);
  console.log("=".repeat(50));
} catch (error) {
  console.error("❌ Validator generator test failed:", error.message);
  process.exit(1);
}
