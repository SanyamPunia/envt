import { EnvConfig } from "../types/config-schema";

/**
 * generates runtime validation code as a string, essentially a code generator
 *
 * taking our config object and generating js code that will validate envs at runtime
 *
 * the generated code follows the below pattern:
 * 1. check required variables
 * 2. get raw values from process.env
 * 3. perform type-specifc validation and coercion
 * 4. throw error if any
 * 5. return validated, typed object
 *
 * @param config - parsed config object
 * @returns generated validation code as string
 */
export function generateValidator(config: EnvConfig, fileType: string = "js") {
  // main validation function template
  const validationCode = `
    function validateEnv() {
        const errors = [];
        const env = {};

        ${Object.entries(config)
          .map(([key, config]) => generateValidationForVar(key, config))
          .join("\n\n")}

          if(errors.length > 0) {
          throw new Error(\`Environment validation failed:\\n\${errors.join("\\n")}\`);
          }

          return env;
    }
    
    ${
      fileType === "ts"
        ? "export { validateEnv };"
        : "module.exports = { validateEnv };"
    }`;

  return validationCode;
}

/**
 * generates validation code for a single env. each variable gets its own validation logic
 * the generated code follows a consistent pattern
 *
 * @param key - env name
 * @param config - variable configuration
 * @returns generated validation code for this variable
 */
function generateValidationForVar(key: string, config: any): string {
  // extract defaults
  const { type, required = false, default: defaultValue, values } = config;

  // comment for the variable
  // will append to this
  let code = `  // ${key}${
    config.description ? ` - ${config.description}` : ""
  }\n`;

  // check if variable is missing or not
  if (required) {
    code += `  if (!process.env.${key}) {\n`;
    code += `    errors.push('${key} is required but not set');\n`;
    code += `  }\n`;
  }

  // get raw value from env or use default
  code += `  const ${key.toLowerCase()}_raw = process.env.${key}${
    defaultValue !== undefined ? `  || '${defaultValue}'` : ""
  };\n`;

  // generate type-specific validation
  switch (type) {
    case "string":
      code += `  env.${key} = ${key.toLowerCase()}_raw;\n`;
      break;

    case "number":
      code += `  if (${key.toLowerCase()}_raw) {\n`;
      code += `    const ${key.toLowerCase()}_num = parseInt(${key.toLowerCase()}_raw);\n`;
      code += `    if (isNaN(${key.toLowerCase()}_num)) {\n`;
      code += `      errors.push('${key} must be a valid number, got: "' + ${key.toLowerCase()}_raw + '"');\n`;
      code += `    } else {\n`;
      code += `      env.${key} = ${key.toLowerCase()}_num;\n`;
      code += `    }\n`;
      code += `  }\n`;
      break;

    case "boolean":
      code += `  if (${key.toLowerCase()}_raw) {\n`;
      code += `    env.${key} = ${key.toLowerCase()}_raw === 'true';\n`;
      code += `  }\n`;
      break;

    case "enum":
      if (values && values.length > 0) {
        code += `  if (${key.toLowerCase()}_raw) {\n`;
        code += `    const validValues = [${values
          .map((v: string) => `'${v}'`)
          .join(", ")}];\n`;
        code += `    if (!validValues.includes(${key.toLowerCase()}_raw)) {\n`;
        code += `      errors.push('${key} must be one of: ' + validValues.join(', ') + ', got: "' + ${key.toLowerCase()}_raw + '"');\n`;
        code += `    } else {\n`;
        code += `      env.${key} = ${key.toLowerCase()}_raw;\n`;
        code += `    }\n`;
        code += `  }\n`;
      }
      break;

    case "json":
      code += `  if (${key.toLowerCase()}_raw) {\n`;
      code += `    try {\n`;
      code += `      env.${key} = JSON.parse(${key.toLowerCase()}_raw);\n`;
      code += `    } catch (e) {\n`;
      code += `      errors.push('${key} must be valid JSON, got: "' + ${key.toLowerCase()}_raw + '"');\n`;
      code += `    }\n`;
      code += `  }\n`;
      break;
  }

  return code;
}
