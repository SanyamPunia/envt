import { join } from "path";
import { fileExists } from "../../core/file-manager";
import chalk from "chalk";

export function validateCommand(): void {
  const hasJs = fileExists("env-validation.js");
  const hasTs = fileExists("env-validation.ts");

  if (!hasJs && !hasTs) {
    console.error(
      chalk.red(
        '❌ env-validation.js or env-validation.ts not found. Run "npx envt generate" first.'
      )
    );
    process.exit(1);
  }

  const validationFile = hasJs ? "env-validation.js" : "env-validation.ts";
  const validationPath = join(process.cwd(), validationFile);

  try {
    console.log(chalk.blue("🔍 Validating environment..."));

    // dynamically require the validation file
    delete require.cache[require.resolve(validationPath)];
    const { validateEnv } = require(validationPath);

    const result = validateEnv();

    console.log(chalk.green("✅ Environment validation passed!"));
    console.log(chalk.blue("📊 Validated variables:"));
    Object.entries(result).forEach(([key, value]) => {
      console.log(chalk.green(`  ${key}: ${JSON.stringify(value)}`));
    });
  } catch (error: unknown) {
    console.error(chalk.red("❌ Environment validation failed:"));
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}
