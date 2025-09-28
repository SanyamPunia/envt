import { execSync } from "child_process";

console.log("🧪 Running all tests...\n");

try {
  console.log("Running unit tests...");
  execSync("npx tsx tests/run-unit.ts", { stdio: "inherit" });

  console.log("\nRunning integration tests...");
  execSync("npx tsx tests/run-integration.ts", { stdio: "inherit" });

  console.log("\n🎉 All tests passed!");
} catch (error) {
  console.error("❌ Tests failed:", error.message);
  process.exit(1);
}
