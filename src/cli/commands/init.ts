import chalk from "chalk";
import { writeFile } from "../../core/file-manager";

const templateConfig = `// Environment configuration for envt
// This file defines your environment variables with types and validation rules

export const config = {
  // Required string
  DATABASE_URL: {
    type: "string",
    required: true,
    description: "PostgreSQL connection string"
  },
  // Optional with default
  PORT: {
    type: "number",
    default: 3000,
    description: "Server port"
  },
  // Enum validation
  NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    default: "development",
    description: "Environment mode"
  },
  // Boolean conversion
  ENABLE_LOGGING: {
    type: "boolean",
    default: false,
    description: "Enable application logging"
  },
  // JSON parsing
  FEATURE_FLAGS: {
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
