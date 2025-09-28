import { parseConfig } from "../../src/core/config-parser";

console.log("🧪 Testing config parser...\n");

try {
  const config = parseConfig("env.config.ts");
  console.log("✅ Config parsed successfully!");
  console.log("Config:", JSON.stringify(config, null, 2));
} catch (error) {
  console.error("❌ Config parser test failed:", error.message);
  process.exit(1);
}
