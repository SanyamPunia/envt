import { readFileSync } from "fs";
import { join } from "path";
import { EnvConfig } from "../types/config";

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

    /**
     * use regex to find the config export
     * 1. export const config =
     * 2. captures everything between the first `{`  and last `}`
     */
    const configMatch = configContent.match(
      /export\s+const\s+config\s*=\s*({[\s\S]*?});/
    );

    if (!configMatch) {
      throw new Error("Could not find config export in env.config.ts");
    }

    // get first captured group and convert to object
    const configString = configMatch[1];

    // todo - replace with a proper ts parser
    const config = eval(`(${configString})`);

    return config;
  } catch (error: any) {
    throw new Error(`Failed to parse config file: ${error.message}`);
  }
}
