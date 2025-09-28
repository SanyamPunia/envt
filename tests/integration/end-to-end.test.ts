import { parseConfig } from "../../src/core/config-parser";
import { generateValidator } from "../../src/core/validator-generator";
import { join } from "path";

console.log("🧪 Testing end-to-end functionality...\n");

try {
  // 1. parse config
  console.log("1️⃣ Parsing config...");
  const config = parseConfig("env.config.ts");
  console.log("✅ Config parsed successfully!");

  // 2. generate validator
  console.log("2️⃣ Generating validator...");
  const validatorCode = generateValidator(config);
  console.log("✅ Validator generated successfully!");

  // 3. write validator to file
  console.log("3️⃣ Writing validator to file...");
  const fs = require("fs");
  const validatorPath = join(process.cwd(), "test-validation.js");
  fs.writeFileSync(validatorPath, validatorCode);
  console.log("✅ Validator written to test-validation.js");

  // 4. test validation with valid data
  console.log("4️⃣ Testing validation with valid data...");
  process.env.DATABASE_URL = "postgresql://localhost:5432/mydb";
  process.env.PORT = "8080";
  process.env.NODE_ENV = "development";
  process.env.ENABLE_LOGGING = "true";

  delete require.cache[require.resolve(validatorPath)];
  const { validateEnv } = require(validatorPath);

  const result = validateEnv();
  console.log("✅ Validation passed!");
  console.log("Validated environment:", JSON.stringify(result, null, 2));

  // 5. test validation with invalid data
  console.log("5️⃣ Testing validation with invalid data...");
  delete process.env.DATABASE_URL; // remove required variable
  process.env.PORT = "invalid-port"; // invalid number
  process.env.NODE_ENV = "invalid-env"; // invalid enum

  try {
    validateEnv();
    console.log("❌ Should have thrown an error!");
    process.exit(1);
  } catch (error) {
    console.log("✅ Correctly caught validation error:");
    console.log(error.message);
  }

  console.log("\n🎉 All tests passed!");
} catch (error) {
  console.error("❌ Test failed:", error.message);
  console.error(error.stack);
  process.exit(1);
}
