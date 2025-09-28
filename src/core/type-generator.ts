import { EnvConfig } from "../types/config-schema";

/**
 * generate ts declaration file content for the envs
 * creates a .d.ts file, extending global `NodeJS.ProcessEnv` interface (@types/node package)
 *
 * @param config - parsed config object
 * @returns generated ts declaration content
 */
export function generateTypes(config: EnvConfig): string {
  const typeDefinitions = Object.entries(config)
    .map(([key, config]) => {
      const isOptional = !config.required;
      const optionalMarker = isOptional ? "?" : "";

      // NodeJS.ProcessEnv values are always strings (or undefined) at runtime.
      let typeString = "string";

      return `      ${key}${optionalMarker}: ${typeString};`;
    })
    .join("\n");

  return `declare global {
        namespace NodeJS {
          interface ProcessEnv {
      ${typeDefinitions}
          }
        }
      }
      
      export {};`;
}
