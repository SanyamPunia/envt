/**
 * eg:
 * DATABASE_URL: {
 * type: "string",
 * required: true,
 * description: "..."
 * }
 */

export interface EnvVarConfig {
  type: "string" | "number" | "boolean" | "enum" | "json";
  required?: boolean;
  default?: any;
  description?: string;
  values?: string[];
}

export interface EnvConfig {
  [key: string]: EnvVarConfig;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  env: Record<string, any>;
}
