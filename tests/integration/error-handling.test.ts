import { parseConfig } from "../../src/core/config-parser";
import { generateValidator } from "../../src/core/validator-generator";
import { join } from "path";

console.log("🧪 Testing error handling...\n");

try {
  const config = parseConfig("env.config.ts");
  const validatorCode = generateValidator(config);

  // write the validator
  const fs = require("fs");
  const validatorPath = join(process.cwd(), "test-validation-errors.js");
  fs.writeFileSync(validatorPath, validatorCode);

  // test with missing required variable
  console.log("1️⃣ Testing missing required variable...");
  delete process.env.DATABASE_URL; // remove required variable
  process.env.PORT = "invalid-port"; // invalid number
  process.env.NODE_ENV = "invalid-env"; // invalid enum

  const { validateEnv } = require(validatorPath);

  try {
    validateEnv();
    console.log("❌ Should have thrown an error!");
    process.exit(1);
  } catch (error) {
    console.log("✅ Correctly caught validation error:");
    console.log(error.message);
  }

  console.log("\n🎉 Error handling tests passed!");
} catch (error) {
  console.error("❌ Test failed:", error.message);
  process.exit(1);
}
