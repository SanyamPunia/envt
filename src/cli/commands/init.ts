import chalk from "chalk";
import { writeFile } from "../../core/file-manager";

const templateConfig = `// Environment configuration for envt
// This file defines your CLIENT-SIDE environment variables with types and validation rules
// Only use variables that are accessible on the client-side (NEXT_PUBLIC_*, PUBLIC_*, VITE_*, REACT_APP_*)

export const config = {
  // Required string (client-side)
  NEXT_PUBLIC_API_URL: {
    type: "string",
    required: true,
    description: "API base URL for client requests"
  },
  // Optional with default
  NEXT_PUBLIC_APP_PORT: {
    type: "number",
    default: 3000,
    description: "Application port"
  },
  // Enum validation
  NEXT_PUBLIC_NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    default: "development",
    description: "Environment mode"
  },
  // Boolean conversion
  NEXT_PUBLIC_DEBUG_MODE: {
    type: "boolean",
    default: false,
    description: "Enable debug logging"
  },
  // JSON parsing
  NEXT_PUBLIC_FEATURE_FLAGS: {
    type: "json",
    required: false,
    description: "JSON object of feature flags"
  }
};`;

export function initCommand(): void {
  try {
    writeFile("env.config.ts", templateConfig);
    console.log(chalk.green("✅ Created env.config.ts"));
    console.log(
      chalk.blue("📝 Edit the config file to match your environment variables")
    );
    console.log(
      chalk.blue('🚀 Run "npx envt generate" to create validation files')
    );
  } catch (error: unknown) {
    console.error(
      chalk.red("❌ Failed to create config file:"),
      (error as Error).message
    );
    process.exit(1);
  }
}
