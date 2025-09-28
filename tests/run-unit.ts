import { execSync } from "child_process";
import { glob } from "glob";

console.log("🧪 Running unit tests...\n");

try {
  const testFiles = glob.sync("tests/unit/*.test.ts");

  for (const testFile of testFiles) {
    console.log(`Running ${testFile}...`);
    execSync(`npx tsx ${testFile}`, { stdio: "inherit" });
    console.log(`✅ ${testFile} passed\n`);
  }

  console.log("🎉 All unit tests passed!");
} catch (error) {
  console.error("❌ Unit tests failed:", error.message);
  process.exit(1);
}
