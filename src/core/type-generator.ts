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

      let typeString = "";
      switch (config.type) {
        case "string":
          typeString = "string";
          break;
        case "number":
          typeString = "number";
          break;
        case "boolean":
          typeString = "boolean";
          break;
        case "enum":
          if (config.values && config.values.length > 0) {
            typeString = config.values.map((v) => `'${v}'`).join(" | ");
          } else {
            typeString = "string";
          }
          break;
        case "json":
          typeString = "Record<string, any>";
          break;
        default:
          typeString = "string";
      }

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
