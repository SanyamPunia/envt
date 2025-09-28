export type EnvVarType = "string" | "number" | "boolean" | "enum" | "json";

export interface EnvVarConfig {
  type: EnvVarType;
  required?: boolean;
  default?: any;
  description?: string;
  values?: string[]; // for enum type
}

export interface EnvConfigSchema {
  [key: string]: EnvVarConfig;
}

/**
 * Type-safe config object
 *
 * Use this type to get full type safety when defining your config:
 *
 * @example
 * ```typescript
 * import { EnvConfig } from 'env-safe/types';
 *
 * export const config: EnvConfig = {
 *   DATABASE_URL: {
 *     type: "string",
 *     required: true,
 *     description: "PostgreSQL connection string"
 *   }
 * };
 * ```
 */
export type EnvConfig = EnvConfigSchema;
