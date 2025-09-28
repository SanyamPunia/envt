import { execSync } from "child_process";
import { glob } from "glob";
import { unlinkSync } from "fs";

console.log("🧪 Running integration tests...\n");

try {
  const testFiles = glob.sync("tests/integration/*.test.ts");

  for (const testFile of testFiles) {
    console.log(`Running ${testFile}...`);
    execSync(`npx tsx ${testFile}`, { stdio: "inherit" });
    console.log(`✅ ${testFile} passed\n`);
  }

  try {
    unlinkSync("test-validation.js");
    unlinkSync("test-validation-errors.js");
    console.log("✅ Cleaned up test files");
  } catch (error) {
    // files might not exist
  }

  console.log("🎉 All integration tests passed!");
} catch (error) {
  console.error("❌ Integration tests failed:", error.message);
  process.exit(1);
}
