#!user/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { generateCommand } from "./commands/generate";
import { validateCommand } from "./commands/validate";
import chalk from "chalk";

const program = new Command();

program
  .name("env-safe")
  .version("1.0.0")
  .description("Type-safe environment variables with runtime validation");

program
  .command("init")
  .description("Initialize env.config.ts with a template")
  .action(initCommand);

program
  .command("generate")
  .description("Generate validation and type files from config")
  .action(generateCommand);

program
  .command("validate")
  .description("Validate current environment against config")
  .action(validateCommand);

program
  .command("check")
  .description("Check environment status (info only)")
  .action(() => {
    console.log(chalk.blue("🔍 Checking environment..."));
    try {
      validateCommand();
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Some environment variables are missing or invalid")
      );
    }
  });

program.parse();
