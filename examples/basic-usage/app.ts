import { validateEnv } from "../../env-validation.js";

// This will throw if environment is invalid
const env = validateEnv();

console.log("🚀 App starting with validated environment...\n");

// Test autocomplete and type safety
console.log("Database URL:", env.DATABASE_URL);
console.log("Port:", env.PORT);
console.log("Node Environment:", env.NODE_ENV);
console.log("Logging Enabled:", env.ENABLE_LOGGING);
console.log("Feature Flags:", env.FEATURE_FLAGS);

console.log("\n✅ All environment variables are type-safe!");
