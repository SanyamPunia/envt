import { readFileSync } from "fs";
import { join } from "path";
import { EnvConfig } from "../types/config-schema";
import { parseConfigFromAST } from "./ast-parser";

/**
 * this is a pragmatic approach for mvp - essentially doing a lightweight
 * ast traversal without overhead of a full typescript parser. the regex captures the
 * config object between export const config = { ... }
 *
 * @param configPath - relative path to the config file
 * @returns parsed config object
 */
export function parseConfig(configPath: string = "env.config.ts"): EnvConfig {
  try {
    // resolve to absolute path to avoid `cwd` issues
    const fullPath = join(process.cwd(), configPath);

    // read the raw file content - we need the string representation
    const configContent = readFileSync(fullPath, "utf-8");

    // ast parse that shit
    const config = parseConfigFromAST(configContent);

    return config;
  } catch (error: any) {
    throw new Error(`Failed to parse config file: ${error.message}`);
  }
}
