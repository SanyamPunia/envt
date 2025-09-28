import chalk from "chalk";
import inquirer from "inquirer";
import { parseConfig } from "../../core/config-parser";
import { generateValidator } from "../../core/validator-generator";
import { writeTypeFile, writeValidationFile } from "../../core/file-manager";
import { generateTypes } from "../../core/type-generator";

export async function generateCommand(): Promise<void> {
  try {
    console.log(chalk.blue("🔍 Reading env.config.ts..."));
    const config = parseConfig();

    const { fileType } = await inquirer.prompt([
      {
        type: "list",
        name: "fileType",
        message: "Choose validation file type:",
        choices: [
          {
            name: "JavaScript (.js) - Works in any project",
            value: "js",
          },
          {
            name: "TypeScript (.ts) - For TypeScript projects",
            value: "ts",
          },
        ],
        default: "js",
      },
    ]);

    console.log(chalk.blue("⚙️  Generating validation function..."));
    const validatorCode = generateValidator(config, fileType);
    writeValidationFile(validatorCode, fileType);

    console.log(chalk.blue("📝 Generating TypeScript types..."));
    const typeCode = generateTypes(config);
    writeTypeFile(typeCode);

    console.log(chalk.green("✅ Generated files:"));
    console.log(
      chalk.green(`  - env-validation.${fileType} (runtime validation)`)
    );
    console.log(chalk.green("  - env.d.ts (TypeScript types)"));
    console.log(chalk.blue("�� Import and call validateEnv() in your app"));
  } catch (error: unknown) {
    console.error(chalk.red("❌ Generation failed:"), (error as Error).message);
    process.exit(1);
  }
}
